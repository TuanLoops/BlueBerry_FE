import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import { ConfirmAccount } from "./pages/confirm/ConfirmAccount";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { getCurrentUser } from "./redux/service/userService";
import AccountSettings from "./pages/settings/AccountSettings";
import Search from "./pages/search/Search";
import {
  getCurrentUserFriendList,
  getIncomingFriendRequests,
  getSentFriendRequests,
} from "./redux/service/friendService";
import {Saved} from "./components/saved/Saved.jsx";
import {OnePost} from "./components/onepost/OnePost.jsx";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "./firebase";
import { getNotifications } from "./redux/service/NotificationService";
import { ResetPassword } from "./pages/reset/ResetPassword.jsx";

function Router() {
  const accessToken = useSelector(({ user }) => user.accessToken);
  const currentUser = useSelector(({ user }) => user.currentUser);
  const dispatch = useDispatch();
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (accessToken && !currentUser) {
        dispatch(getCurrentUser());
        setTimeout(() => {
          setFetched(true);
        }, 100);
      } else {
        setFetched(true);
      }
    };
    fetchData();
  }, [accessToken]);

  const PrivateRoutes = () => {
    const { darkMode } = useContext(DarkModeContext);
    const [stompClient, setStompClient] = useState(null);
    const currentUser = useSelector(({ user }) => user.currentUser);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getIncomingFriendRequests());
      dispatch(getSentFriendRequests());
      dispatch(getCurrentUserFriendList());
      const interval = setInterval(() => {
        dispatch(getCurrentUserFriendList());
      }, 1000 * 60);
      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
      const unsubscribe = onSnapshot(
        query(
          collection(firestore, "notifications"),
          where("receiver.id", "==", currentUser.id)
        ),
        (snapshot) => {
          console.log("Current data: ", snapshot);
          dispatch(getNotifications());
        }
      );

      return () => unsubscribe();
    }, []);

    return (
      <div
        className={`theme-${darkMode ? "dark" : "light"}`}
        style={{ backgroundColor: darkMode ? "#1f1f1f" : "#f6f3f3" }}
      >
        <Navbar />
        <Outlet />
      </div>
    );
  };

  const PublicRoutes = () => {
    return <Outlet />;
  };

  if (fetched) {
    return (
      <BrowserRouter>
        <Routes>
          {accessToken ? (
            <Route element={<PrivateRoutes />}>
              {currentUser ? (
                <>
                  <Route path="/" exact element={<Home />} />
                  <Route path="/profile/:id" element={<Profile />} />
                  <Route path="/search" element={<Search />}/>
                  <Route path="/saved" element={<Saved/>} />
                  <Route path="/:currentUser/post/:postId" element={<OnePost/>} />
                  <Route path="/accountsettings" element={<AccountSettings />} />
                  <Route path="*" element={<Navigate to={"/"} />} />
                </>
              ) : (
                <></>
              )}
            </Route>
          ) : (
            <Route element={<PublicRoutes />}>
              <Route path="/login" element={<Login />} />
              <Route path="/confirm" element={<ConfirmAccount />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="*" element={<Navigate to={"/login"} />} />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    );
  } else {
    return <></>;
  }
}
export default Router;

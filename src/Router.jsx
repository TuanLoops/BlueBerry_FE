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
import {
  getCurrentUserFriendList,
  getIncomingFriendRequests,
  getSentFriendRequests,
} from "./redux/service/friendService";
import Search from "./pages/search/Search";

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
    fetchData().then();
  }, [accessToken]);

  useEffect(() => {
    dispatch(getIncomingFriendRequests());
    dispatch(getSentFriendRequests());
    dispatch(getCurrentUserFriendList());
    const interval = setInterval(() => {
      dispatch(getCurrentUserFriendList());
    }, 1000 * 60);
    return () => clearInterval(interval);
  });

  const PrivateRoutes = () => {
    const { darkMode } = useContext(DarkModeContext);
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
                  <Route path="/search/all/:keyword" element={<Search />}/>
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

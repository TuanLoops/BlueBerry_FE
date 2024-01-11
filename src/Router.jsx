import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import { ConfirmAccount } from "./pages/confirm/ConfirmAccount";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { getCurrentUser } from "./redux/service/userService";

function Router() {
  // const accessToken = useSelector(({ user }) => user.accessToken);
  const currentUser = useSelector(({ user }) => user.currentUser);
  const [err, setErr] = useState(false);

  const PrivateRoutes = () => {
    const { darkMode } = useContext(DarkModeContext);

    return (
      <div
        className={`theme-${darkMode ? "dark" : "light"}`}
        style={{ backgroundColor: darkMode ? "#333" : "#f6f3f3" }}
      >
        <Navbar />
        <Outlet />
      </div>
    );
  };

  const PublicRoutes = () => {
    return <Outlet />;
  };

  return (
    <BrowserRouter>
      <Routes>
        {currentUser ? (
          <Route element={<PrivateRoutes />}>
            <Route path="/" exact element={<Home />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/search/all/:keyword" />
            <Route path="*" element={<Navigate to={"/"} />} />
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
}
export default Router;

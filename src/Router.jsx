import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import { ConfirmAccount } from "./pages/confirm/ConfirmAccount";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";

const ProtectedRoute = () => {
  const currentUser = useSelector(({ user }) => user.currentUser);
  const { darkMode } = useContext(DarkModeContext);
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

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

function Router() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="" element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Route>
        <Route path="/confirm" element={<ConfirmAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Router;

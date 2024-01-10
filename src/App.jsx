// import Login from "./pages/login/Login";
// import Register from "./pages/register/Register";
// import {
//     createBrowserRouter,
//     RouterProvider,
//     Outlet,
//     Navigate,
// } from "react-router-dom";
// import Navbar from "./components/navbar/Navbar";
// import Home from "./pages/home/Home";
// import Profile from "./pages/profile/Profile";
// import "./style.scss";
// import {useContext} from "react";
// import {DarkModeContext} from "./context/darkModeContext";
// import {ConfirmAccount} from "./pages/confirm/ConfirmAccount.jsx";
//
// function App() {
//     const currentUser = localStorage.getItem("AccessToken")
//     const {darkMode} = useContext(DarkModeContext);
//
//     const Layout = () => {
//         return (
//             <div
//                 className={`theme-${darkMode ? "dark" : "light"}`}
//                 style={{backgroundColor: darkMode ? "#333" : "#f6f3f3"}}
//             >
//                 <Navbar/>
//                 <Outlet/>
//             </div>
//         );
//     };
//
//     // eslint-disable-next-line react/prop-types
//     const ProtectedRoute = ({children}) => {
//         if (!currentUser) {
//             return <Navigate to="/login"/>;
//         }
//         return children;
//     };
//
//     const router = createBrowserRouter([
//         {
//             path: "/",
//             element: (
//                 <ProtectedRoute>
//                     <Layout/>
//                 </ProtectedRoute>
//             ),
//             children: [
//                 {
//                     path: "/",
//                     element: <Home/>,
//                 },
//                 {
//                     path: "/profile/:id",
//                     element: <Profile/>,
//                 },
//
//             ],
//         },
//         {
//             path: "/confirm",
//             element: <ConfirmAccount/>
//         },
//         {
//             path: "/login",
//             element: <Login/>
//         },
//         {
//             path: "/register",
//             element: <Register/>,
//         },
//     ]);
//
//     return (
//         <div>
//             <RouterProvider router={router}/>
//         </div>
//     );
// }
//
// export default App;
import React, {useContext} from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { DarkModeContext } from "./context/darkModeContext";
import { ConfirmAccount } from "./pages/confirm/ConfirmAccount.jsx";
import "./style.scss";

function App() {
    const currentUser = localStorage.getItem("AccessToken");
    const { darkMode } = useContext(DarkModeContext);

    const Layout = ({ children }) => (
        <div
            className={`theme-${darkMode ? "dark" : "light"}`}
            style={{ backgroundColor: darkMode ? "#333" : "#f6f3f3" }}
        >
            <Navbar />
            {children}
        </div>
    );

    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/login" />;
        }
        return children;
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Routes>
                                    <Route index element={<Home />} />
                                    <Route path="/profile/:id" element={<Profile />} />
                                </Routes>
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route path="/confirm" element={<ConfirmAccount />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;

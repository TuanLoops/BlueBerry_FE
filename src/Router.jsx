import {useDispatch, useSelector} from "react-redux";
import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import {useContext, useEffect, useState} from "react";
import {DarkModeContext} from "./context/darkModeContext";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import {ConfirmAccount} from "./pages/confirm/ConfirmAccount";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import {getCurrentUser} from "./redux/service/userService";
import AccountSettings from "./pages/settings/AccountSettings";
import Search from "./pages/search/Search";
import {
    getCurrentUserFriendList,
    getIncomingFriendRequests,
    getSentFriendRequests,
} from "./redux/service/friendService";
import {Saved} from "./components/saved/Saved.jsx";
import {OnePost} from "./components/onepost/OnePost.jsx";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {firestore} from "./firebase";
import {getNotifications} from "./redux/service/NotificationService";
import {Notification} from "./components/notification/Notification.jsx";

function Router() {
    const accessToken = useSelector(({user}) => user.accessToken);
    const currentUser = useSelector(({user}) => user.currentUser);
    const dispatch = useDispatch();
    const [fetched, setFetched] = useState(false);
    const [firstRender, setFirstRender] = useState(false);

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
        const {darkMode} = useContext(DarkModeContext);
        const currentUser = useSelector(({user}) => user.currentUser);
        const dispatch = useDispatch();
        const [noti, setNoti] = useState([]);
        const [showNoti, setShowNoti] = useState(true);

        const notifor ={
            receiver:{
                avatarImage: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",

            },
            sender:{
                avatarImage: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
                fullName: "Chien Minh",
                statusId: 1,
                statusAuthorName: "huu sy"
            },
            type: "COMMENT_ON_OWN_POST"
        }
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
            // const unsubscribe = onSnapshot(
            //     query(
            //         collection(firestore, "notifications"),
            //         where("receiver.id", "==", currentUser.id),
            //         where("timeStamp", ">=", new Date())
            //     ),
            //     (snapshot) => {
            //         if (firstRender) {
            //             const notificationsData = snapshot.docs.map((doc) => doc.data()).sort((a, b) => b.id - a.id);
            //             const NewNoti = notificationsData[0]
            //             console.log("Current data: ", NewNoti);
            //             setNoti(NewNoti);
            //             dispatch(getNotifications());
            //         }
            //             setFirstRender(true)
            //
            //     }
            // );
            // return () => unsubscribe();
        }, []);

        useEffect(() => {
            if (noti) {
                console.log("Display notification:", noti);
            }
        }, [noti]);
        const handleOffNotification = () => {
            setShowNoti(false)
        }
        return (
            <div
                className={`theme-${darkMode ? "dark" : "light"}`}
                style={{backgroundColor: darkMode ? "#1f1f1f" : "#f6f3f3"}}
            >
                <Navbar/>
                {notifor && showNoti && (<Notification onClose={handleOffNotification} notifor={notifor}/>)}
                <Outlet/>
            </div>
        );
    };

    const PublicRoutes = () => {
        return <Outlet/>;
    };

    if (fetched) {
        return (
            <BrowserRouter>
                <Routes>
                    {accessToken ? (
                        <Route element={<PrivateRoutes/>}>
                            {currentUser ? (
                                <>
                                    <Route path="/" exact element={<Home/>}/>
                                    <Route path="/profile/:id" element={<Profile/>}/>
                                    <Route path="/search" element={<Search/>}/>
                                    <Route path="/saved" element={<Saved/>}/>
                                    <Route path="/:currentUser/post/:postId" element={<OnePost/>}/>
                                    <Route path="/accountsettings" element={<AccountSettings/>}/>
                                    <Route path="*" element={<Navigate to={"/"}/>}/>
                                </>
                            ) : (
                                <></>
                            )}
                        </Route>
                    ) : (
                        <Route element={<PublicRoutes/>}>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/confirm" element={<ConfirmAccount/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="*" element={<Navigate to={"/login"}/>}/>
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

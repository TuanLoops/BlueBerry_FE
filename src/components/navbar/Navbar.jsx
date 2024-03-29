import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { FaRegBell } from "react-icons/fa6";
import { FaBell } from "react-icons/fa6";
import { AiOutlineMessage } from "react-icons/ai";
import { AiFillMessage } from "react-icons/ai";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/service/userService.jsx";
import { Avatar, Badge } from "@mui/material";
import { getNotifications, updateAllNotification, updateNotification } from "../../redux/service/NotificationService.jsx";
import { formatDistanceToNowStrict } from "date-fns";
import { showStatus } from "../../redux/service/statusService.jsx";
import logo from "../../assets/logo-blueberry.png";
import { getChatRooms } from "../../redux/service/chatService.jsx";
import { openPopup } from "../../redux/reducer/chatReducer.jsx";
import ChatPopups from "../chatpopups/ChatPopups.jsx";

const Navbar = () => {
    const currentUser = useSelector(({ user }) => user.currentUser);
    const notifications = useSelector(
        ({ notification }) => notification.notifications
    );
    const { toggle, darkMode } = useContext(DarkModeContext);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showMessages, setShowMessages] = useState(false);
    const userRef = useRef(null);
    const notificationsRef = useRef(null);
    const messageButtonRef = useRef(null);
    const [searchValue, setSearchValue] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (userRef.current && !userRef.current.contains(event.target)) {
                setPopupVisible(false);
            }
        };

        dispatch(getNotifications());
        dispatch(getChatRooms());

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    const handleHome = () => {
        navigate("/");
        dispatch(showStatus());
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleLogOut = () => {
        try {
            dispatch(logOut());
        } catch (e) {
            console.log(e);
        }
    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleClearSearch = () => {
        setSearchValue("");
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch();
            handleClearSearch();
        }
    };

    const handleSearch = () => {
        navigate(`/search?q=${searchValue}`);
    };

    const togglePopup = () => {
        setPopupVisible(true);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (userRef.current && !userRef.current.contains(event.target)) {
                setPopupVisible(false);
            }
        };

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [userRef]);

    const disable = (e, fa) => {
        e.stopPropagation();
        setPopupVisible(fa);
    };

    const handleEditNotification = async ({ id, notification }) => {
        try {
            await updateNotification({ id, notification })
            dispatch(getNotifications())
        } catch (e) {
            console.log(e.response.data.message)
        }
    }

    const handleEditALlNotification = async (notifications) => {
        try {
            await updateAllNotification({ isRead: true });
            await dispatch(getNotifications())
        } catch (e) {
            console.log(e.response.data.message)
        }
    }

    return (
        <>
            <div className="navbar">
                <div className="left">
                    <Link
                        className="brand-container"
                        to="/"
                        style={{ textDecoration: "none" }}
                        onClick={handleHome}
                    >
                        <div className="brand-container__logo">
                            <img
                                style={{width: "30px"}}
                                src={logo}
                                alt="My Logo"
                            />
                        </div>
                        <div className="brand-container__brand-name">
                            <span>Blueberry</span>
                        </div>
                    </Link>
                    <div className="search">
                        <SearchOutlinedIcon />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchValue}
                            onChange={handleSearchChange}
                            onKeyDown={handleKeyPress}
                        />
                    </div>
                </div>
                <div className="right">
                    <div className="nav-item-right">
                        <Badge
                            max={9}
                            color="error"
                        >
                            <div
                                className="item-wrapper"
                                onClick={() => setShowMessages(!showMessages)}
                                ref={messageButtonRef}
                            >
                                {showMessages ? <AiFillMessage /> : <AiOutlineMessage />}
                                <div className="label-acc">Messages</div>
                            </div>
                        </Badge>
                        {showMessages && (
                            <MessagePopup
                                onClose={() => setShowMessages(false)}
                                buttonRef={messageButtonRef}
                            />
                        )}
                        <ChatPopups />
                    </div>
                    <div className="nav-item-right notification">
                        <Badge
                            badgeContent={notifications?.reduce((total, current) => {
                                if (!current.isRead) return total + 1;
                                else return total;
                            }, 0)}
                            max={9}
                            color="error"
                        >
                            <div
                                className="item-wrapper"
                                onClick={() => setShowNotifications(!showNotifications)}
                                ref={notificationsRef}
                            >
                                {showNotifications ? <FaBell/> : <FaRegBell/>}
                                <div className="label-acc">Notification</div>
                            </div>
                        </Badge>
                        {showNotifications && (
                            <NotificationPopup
                                onClose={() => setShowNotifications(false)}
                                notifications={notifications} handleEditNotification={handleEditNotification}
                                handleEditALlNotification={handleEditALlNotification}
                                buttonRef={notificationsRef}
                            />
                        )}
                    </div>
                    <div className="user" onClick={togglePopup} ref={userRef}>
                        <img src={currentUser?.avatarImage} alt="" />
                        <span></span>
                        <div className="label-acc">Account</div>
                        {isPopupVisible && (
                            <>
                                <div className="popup">
                                    <div className="info-user" onClick={(e) => disable(e, false)}>
                                        <Link
                                            to={`/profile/${currentUser.id}`}
                                            className="icon-user"
                                        >
                                            <div className="icon">
                                                <img src={currentUser.avatarImage} alt="" />
                                            </div>
                                            <div className="name-uer">
                                                <span>{currentUser.fullName}</span>
                                            </div>
                                        </Link>
                                        <Link to={`/profile/${currentUser?.id}`} className="href">
                                            <span>Trang cá nhân</span>
                                        </Link>
                                    </div>
                                    <div className="function">
                                        <div
                                            className="item-function"
                                            onClick={(e) => disable(e, false)}
                                        >
                                            <Link to={`/accountsettings`} className="on-function">
                                                <div className="background-item">
                                                    <i className="setting-privacy"></i>
                                                </div>
                                                <div className="body-item">
                                                    <span>Settings & Privacy</span>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="item-function" onClick={toggle}>
                                            <div className="on-function">
                                                <div className="background-item">
                                                    <i className="screen"></i>
                                                </div>
                                                <div className="body-item">
                                                    <span>Themes</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item-function" onClick={handleLogOut}>
                                            <Link to={{}} className="on-function">
                                                <div className="background-item">
                                                    <i className="logout"></i>
                                                </div>
                                                <div className="body-item">
                                                    <span>LogOut</span>
                                                    <i className="icon-item-logout"></i>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;

function NotificationPopup({onClose, buttonRef, handleEditNotification, handleEditALlNotification}) {
    const notificationRef = useRef(null);
    const notifications = useSelector(
        ({notification}) => notification.notifications
    );

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                !notificationRef.current.contains(event.target) &&
                !buttonRef.current.contains(event.target)
            ) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



    return (
        <div className="notification-container" ref={notificationRef}>
            <div className="notification-wrapper">
                <div className="notification-header">Notifications</div>
                <div className="see-all" onClick={() => handleEditALlNotification(
                    { notifications: { isRead: true } }
                )}><button>See all</button></div>
                <div className="notification-body">
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <NotificationItem
                                key={notification.id} handleEditNotification={handleEditNotification}
                                handleEditALlNotification={handleEditALlNotification}
                                notification={notification}
                            />
                        ))
                    ) : (
                        <div className="placeholder">You don't have any notifications</div>
                    )}
                </div>
            </div>
        </div>
    );
}

function NotificationItem({ notification, handleEditNotification }) {
    const notificationMessage = () => {
        switch (notification.type) {
            case "COMMENT_ON_OWN_POST":
                return (
                    <div className="message">
                        <span className="name">{notification.sender.fullName}</span>{" "}
                        commented on your post
                    </div>
                );
            case "COMMENT_ON_FOLLOWED_POST":
                return (
                    <div className="message">
                        <span className="name">{notification.sender.fullName}</span>{" "}
                        commented on {notification.statusAuthorName} 's post
                    </div>
                );
            case "LIKE_ON_POST":
                return (
                    <div className="message">
                        <span className="name">{notification.sender.fullName}</span> liked
                        your post
                    </div>
                );
            case "LIKE_ON_COMMENT":
                return (
                    <div className="message">
                        <span className="name">{notification.sender.fullName}</span> liked
                        your comment
                    </div>
                );
            case "FRIEND_REQUEST_INCOMING":
                return (
                    <div className="message">
                        <span className="name">{notification.sender.fullName}</span> sent
                        you a friend request
                    </div>
                );
            case "FRIEND_REQUEST_ACCEPT":
                return (
                    <div className="message">
                        <span className="name">{notification.sender.fullName}</span>{" "}
                        accepted your friend request
                    </div>
                );
            case "FRIEND_REQUEST_DECLINE":
                return (
                    <div className="message">
                        <span className="name">{notification.sender.fullName}</span>{" "}
                        declined your friend request
                    </div>
                );
        }
    };

    const destination = () => {
        switch (notification.type) {
            case "COMMENT_ON_OWN_POST":
                return `/${notification.receiver.fullName}/post/${notification.statusId}`
            case "COMMENT_ON_FOLLOWED_POST":
                return `/${notification.receiver.fullName}/post/${notification.statusId}`
            case "LIKE_ON_POST":
                return `/${notification.receiver.fullName}/post/${notification.statusId}`
            case "LIKE_ON_COMMENT":
                return `/${notification.receiver.fullName}/post/${notification.statusId}`
            case "FRIEND_REQUEST_INCOMING":
                return `/profile/${notification.sender.id}`
            case "FRIEND_REQUEST_ACCEPT":
                return `/profile/${notification.sender.id}`
            case "FRIEND_REQUEST_DECLINE":
                return `/profile/${notification.sender.id}`
        }
    };

    return (
        <Link to={destination()} className="notification-item" onClick={() => handleEditNotification({
            id: notification.id,
            notification: {
                isRead: true
            }
        })}>
            <Avatar
                sx={{ width: 56, height: 56 }}
                src={notification.sender.avatarImage}
                alt=""
            />
            <div
                className={`notification-detail ${notification.isRead ? "read" : ""}`}
            >
                {notificationMessage()}
                <div className="timestamp">
                    {formatDistanceToNowStrict(notification.timeStamp) + " ago"}
                </div>
            </div>
            {!notification.isRead && <div className="dot"></div>}
        </Link>
    );
}

function MessagePopup({ onClose, buttonRef }) {
    const messageRef = useRef(null);
    const chatRooms = useSelector(({ chat }) => chat.chatRooms).filter(
        (room) => room.messages.length > 0
    );

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                !messageRef.current.contains(event.target) &&
                !buttonRef.current.contains(event.target)
            ) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={messageRef} className="message-container">
            <div className="message-wrapper">
                <div className="message-header">Chats</div>
                <div className="message-body">
                    {chatRooms.length > 0 ? (
                        chatRooms.map((chatRoom) => (
                            <ChatItem
                                key={chatRoom.id}
                                chatRoom={chatRoom}
                                onClose={onClose}
                            />
                        ))
                    ) : (
                        <div className="placeholder">You don't have any messages</div>
                    )}
                </div>
            </div>
        </div>
    );
}

function ChatItem({ chatRoom, onClose }) {
    const currentUser = useSelector(({ user }) => user.currentUser);
    const dispatch = useDispatch();

    const findOtherUser = () => {
        return chatRoom.participants.find(
            (participant) => participant.id !== currentUser.id
        );
    };

    const handleClick = () => {
        dispatch(openPopup(chatRoom.id));
        onClose();
    };

    return (
        <div className="chat-item" onClick={handleClick}>
            <Avatar
                sx={{ width: 56, height: 56 }}
                src={findOtherUser().avatarImage}
                alt=""
            />
            <div className="chat-detail">
                <div className="chat-room-name">{findOtherUser().fullName}</div>
                <div className="last-message">
                    {chatRoom.lastMessage.sender.id === currentUser.id ? "You:" : ""}{" "}
                    {chatRoom.lastMessage.content}
                </div>
            </div>
        </div>
    );
}


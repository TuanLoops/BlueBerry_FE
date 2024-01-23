import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import { FaRegBell } from "react-icons/fa6";
import { FaBell } from "react-icons/fa6";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import {  useContext, useEffect, useRef, useState  } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/service/userService.jsx";
import { Avatar, Badge } from "@mui/material";
import { getNotifications } from "../../redux/service/NotificationService.jsx";
import { formatDistanceToNowStrict } from "date-fns";
import { showStatus } from "../../redux/service/statusService.jsx";

const Navbar = () => {
  const currentUser = useSelector(({ user }) => user.currentUser);
  const notifications = useSelector(
    ({ notification }) => notification.notifications
  );
  const { toggle, darkMode } = useContext(DarkModeContext);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const userRef = useRef(null);
  const notificationsRef = useRef(null);
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
      console.log("Search:", searchValue);
      handleClearSearch();
    }
  };

  const handleSearch = () => {
    navigate(`/search/all/${searchValue}`);
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

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [userRef]);

    
    return (
        <>
            <div className="navbar">
                <div className="left">
                    <Link className="brand-container" to="/" style={{ textDecoration: "none" }}>
                        <div className="brand-container__logo">
                            <img style={{ width: "30px" }} src="logo-blueberry.png" alt="My Logo" />
                        </div>
                        <div className="brand-container__brand-name">
                            <span>Blueberry</span>
                        </div>
                    </Link>
                    <div className="nav-item">
                        <HomeOutlinedIcon />
                        <div className="label-acc">Home</div>
                    </div>
                    <div className="nav-item">
                        {darkMode ? (
                            <WbSunnyOutlinedIcon onClick={toggle} />
                        ) : (
                            <DarkModeOutlinedIcon onClick={toggle} />
                        )}
                        <div className="label-acc">Mode</div>
                    </div>
                    <div className="nav-item">
                        <GridViewOutlinedIcon />
                        <div className="label-acc">View</div>
                    </div>
                    <div className="search">
                        <SearchOutlinedIcon />
                        <input type="text" placeholder="Search..." value={searchValue} onChange={handleSearchChange}
                            onKeyDown={handleKeyPress} />
                    </div>
                </div>
                <div className="right">
                    <div className="nav-item-right">
                        <PersonOutlinedIcon />
                        <div className="label-acc">Person</div>
                    </div>
                    <div className="nav-item-right">
                        <EmailOutlinedIcon />
                        <div className="label-acc">Mail</div>
                    </div>
                    <div className="nav-item-right">
                        <NotificationsOutlinedIcon />
                        <div className="label-acc">Notification</div>
                    </div>
                    <div className="user" onClick={togglePopup} ref={userRef}>
                        <img src={currentUser?.avatarImage} alt="" />
                        <span></span>
                        <div className="label-acc">Account</div>
                        {isPopupVisible && (
                            <>
                                <div className="popup">
                                    <div className="info-user">
                                        <Link to={`/profile/${currentUser.id}`} className="icon-user">
                                            <div className="icon">
                                                <img
                                                    src={currentUser.avatarImage}
                                                    alt="" />
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
                                        <div className="item-function">
                                            <Link to={`/accountsettings`} className="on-function">
                                                <div className="background-item">
                                                    <i className="setting-privacy"></i>
                                                </div>
                                                <div className="body-item">
                                                    <span>Settings & Privacy</span>
                                                </div>
                                            </Link>
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

function NotificationPopup({ onClose, buttonRef }) {
  const notificationRef = useRef(null);
  const notifications = useSelector(
    ({ notification }) => notification.notifications
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
        <div className="notification-body">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
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

function NotificationItem({ notification }) {
  console.log("ALO", notification);
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
    //TODO: Navigate to appropriate destination based on notification type
  };

  return (
    <Link to={destination()} className="notification-item">
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

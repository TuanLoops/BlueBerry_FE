import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/service/userService.jsx";


const Navbar = () => {
    const currentUser = useSelector(({ user }) => user.currentUser);
    const { toggle, darkMode } = useContext(DarkModeContext);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    

    const handleLogOut = async () => {
        try {
            await dispatch(logOut()).unwrap();
            window.location.reload();
        } catch (e) {
            console.log(e)
        }
    }

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleClearSearch = () => {
        setSearchValue("");
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch()
            console.log("Search:", searchValue);
            handleClearSearch()
        }
    };

    const handleSearch = () => {
        navigate(`/search/all/${searchValue}`)
    }


    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };

    const handleClickSettingPrivacy = () => {
        navigate('/accountsettings', { state: { currentUser } });
    }



    return (
        <>
            <div className="navbar">
                <div className="left">
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <span>Blueberry</span>
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
                    <div className="user" onClick={togglePopup}>
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
                                        <div className="item-function" onClick={handleClickSettingPrivacy}>
                                            <div className="on-function">
                                                <div className="background-item">
                                                    <i className="setting-privacy"></i>
                                                </div>
                                                <div className="body-item">
                                                    <span>Settings & Privacy</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item-function">
                                            <Link to={{}} className="on-function">
                                                <div className="background-item">
                                                    <i className="help-support"></i>
                                                </div>
                                                <div className="body-item">
                                                    <span>Change Password</span>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="item-function">
                                            <Link to={{}} className="on-function">
                                                <div className="background-item">
                                                    <i className="screen"></i>
                                                </div>
                                                <div className="body-item">
                                                    <span>Screen & accessibility</span>
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

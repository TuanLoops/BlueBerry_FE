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
import { useContext, useEffect, useRef, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/service/userService.jsx";
import logo from '../../../public/logo-blueberry.png'

const Navbar = () => {
    const currentUser = useSelector(({ user }) => user.currentUser);
    const { toggle, darkMode } = useContext(DarkModeContext);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const userRef = useRef(null);
    const [searchValue, setSearchValue] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const handleLogOut = async () => {
        try {
            await dispatch(logOut()).unwrap();
            if (!localStorage.getItem("AccessTokken")) {
                navigate("/login");
            }
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

    const disable = (e,fa) => {
        e.stopPropagation()
        setPopupVisible(fa)
    }
    return (
        <>
            <div className="navbar">
                <div className="left">
                    <Link className="brand-container" to="/" style={{ textDecoration: "none" }}>
                        <div className="brand-container__logo">
                            <img style={{ width: "30px" }} src={logo} alt="My Logo" />
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
                                    <div className="info-user" onClick={(e)=> disable(e,false)}>
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
                                        <Link to={`/profile/${currentUser?.id}`} className="href" onClick={(e)=> disable(e,false)}>
                                            <span>Trang cá nhân</span>
                                        </Link>
                                    </div>
                                    <div className="function">
                                        <div className="item-function" onClick={(e)=> disable(e,false)}>
                                            <Link to={`/accountsettings`} className="on-function">
                                                <div className="background-item">
                                                    <i className="setting-privacy"></i>
                                                </div>
                                                <div className="body-item">
                                                    <span>Settings & Privacy</span>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="item-function" onClick={(e)=> disable(e,false)}>
                                            <Link to={{}} className="on-function" >
                                                <div className="background-item">
                                                    <i className="help-support"></i>
                                                </div>
                                                <div className="body-item">
                                                    <span>Change Password</span>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="item-function" onClick={(e)=> disable(e,false)}>
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

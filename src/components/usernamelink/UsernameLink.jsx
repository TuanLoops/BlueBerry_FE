import {Link, useNavigate} from "react-router-dom";
import "./usernameLink.scss";
import { useState } from "react";
import { Avatar } from "@mui/material";
import FriendButton from "../friendbutton/FriendButton";
import { AiFillMessage } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { FaUserGear } from "react-icons/fa6";
import { UrlChat } from "../../context/connect";
import { openPopup } from "../../redux/reducer/chatReducer";

const UsernameLink = ({ user, style }) => {
  const [showQuickView, setShowQuickView] = useState(false);
  return (
    <div
      className="username-link"
      onMouseEnter={() => setShowQuickView(true)}
      onMouseLeave={() => setShowQuickView(false)}
    >
      <Link to={`/profile/${user.id}`} style={style} className="username">
        <span>{user.fullName}</span>
      </Link>
      {showQuickView && (
        <UserQuickView user={user} setShowQuickView={setShowQuickView} />
      )}
    </div>
  );
};

export default UsernameLink;

const UserQuickView = ({ user }) => {
  const currentUser = useSelector(({ user }) => user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMessageClick = async (id) => {
    try {
      const res = await UrlChat().get(`user/${id}`);
      dispatch(openPopup(res.data.id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="quick-view">
      <div className="quick-view-container">
        <div className="first-row">
          <img
            className="cover-photo"
            src={
              user.bannerImage ||
              "https://www.survivorsuk.org/wp-content/uploads/2017/01/no-image.jpg"
            }
            alt=""
          />
        </div>
        <div className="second-row">
          <Link to={`/profile/${user.id}`} className="quick-view-name">
            {user.fullName}
          </Link>
        </div>
        <div className="avatar">
          <Avatar sx={{ width: 130, height: 130 }} src={user.avatarImage} />
        </div>
      </div>
      <div className="button-group">
        {currentUser.id === user.id ? (
          <div>
            <button onClick={()=> navigate('/accountsettings')}>
              <FaUserGear />
              Account settings
            </button>
          </div>
        ) : (
          <>
            <FriendButton userId={user.id} />
            <div>
              <button
                className="message"
                onClick={() => handleMessageClick(user.id)}
              >
                <AiFillMessage />
                Message
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

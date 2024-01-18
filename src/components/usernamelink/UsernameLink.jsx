import { Link } from "react-router-dom";
import "./usernameLink.scss";
import { useState } from "react";
import { Avatar } from "@mui/material";

const UsernameLink = ({ user, style }) => {
  const [showQuickView, setShowQuickView] = useState(true);
  return (
    <div
      className="username-link"
      onMouseEnter={() => setShowQuickView(true)}
      // onMouseLeave={() => setShowQuickView(false)}
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
          <div className="quick-view-name">{user.fullName}</div>
        </div>
        <div className="avatar">
          <Avatar sx={{ width: 130, height: 130 }} src={user.avatarImage} />
        </div>
      </div>
      <div className="button-group">
        <button className="">Add friend</button>
        <button className="">Message</button>
      </div>
    </div>
  );
};

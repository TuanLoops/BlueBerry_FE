import "./leftBar.scss";
import Friends from "../../assets/1.png";
import notification from "../../assets/notification.png";
import Add from "../../assets/add.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import BookMark from "../../assets/bookmark.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";

const LeftBar = () => {
  const currentUser = useSelector(({ user }) => user.currentUser);
  const [click, setClick] = useState(false);
  const [click1, setClick1] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };
  const handleClick1 = () => {
    setClick1(!click1);
  };
  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <Link to={`/profile/${currentUser.id}`} className="user">
            <img src={currentUser.avatarImage} alt="" />
            <span>{currentUser.fullName}</span>
          </Link>
          <Link to={"friend"} className="item">
            <img src={Friends} alt="" />
            <span>Friends</span>
          </Link>
          <div className="item">
            <img src={notification} alt="" />
            <span>Notifications</span>
          </div>
          <div className="item">
            <img src={Messages} alt="" />
            <span>Messages</span>
          </div>
          <Link to={"saved"} className="item">
            <img src={BookMark} alt="" />
            <span>Saved</span>
          </Link>
        </div>
        <hr />
        <div className="menu">
          <div className="shortcut">
            <span>Your shortcuts</span>
            <img src={Add} onClick={handleClick}></img>
          </div>
          {click && (
            <div className="menu-shortcut">
              <div className="item">
                <img src={Events} alt="" />
                <span>Events</span>
              </div>
              <div className="item">
                <img src={Gaming} alt="" />
                <span>Gaming</span>
              </div>
              <div className="item">
                <img src={Gallery} alt="" />
                <span>Gallery</span>
              </div>
              <div className="item">
                <img src={Videos} alt="" />
                <span>Videos</span>
              </div>
            </div>
          )}
        </div>
        <hr />
        <div className="menu">
          <div className="shortcut">
            <span>Others</span>
            <img src={Add} onClick={handleClick1}></img>
          </div>
          {click1 && (
            <div className="menu-shortcut">
              <div className="item">
                <img src={Fund} alt="" />
                <span>Fundraiser</span>
              </div>
              <div className="item">
                <img src={Tutorials} alt="" />
                <span>Tutorials</span>
              </div>
              <div className="item">
                <img src={Courses} alt="" />
                <span>Courses</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftBar;

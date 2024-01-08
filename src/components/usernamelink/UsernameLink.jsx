/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./usernameLink.scss";

const UsernameLink = ({ userId, username, style }) => {
  return (
    <Link to={`/profile/${userId}`} style={style}>
      <span className="name">{username}</span>
    </Link>
  );
};

export default UsernameLink;

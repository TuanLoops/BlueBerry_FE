/* eslint-disable react/prop-types */
import UsernameLink from "../usernamelink/UsernameLink";
import "./comment.scss";

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <img src={comment.profilePicture} alt="" />
      <div className="info">
        <div className="author-name">
          <UsernameLink username={comment.name}/>
        </div>
        <div className="comment-body">
          <p>{comment.desc}</p>
        </div>
      </div>
      <span className="time">1 hour ago</span>
    </div>
  );
};

export default Comment;

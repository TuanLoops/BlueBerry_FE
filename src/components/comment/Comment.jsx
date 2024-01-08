/* eslint-disable react/prop-types */
import "./comment.scss";

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <img src={comment.profilePicture} alt="" />
      <div className="info">
        <span>{comment.name}</span>
        <p>{comment.desc}</p>
      </div>
      <span className="date">1 hour ago</span>
    </div>
  );
};

export default Comment;

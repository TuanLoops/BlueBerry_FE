import { useContext, useState } from "react";
import "./comments.scss";
import Comment from "../comment/Comment";
import TextareaAutosize from "react-textarea-autosize";
import { useSelector } from "react-redux";

const Comments = () => {
  const currentUser = useSelector(({ user }) => user.currentUser);
  //Temporary
  const comments = [
    {
      id: 1,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "John Doe",
      userId: 1,
      profilePicture:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "Jane Doe",
      userId: 2,
      profilePicture:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];
  return (
    <div className="comments">
      <hr />
      <div className="write">
        <div className="avatar">
          <img src={currentUser.avatarLink} alt="" />
        </div>
        <div className="comment-wrapper">
          <TextareaAutosize
            className="input-field"
            placeholder="Write a comment..."
          />
        </div>
        <div className="button-wrapper">
          <button>Send</button>
        </div>
      </div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;

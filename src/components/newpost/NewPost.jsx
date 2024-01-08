import { useContext, useState } from "react";
import "./newPost.scss";
import { AuthContext } from "../../context/authContext";
import TextareaAutosize from "react-textarea-autosize";

function NewPost() {
  const [content, setContent] = useState("");
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="new-post">
      <div className="wrapper">
        <div className="first-row">
          <div className={content ? "hide" : ""}>
            <img src={currentUser.profilePic} alt="" />
          </div>
          <div className="text-box">
            <TextareaAutosize
              className="write-new-post"
              placeholder={`What's on your mind, ${currentUser.name}?`}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="second-row">
          <div className="item">
            <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/c0dWho49-X3.png" />
            <span>Live video</span>
          </div>
          <div className="item">
            <img src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png" />
            <span>Live video</span>
          </div>
          <div className="item"></div>
        </div>
      </div>
    </div>
  );
}

export default NewPost;

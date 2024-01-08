import { useState } from "react";
import "./newPost.scss";
import TextareaAutosize from "react-textarea-autosize";

function NewPost() {
  const [content, setContent] = useState("");
  return (
    <div className="new-post">
      <div className="wrapper">
        <div className="title">
          <h4>Bạn đang nghĩ gì</h4>
        </div>
        <div className="first-row">
          <div className={content ? "hide" : ""}>
            <img  alt="" />
          </div>
          <div className={`text-box ${content ? "animation" : ""}`}>
            <TextareaAutosize
              className="write-new-post"
              placeholder={`What's on your mind`}
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

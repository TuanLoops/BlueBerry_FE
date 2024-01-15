import "./comments.scss";
import Comment from "../comment/Comment";
import { useSelector } from "react-redux";
import { TextareaAutosize } from "@mui/material";
import { useEffect, useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import { v4 as uuidv4 } from "uuid";
import { getImageURL, uploadImage } from "../../firebase";
import PreviewImg from "../previewimg/PreviewImg";
import CircularProgress from "@mui/material/CircularProgress";

const Comments = ({ postId }) => {
  const currentUser = useSelector(({ user }) => user.currentUser);
  const [comments, setComments] = useState([]);
  const [body, setBody] = useState("");
  const [imageList, setImageList] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputId = uuidv4();

  useEffect(() => {
    // Get comments from API
    // setComments(commentsFromAPI)
    setComments([
      {
        id: 1,
        body: "Lorem ipsum dolor sit amet consectetur adiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaapisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
        createdAt: "2023-01-27T12:30:01.000Z",
        author: {
          id: 1,
          fullName: "John Doe",
          avatarImage:
            "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        imageLink:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        id: 2,
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
        createdAt: "2023-01-27T12:38:00.000Z",
        author: {
          id: 2,
          fullName: "Jane Doe",
          avatarImage:
            "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
        },
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/blueberry-3a0b0.appspot.com/o/images%2F66432d9a-f5d0-4818-8c61-7123c450987c?alt=media&token=65a2e95b-88dd-4011-9c1c-416f878b2d19",
      },
      {
        id: 3,
        body: "Lorem ipsum",
        createdAt: "2023-01-27T12:33:02.000Z",
        author: {
          id: 2,
          fullName: "Jane Doe",
          avatarImage:
            "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
        },
      },
    ]);
  }, []);

  const handleComment = () => {
    if (body) {
      // Add comment logic
    }
  };

  const handleFileChange = async (e) => {
    for (const file of e.target.files) {
      if (file.type.includes("image")) {
        setIsUploading(true);
        const randomName = uuidv4();
        await uploadImage(randomName, file);
        const imageURL = await getImageURL(randomName);
        setImageList([{ imageLink: imageURL }]);
        setIsUploading(false);
      }
    }
  };

  const handleFileRemove = () => {
    setImageList([]);
  };

  return (
    <div className="comments">
      <hr />
      <div className="write">
        <div className="avatar">
          <img src={currentUser.avatarImage} alt="" />
        </div>
        <div className="write-comment-container">
          <div className="write-comment-wrapper">
            <TextareaAutosize
              spellCheck="false"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="input-field"
              placeholder="Write a comment..."
            />
            <label htmlFor={fileInputId} className="attach-image">
              <ImageIcon />
              <input id={fileInputId} type="file" onChange={handleFileChange} />
            </label>
          </div>
          <PreviewImg imageList={imageList} remove={handleFileRemove} />
        </div>
        <div className="button-wrapper">
          <button
            disabled={!body.length || isUploading}
            onClick={handleComment}
          >
            {isUploading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;

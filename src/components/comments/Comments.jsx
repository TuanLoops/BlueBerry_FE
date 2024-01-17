import "./comments.scss";
import Comment from "../comment/Comment";
import { useSelector } from "react-redux";
import { TextareaAutosize } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import { v4 as uuidv4 } from "uuid";
import { getImageURL, uploadImage } from "../../firebase";
import PreviewImg from "../previewimg/PreviewImg";
import CircularProgress from "@mui/material/CircularProgress";
import {
  createComment,
  getAllComments,
} from "../../redux/service/commentService.jsx";

const Comments = ({ postId }) => {
  const currentUser = useSelector(({ user }) => user.currentUser);
  const [comments, setComments] = useState([]);
  const [body, setBody] = useState("");
  const [imageList, setImageList] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputId = uuidv4();
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Get comments from API
    // setComments(commentsFromAPI)
    const fetch = async () => {
      let data = await getAllComments(postId);
      setComments(data);
      console.log(data)
    };
    fetch();
  }, []);

  const handleComment = async () => {
    if (body) {
      const comment = {
        body: body,
        image: imageList[0],
      };
      try {
        const comment1 = await createComment(postId, comment);
        setBody("");
        setImageList([]);
        setComments([comment1, ...comments]);
      } catch (e) {
        console.log(e);
      }
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
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFileRemove = () => {
    setImageList([]);
  };

  const changeCountLikes = (id,like) =>{
    let newList = comments.map(item=>{
      if (item.id===id){
        if(like===1){
          item.countLikes+=1;
          item.liked=true;
        }else {
          item.countLikes-=1;
          item.liked=false;
        }
      }
      return item;
    })
    setComments(newList)
  }

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
              <input
                accept="image/*"
                ref={fileInputRef}
                id={fileInputId}
                type="file"
                onChange={handleFileChange}
              />
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
        <Comment key={comment.id} comment={comment} changeCountLikes={changeCountLikes}/>
      ))}
    </div>
  );
};

export default Comments;

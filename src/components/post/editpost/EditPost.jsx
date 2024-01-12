import { useRef, useState } from "react";
import "./editPost.scss";
import { formatDistanceToNow } from "date-fns";
import PrivacyIcon from "./../../privacyicon/PrivacyIcon";
import { CircularProgress } from "@mui/material";
import TextareaAutosize from "react-textarea-autosize";
import PreviewImg from "../../previewimg/PreviewImg";
import { getImageURL, uploadImage } from "../../../firebase";
import { v4 as uuidv4 } from "uuid";

function EditPost({ post, onClose }) {
  const [body, setBody] = useState(post.body);
  const [imageList, setImageList] = useState(post.imageList);
  const [isUploading, setIsUploading] = useState(false);
  const modalRef = useRef(null);

  const handleClose = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  const handleFileChange = async (e) => {
    const images = [];
    for (const file of e.target.files) {
      if (file.type.includes("image")) {
        const randomName = uuidv4();
        setIsUploading(true);
        await uploadImage(randomName, file);
        const imageURL = await getImageURL(randomName);
        images.push({ imageLink: imageURL });
        setIsUploading(false);
      }
    }
    setImageList([...imageList, ...images]);
  };

  const handlePaste = async (e) => {
    const images = [];
    let items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.includes("image")) {
        var blob = item.getAsFile();
        const randomName = uuidv4();
        setIsUploading(true);
        await uploadImage(randomName, blob);
        const imageURL = await getImageURL(randomName);
        images.push({ imageLink: imageURL });
        setIsUploading(false);
      }
    }
    setImageList([...imageList, ...images]);
  };

  const handleFileRemove = (index) => {
    console.log(index);
    setImageList(([...imageList]) => {
      imageList.splice(index, 1);
      console.log(imageList);
      return imageList;
    });
  };

  const handleSave = () => {
    //TODO: save edited post
  };

  return (
    <div className="edit-post-modal" ref={modalRef} onClick={handleClose}>
      <div className="edit-container">
        <div className="edit-wrapper">
          <div className="edit-header">
            <span>Edit post</span>
          </div>
          <div className="edit-body">
            <div className="author-info">
              <div className="avatar">
                <img src={post.author.avatarImage} alt="" />
              </div>
              <div className="author-container">
                <div className="author-name">{post.author.fullName}</div>
                <div className="time">
                  <PrivacyIcon
                    className="privacy-icon"
                    privacyLevel={"PUBLIC"}
                  />
                  {`${formatDistanceToNow(post.createdAt)} ago`}
                </div>
              </div>
            </div>
            <div className="post-content">
              <TextareaAutosize
                placeholder={`What's on your mind`}
                value={body}
                onChange={(e) => {
                  setBody(e.target.value);
                }}
                onPaste={handlePaste}
              />
              <input
                accept="image/*"
                id="file"
                type="file"
                multiple
                onChange={handleFileChange}
              />
              <PreviewImg imageList={imageList} remove={handleFileRemove} />
            </div>
          </div>
          <div className="edit-footer">
            <button className="cancel" onClick={() => onClose()}>
              <div>Cancel</div>
            </button>
            <button className="save" onClick={handleSave}>
              <div className="btn-content">
                {isUploading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  <div>Save</div>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditPost;

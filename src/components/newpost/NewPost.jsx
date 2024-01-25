import { useRef, useState } from "react";
import "./newPost.scss";
import PostButton from "./postbutton/PostButton";
import PreviewImg from "../previewimg/PreviewImg";
import { getImageURL, uploadImage } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addStatus } from "../../redux/service/statusService.jsx";
import { useSelector } from "react-redux";
import { TextareaAutosize } from "@mui/material";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import LockIcon from "@mui/icons-material/Lock";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PrivacySetting from "../post/privacysetting/PrivacySetting.jsx";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function NewPost() {
  const dispatch = useDispatch();
  const currentUser = useSelector(({ user }) => user.currentUser);
  const inputRef = useRef(null);
  const [body, setBody] = useState("");
  const [imageList, setImageList] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [privacyLevel, setPrivacyLevel] = useState("PUBLIC");
  const [isPopupPrivacy, setPopupPrivacy] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const fileInputRef = useRef(null);

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
    fileInputRef.current.value = "";
  };

  const handlePaste = async (e) => {
    const images = [];
    let items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.includes("image")) {
        const blob = item.getAsFile();
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
    setImageList(([...imageList]) => {
      imageList.splice(index, 1);
      return imageList;
    });
  };

  const handlePost = async () => {
    if (!body) return;
    await dispatch(addStatus({ body, imageList, privacyLevel })).unwrap();
    setBody("");
    setImageList([]);
    setOpenToast(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenToast(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div className="new-post">
      <div className="wrapper">
        <div className="title">
          <h4>Make a new post</h4>
        </div>
        <div className="first-row">
          <div className={`avatar-container ${body ? "hide" : ""}`}>
            <img src={currentUser?.avatarImage} alt="" />
          </div>
          <div
            className={`text-box ${body ? "stretch" : ""}`}
            onClick={() => inputRef.current.focus()}
          >
            <TextareaAutosize
              ref={inputRef}
              maxRows={12}
              spellCheck="false"
              className="write-new-post"
              placeholder={`What's on your mind, ${currentUser.lastName}?`}
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
              }}
              onPaste={handlePaste}
            />
          </div>
        </div>
        <PreviewImg imageList={imageList} remove={handleFileRemove} />
        <div className="second-row">
          <div className="item" onClick={() => setPopupPrivacy(true)}>
            <span>
              {privacyLevel === "PUBLIC"
                ? "Public"
                : privacyLevel === "FRIENDS"
                ? "Friends"
                : "Only me"}
            </span>
            {privacyLevel === "PUBLIC" ? (
              <PublicOutlinedIcon />
            ) : privacyLevel === "FRIENDS" ? (
              <PeopleAltIcon />
            ) : (
              <LockIcon />
            )}
          </div>
          {isPopupPrivacy && (
            <PrivacySetting
              defaultChecked={privacyLevel}
              handleSave={(checked) => {
                setPrivacyLevel(checked);
                setPopupPrivacy(false);
              }}
              onClose={() => setPopupPrivacy(false)}
            />
          )}

          <label htmlFor="file" className="item">
            <span>Pick photo</span>
            <img
              draggable="false"
              src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png"
              alt=""
            />
            <input
              accept="image/*"
              id="file"
              type="file"
              multiple
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </label>
          <PostButton
            className="item"
            onClick={handlePost}
            loading={isUploading}
            disabled={!body}
          />
        </div>
      </div>
      <Snackbar
        open={openToast}
        autoHideDuration={4000}
        onClose={handleClose}
        message="New status posted"
        action={action}
      />
    </div>
  );
}

export default NewPost;

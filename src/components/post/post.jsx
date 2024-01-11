/* eslint-disable react/prop-types */
import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import VpnLockOutlinedIcon from "@mui/icons-material/VpnLockOutlined";
import Comments from "../comments/Comments";
import { useState } from "react";
import UsernameLink from "./../usernamelink/UsernameLink";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { format, formatDistanceToNow } from "date-fns";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [index, setIndex] = useState(-1);
  const [showMore, setShowMore] = useState(false);

  const liked = false;
  const length = post.imageList.length;
  const count = () => {
    if (length === 1) {
      return 1;
    } else {
      return 2;
    }
  };

  const handleEditPost = () => {
    //TODO: edit post
  };

  const handleDeletePost = () => {
    //TODO: delete post
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.author.avatarImage} alt="" />
            <div className="details">
              <div>
                <UsernameLink
                  userId={post.author.id}
                  username={post.author.fullName}
                  style={{ textDecoration: "none", color: "inherit" }}
                />
              </div>
              <span className="time">
                <div className="time-container">
                  {formatDistanceToNow(post.createdAt)} ago
                </div>
                <div className="time-popup">
                  <div className="popup-wrapper">
                    {format(post.createdAt, "dd/MM/yyyy hh:mm:ss")}
                  </div>
                </div>
              </span>
            </div>
          </div>
          <div className="more-container">
            <div className="more" onClick={() => setShowMore(!showMore)}>
              <MoreHorizIcon />
            </div>
            {showMore && (
              <div className="more-popup">
                <div className="wrapper">
                  <div className="item" onClick={handleEditPost}>
                    <span className="icon">
                      <EditNoteOutlinedIcon />
                    </span>
                    <span>Edit your post</span>
                  </div>
                  <div className="item" onClick={handleDeletePost}>
                    <span className="icon">
                      <DeleteForeverOutlinedIcon />
                    </span>
                    <span>Delete your post</span>
                  </div>
                  <div className="item">
                    <span className="icon">
                      <VpnLockOutlinedIcon />
                    </span>
                    <span className="title">Change post's privacy</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="content">
          <div>
            <div>{post.body}</div>
          </div>
          {post.imageList.length > 0 && (
            <div
              className={`images-container ${
                length > 5
                  ? "too-many"
                  : length > 3
                  ? "many"
                  : length > 1
                  ? "medium"
                  : ""
              }`}
            >
              <PhotoAlbum
                layout="columns"
                columns={count}
                onClick={({ index }) => {
                  setIndex(index);
                }}
                photos={post.imageList
                  .map((item, index) => {
                    return {
                      src: item.imageLink,
                      width: 200,
                      height: 300,
                      key: index,
                    };
                  })
                  .splice(0, 5)}
              />
            </div>
          )}
          <Lightbox
            index={index}
            open={index >= 0}
            close={() => setIndex(-1)}
            plugins={[Thumbnails, Counter, Zoom]}
            carousel={3}
            thumbnails={{
              position: "bottom",
              width: 50,
              height: 80,
              border: 0,
              borderRadius: 0,
              padding: 0,
              gap: 16,
              showToggle: false,
            }}
            slides={post.imageList.map((item) => {
              return { src: item.imageLink };
            })}
          />
        </div>
        <hr />
        <div className="info">
          <div className="item">
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            12 Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments />}
      </div>
    </div>
  );
};

export default Post;

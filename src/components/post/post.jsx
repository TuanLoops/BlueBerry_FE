import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Comments from "../comments/Comments";
import { useRef, useState } from "react";
import UsernameLink from "../usernamelink/UsernameLink";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import MoreOptions from "./moreoptions/MoreOptions";
import { Link } from "react-router-dom";
import PrivacyIcon from "../privacyicon/PrivacyIcon.jsx";
import Time from "../time/Time.jsx";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [index, setIndex] = useState(-1);
  const [showMore, setShowMore] = useState(false);
  const showMoreButtonRef = useRef(null);

  const liked = false;
  const length = post.imageList.length;
  const count = () => {
    if (length === 1) {
      return 1;
    } else {
      return 2;
    }
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <Link to={`profile/${post.id}`}>
              <img src={post.author.avatarImage} alt="" />
            </Link>
            <div className="details">
              <div>
                <UsernameLink
                  userId={post.author.id}
                  username={post.author.fullName}
                />
              </div>
              <div className="info">
                <PrivacyIcon
                  className="icon"
                  privacyLevel={post.privacyLevel}
                />
                <Time time={post.createdAt} />
              </div>
            </div>
          </div>
          <div className="more-container">
            <div
              className="more"
              ref={showMoreButtonRef}
              onClick={() => setShowMore(!showMore)}
            >
              <MoreHorizIcon />
            </div>
            {showMore && (
              <MoreOptions
                post={post}
                buttonRef={showMoreButtonRef}
                onClose={() => setShowMore(false)}
              />
            )}
          </div>
        </div>
        <div className="content">
          <div>
            <div className="post-body">{post.body}</div>
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
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;

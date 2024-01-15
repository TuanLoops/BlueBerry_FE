/* eslint-disable react/prop-types */
import "./comment.scss";
import UsernameLink from "../usernamelink/UsernameLink";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Time from "../time/Time";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { useEffect, useRef, useState } from "react";

const Comment = ({ comment }) => {
  const actionButtonRef = useRef(null);
  const [index, setIndex] = useState(-1);
  const [liked, setLiked] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    // call api to like comment
  };


  return (
    <div className="comment-container">
      <div className="comment-left">
        <img src={comment.author.avatarImage} alt="" />
      </div>
      <div className="comment-middle">
        <div className="comment-wrapper">
          <div className="author-name">
            <UsernameLink username={comment.author.fullName} />
          </div>
          <div className="comment-body">
            <div>{comment.body}</div>
          </div>
          {comment.image && (
            <div className="image">
              <img src={comment.image.imageLink} onClick={() => setIndex(0)} alt="" />
              <Lightbox
                index={index}
                open={index >= 0}
                close={() => setIndex(-1)}
                plugins={[Zoom]}
                slides={[{ src: comment.image.imageLink }]}
              />
            </div>
          )}
        </div>
        <div className="comment-footer">
          <div className="like" onClick={handleLike}>
            {liked ? (
              <FavoriteOutlinedIcon className="liked" />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
            <span>10 Likes</span>
          </div>
          <Time time={comment.createdAt} />
        </div>
      </div>
      <div className="comment-right">
        <div className="actions">
          <div
            className="dot"
            ref={actionButtonRef}
            onClick={() => setShowActions(!showActions)}
          >
            <MoreHorizIcon />
          </div>
          {showActions && (
            <Popup
              comment={comment}
              buttonRef={actionButtonRef}
              onClose={() => setShowActions(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;

const Popup = ({ comment, onClose, buttonRef }) => {
  const popupRef = useRef(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (e) => {
    if (
      !popupRef.current.contains(e.target) &&
      !buttonRef.current.contains(e.target)
    ) {
      onClose();
    }
  };

  return (
    <div ref={popupRef}>
      <div className="popup">
        <div className="popup-wrapper">
          <div className="item" onClick={() => setShowEditModal(true)}>
            Edit
          </div>
          <div className="item" onClick={() => setShowDeleteModal(true)}>
            Delete
          </div>
          <div className="item">Report this comment</div>
        </div>
      </div>
      {showEditModal && (
        <EditPost comment={comment} onClose={() => setShowEditModal(false)} />
      )}
      {showDeleteModal && (
        <DeleteComment
          commentId={comment.id}
          onClose={() => {
            setShowDeleteModal(false);
          }}
        />
      )}
    </div>
  );
};

function DeleteComment({ commentId, onClose }) {
  const modalRef = useRef(null);
  const handleClose = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  const handleDelete = () => {
    //TODO: delete post

  };

  return (
    <div className="delete-comment-modal" ref={modalRef} onClick={handleClose}>
      <div className="delete-container">
        <div className="delete-wrapper">
          <div className="delete-header">
            <span>Delete comment</span>
          </div>
          <div className="delete-body">
            <span>Are you sure you want to delete this comment?</span>
          </div>
          <div className="delete-footer">
            <button className="cancel" onClick={() => onClose()}>
              <div>Cancel</div>
            </button>
            <button className="delete" onClick={handleDelete}>
              <div>Delete</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

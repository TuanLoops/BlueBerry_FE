import { useRef } from "react";
import "./deletePost.scss";

function DeletePost({ postId, onClose }) {
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
    <div className="delete-post-modal" ref={modalRef} onClick={handleClose}>
      <div className="delete-container">
        <div className="delete-wrapper">
          <div className="delete-header">
            <span>Delete post</span>
          </div>
          <div className="delete-body">
            <span>Are you sure you want to delete this post?</span>
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
export default DeletePost;

import { useRef } from "react";
import "./deletePost.scss";
import {useDispatch} from "react-redux";
import {deleteStatus} from "../../../redux/service/statusService.jsx";

function DeletePost({ postId, onClose }) {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const handleClose = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  const handleDelete = () => {
    //TODO: delete post
    try {
      dispatch(deleteStatus(postId)).then();
      onClose();
    }catch (e) {
      if(e.response){}
      alert("Success")
    }
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

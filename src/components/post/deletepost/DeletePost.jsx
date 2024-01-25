import { useRef, useState } from "react";
import "./deletePost.scss";
import { useDispatch } from "react-redux";
import { deleteStatus } from "../../../redux/service/statusService.jsx";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function DeletePost({ postId, onClose }) {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const [open, setOpen] = useState();
  const handleClose = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  const handleDelete = () => {
    try {
      dispatch(deleteStatus(postId)).then();
      onClose();
      setOpen(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseToast}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

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
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleCloseToast}
        message="Post deleted"
        action={action}
      />
    </div>
  );
}
export default DeletePost;

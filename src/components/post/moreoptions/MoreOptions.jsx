import "./moreOptions.scss";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import VpnLockOutlinedIcon from "@mui/icons-material/VpnLockOutlined";
import FlagIcon from "@mui/icons-material/Flag";
import { useEffect, useRef, useState } from "react";
import PrivacySetting from "../privacysetting/PrivacySetting";
import DeletePost from "../deletepost/DeletePost";
import EditPost from "../editpost/EditPost";
import { useSelector } from "react-redux";

function MoreOptions({ onClose, buttonRef, post }) {
  const popupRef = useRef(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPrivacySetting, setShowPrivacySettings] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const currentUser = useSelector(({ user }) => user.currentUser);

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
    <>
      <div ref={popupRef}>
        <div className="more-popup">
          <div className="wrapper">
            {currentUser.id === post.author.id ? (
              <>
                <div className="item" onClick={() => setShowEditModal(true)}>
                  <span className="icon">
                    <EditNoteOutlinedIcon />
                  </span>
                  <span>Edit your post</span>
                </div>
                <div
                  className="item"
                  onClick={() => setShowPrivacySettings(true)}
                >
                  <span className="icon">
                    <VpnLockOutlinedIcon />
                  </span>
                  <span className="title">Change post's privacy</span>
                </div>
                <div className="item" onClick={() => setShowDeleteModal(true)}>
                  <span className="icon">
                    <DeleteForeverOutlinedIcon />
                  </span>
                  <span>Delete your post</span>
                </div>
              </>
            ) : (
              <div className="item">
                <span className="icon">
                  <FlagIcon />
                </span>
                <span>Report this post</span>
              </div>
            )}
          </div>
        </div>
        {showEditModal && (
          <EditPost post={post} onClose={() => setShowEditModal(false)} />
        )}
        {showDeleteModal && (
          <DeletePost
            postId={post.id}
            onClose={() => {
              setShowDeleteModal(false);
            }}
          />
        )}
        {showPrivacySetting && (
          <PrivacySetting
            postId={post.id}
            defaultChecked={post.privacyLevel}
            onClose={() => setShowPrivacySettings(false)}
          />
        )}
      </div>
    </>
  );
}
export default MoreOptions;

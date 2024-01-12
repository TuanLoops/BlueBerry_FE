import "./moreOptions.scss";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import VpnLockOutlinedIcon from "@mui/icons-material/VpnLockOutlined";
import { useEffect, useRef, useState } from "react";
import PrivacySetting from "../privacysetting/PrivacySetting";

function MoreOptions({ onClose, buttonRef }) {
  const popupRef = useRef(null);
  const [showPrivacySetting, setShowPrivacySettings] = useState(false);

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
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

  const showEditModal = () => {
    //TODO:
  };

  const showDeleteModal = () => {
    //TODO:
  };

  return (
    <>
      <div ref={popupRef}>
        <div className="more-popup">
          <div className="wrapper">
            <div className="item" onClick={showEditModal}>
              <span className="icon">
                <EditNoteOutlinedIcon />
              </span>
              <span>Edit your post</span>
            </div>
            <div className="item" onClick={showDeleteModal}>
              <span className="icon">
                <DeleteForeverOutlinedIcon />
              </span>
              <span>Delete your post</span>
            </div>
            <div className="item" onClick={() => setShowPrivacySettings(true)}>
              <span className="icon">
                <VpnLockOutlinedIcon />
              </span>
              <span className="title">Change post's privacy</span>
            </div>
          </div>
        </div>
        {showPrivacySetting && (
          <PrivacySetting defaultChecked={0} onClose={() => setShowPrivacySettings(false)} />
        )}
      </div>
    </>
  );
}
export default MoreOptions;

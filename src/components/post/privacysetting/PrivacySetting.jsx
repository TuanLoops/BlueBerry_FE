import "./privacySetting.scss";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LockIcon from "@mui/icons-material/Lock";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import { useRef, useState } from "react";

function PrivacySetting({ onClose, defaultChecked }) {
  const [checked, setChecked] = useState(defaultChecked);
  const modalRef = useRef(null);
  const handleClose = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  return (
    <div className="privacy-setting" ref={modalRef} onClick={handleClose}>
      <div className="privacy-container">
        <div className="privacy-wrapper">
          <div className="modal-header">
            <span>Privacy setting</span>
          </div>
          <div className="modal-body">
            <div className="item" onClick={() => setChecked(0)}>
              <div className="icon">
                <PublicOutlinedIcon />
              </div>
              <div className="text">
                <div className="title">Public</div>
                <div className="description">Everybody can see yor post</div>
              </div>
              <input type="radio" checked={checked === 0} />
            </div>
            <div className="item" onClick={() => setChecked(1)}>
              <div className="icon">
                <PeopleAltIcon />
              </div>
              <div className="text">
                <div className="title">Friends</div>
                <div className="description">
                  Your friends can see your post
                </div>
              </div>
              <input type="radio" checked={checked === 1} />
            </div>
            <div className="item" onClick={() => setChecked(2)}>
              <div className="icon">
                <LockIcon />
              </div>
              <div className="text">
                <div className="title">Only me</div>
                <div className="description">
                  No one can see your post but you
                </div>
              </div>
              <input type="radio" checked={checked === 2} />
            </div>
          </div>
          <div className="modal-footer">
            <button>
              <div>Save</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PrivacySetting;

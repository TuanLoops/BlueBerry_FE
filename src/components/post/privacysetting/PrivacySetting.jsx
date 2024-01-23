import "./privacySetting.scss";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LockIcon from "@mui/icons-material/Lock";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import { useRef, useState } from "react";
import {useDispatch} from "react-redux";
import {changePrivacy} from "../../../redux/service/statusService.jsx";

function PrivacySetting({ onClose, defaultChecked,handleSave }) {
  const [checked, setChecked] = useState(defaultChecked);
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const handleClose = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };


  return (
    <div className="privacy-modal" ref={modalRef} onClick={handleClose}>
      <div className="privacy-container">
        <div className="privacy-wrapper">
          <div className="modal-header">
            <span>Privacy setting</span>
          </div>
          <div className="modal-body">
            <div className="item" onClick={() => setChecked("Public")}>
              <div className="icon">
                <PublicOutlinedIcon />
              </div>
              <div className="text">
                <div className="title">Public</div>
                <div className="description">Everybody can see yor post</div>
              </div>
              <input
                onChange={() => setChecked("Public")}
                type="radio"
                checked={checked === "Public"}
              />
            </div>
            <div className="item" onClick={() => setChecked("Friends")}>
              <div className="icon">
                <PeopleAltIcon />
              </div>
              <div className="text">
                <div className="title">Friends</div>
                <div className="description">
                  Your friends can see your post
                </div>
              </div>
              <input
                onChange={() => setChecked("Friends")}
                type="radio"
                checked={checked === "Friends"}
              />
            </div>
            <div className="item" onClick={() => setChecked("Only me")}>
              <div className="icon">
                <LockIcon />
              </div>
              <div className="text">
                <div className="title">Only me</div>
                <div className="description">
                  No one can see your post but you
                </div>
              </div>
              <input
                onChange={() => setChecked("Only me")}
                type="radio"
                checked={checked === "Only me"}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="cancel" onClick={() => onClose()}>
              <div>Cancel</div>
            </button>
            <button className="save" onClick={() => handleSave(checked)}>
              <div>Save</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PrivacySetting;

import "./moreOptions.scss";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import FaceIcon from "@mui/icons-material/Face";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { Modal } from "@mui/base/Modal";
import { useState } from "react";
import ChangeAvatar from "./changeavatar/ChangeAvatar";

function MoreOptions() {
  const [changeAvatar, setChangeAvatar] = useState(false);

  return (
    <div className="more-options">
      <div className="wrapper">
        <div
          className="option-item"
          onClick={() => {
            setChangeAvatar(true);
          }}
        >
          <FaceIcon /> <span>Change avatar</span>
        </div>
        <div className="option-item">
          <InsertPhotoIcon /> <span>Change cover photo</span>
        </div>
        <div className="option-item">
          <ManageAccountsIcon /> <span>Edit profile</span>
        </div>
      </div>
      {changeAvatar && <ChangeAvatar onClose={() => setChangeAvatar(false)} />}
    </div>
  );
}
export default MoreOptions;

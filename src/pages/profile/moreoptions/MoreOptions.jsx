import "./moreOptions.scss";
import FaceIcon from "@mui/icons-material/Face";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { useEffect, useRef, useState} from "react";
import ChangeAvatar from "./changeavatar/ChangeAvatar";
import {ChangePhoto} from "./changephoto/ChangePhoto.jsx";

function MoreOptions({onClose, buttonRef }) {
    const popupRef = useRef(null);
    const [changeAvatar, setChangeAvatar] = useState(false);
    const [changePhoto, setChangePhoto] = useState(false);

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
    }
    return (
        <div ref={popupRef}>
            <div className="more-options">
                <div className="wrapper">
                    <div
                        className="option-item"
                        onClick={() => {
                            setChangeAvatar(true);
                        }}
                    >
                        <FaceIcon/> <span>Change avatar</span>
                    </div>
                    <div className="option-item" onClick={()=>setChangePhoto(true)}>
                        <InsertPhotoIcon/> <span>Change cover photo</span>
                    </div>
                </div>
            </div>
            {changeAvatar && <ChangeAvatar onClose={() => setChangeAvatar(false)}/>}
            {changePhoto && <ChangePhoto onClose={() => setChangePhoto(false)}/>}
        </div>
    );
}

export default MoreOptions;

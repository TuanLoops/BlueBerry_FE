import "./moreOptions.scss";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import FaceIcon from "@mui/icons-material/Face";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import {useContext, useEffect, useRef, useState} from "react";
import ChangeAvatar from "./changeavatar/ChangeAvatar";
import SearchIcon from "@mui/icons-material/Search";
import {ChangePhoto} from "./changephoto/ChangePhoto.jsx";
import {SearchModal} from "./search/SearchModal.jsx";
import {EditProfile} from "./edtiProfile/EditProfile.jsx";

function MoreOptions({onClose, buttonRef, onSearchChange }) {
    const popupRef = useRef(null);
    const [changeAvatar, setChangeAvatar] = useState(false);
    const [changePhoto, setChangePhoto] = useState(false);
    const [editProfile, setEditProfile] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

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
                    <div className="option-item" onClick={()=>{
                        setShowSearch(true)
                    }}>
                        <SearchIcon/>
                        <span>Search</span>
                    </div>
                    <div className="option-item" onClick={()=>setEditProfile(true)}>
                        <ManageAccountsIcon/> <span>Edit profile</span>
                    </div>
                </div>
            </div>
            {changeAvatar && <ChangeAvatar onClose={() => setChangeAvatar(false)}/>}
            {changePhoto && <ChangePhoto onClose={() => setChangePhoto(false)}/>}
            {showSearch && <SearchModal onClose={() => setShowSearch(false)} onSearchChange={onSearchChange} />}
            {editProfile && <EditProfile/>}
        </div>
    );
}

export default MoreOptions;

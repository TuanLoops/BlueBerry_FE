import {useRef, useState} from "react";
import './editProfile.scss'
import ClearIcon from "@mui/icons-material/Clear";
import {useDispatch} from "react-redux";
import {updateProfile} from "../../../redux/service/userService.jsx";

export const EditProfile = ({onclose, buttonRef, infoCurrentUser}) => {
    const modalRef = useRef(null);
    const [showInputHobbies, setShowInput] = useState(false);
    const [showInputAddress, setShowInputAddress] = useState(false);
    const [showInputPhone, setShowInputPhone] = useState(false);
    const [hobbies,setHobbies] = useState("");
    const [address,setAddress] = useState("");
    const [phone,setPhone] = useState("");
    const dispatch = useDispatch();
    const handleClose = (e) => {
        if (e.target.classList.contains("overlay-edit")) {
            onclose();
        }
    };

    const handleSave = async () => {
        try {
            dispatch(updateProfile({
                id: infoCurrentUser.id,
                dob: infoCurrentUser.dob,
                firstName: infoCurrentUser.firstName,
                lastName: infoCurrentUser.lastName,
                phoneNumber: phone,
                hobbies: hobbies,
                address: address,
            }))
        } catch (error) {
            console.error(error);
        }
        onclose();
    };

    return(
        <div className="edit-profile" ref={modalRef}>
            <div className="overlay-edit" onMouseDown={handleClose}></div>
            <div className="container">
                <div className="div">
                    <div className="title">
                        <span>Chỉnh sửa chi tiết</span>
                    </div>
                    <ClearIcon className="remove-icon" onClick={onclose}/>
                </div>
                <div className="main">
                    <div className="title">
                        <span>Chỉnh sửa phần giới thiệu</span>
                        <span>Chi tiết bạn chọn sẽ hiển thị công khai.</span>
                    </div>
                    <div className="ingredient">
                        <span>Hobbies</span>
                        {infoCurrentUser.hobbies ? (
                            <>
                                <div className="xyu64">
                                    <div className="xhj49">
                                        <span>{infoCurrentUser.hobbies}</span>
                                    </div>
                                    <div className="xki87">
                                        <a href=""></a>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {showInputHobbies ? (
                                    <div className="Nhjw6">
                                        <input type="text" placeholder="Sở thích của bạn"
                                               onChange={(e) => {
                                                   setHobbies(e.target.value);
                                               }}
                                        />
                                    </div>
                                ) : (
                                    <div className="xhj49">
                                        <i className="icon-edit"></i>
                                        <button onClick={() => setShowInput(true)}>Thêm Sở thích</button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <div className="ingredient">
                        <span>Address</span>
                        {infoCurrentUser.address ? (
                            <>
                                <div className="xyu64">
                                    <div className="xhj49">
                                        <span>{infoCurrentUser.address}</span>
                                    </div>
                                    <div className="xki87">
                                        <a href=""></a>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {showInputAddress ? (
                                    <div className="Nhjw6">
                                        <input type="text" placeholder="Địa chỉ của bạn"
                                               onChange={(e) => {
                                                   setAddress(e.target.value);
                                               }}
                                        />
                                    </div>
                                ) : (
                                    <div className="xhj49">
                                        <i className="icon-edit"></i>
                                        <button onClick={() => setShowInputAddress(true)}>Thêm địa chỉ</button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <div className="ingredient">
                        <span>Phone</span>
                        {infoCurrentUser.phoneNumber ? (
                            <>
                                <div className="xyu64">
                                    <div className="xhj49">
                                        <span>{infoCurrentUser.phoneNumber}</span>
                                    </div>
                                    <div className="xki87">
                                        <a href=""></a>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {showInputPhone ? (
                                    <div className="Nhjw6">
                                        <input type="text" placeholder="Số điện thoại của bạn"
                                               onChange={(e) => {
                                                   setPhone(e.target.value);
                                               }}
                                        />
                                    </div>
                                ) : (
                                    <div className="xhj49">
                                        <i className="icon-edit"></i>
                                        <button onClick={() => setShowInputPhone(true)}>Thêm số điện thoại</button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
                <div className="actionEdit">
                    <button onClick={onclose}>Cancel</button>
                    <button className="save" onClick={handleSave}>Save</button>
                </div>
            </div>

        </div>
    )
}
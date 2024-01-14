import {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {v4 as uuidv4} from "uuid";
import {getImageURL, uploadImage} from "../../../../firebase/index.js";
import {Button} from "@mui/material";
import PreviewOneImg from "../../../../components/previewoneimg/PreviewOneImg.jsx";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import ClearIcon from "@mui/icons-material/Clear";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import {changeAvatar, changePhoto, getCurrentUser} from "../../../../redux/service/userService.jsx";
import {addStatus} from "../../../../redux/service/statusService.jsx";


export const ChangePhoto = ({ onClose }) => {
    const dispatch = useDispatch();
    const [isUploading, setIsUploading] = useState(false);
    const [image, setImage] = useState([]);
    const [body] = useState("");
    const modalPhotoRef = useRef(null);

    const handleFileChange = async (e) => {
        const images = [];
        for (const file of e.target.files) {
            if (file.type.includes("image")) {
                const randomName = uuidv4();
                setIsUploading(true);
                await uploadImage(randomName, file);
                const imageURL = await getImageURL(randomName);
                images.push({ imageLink: imageURL });
                setIsUploading(false);
            }
        }
        setImage([...image, ...images]);
    };

    const handleClose = (e) => {
        if (e.target.classList.contains("overlay")) {
            onClose();
        }
    };

    const handleSave = async () => {
        const imageLink = image.length > 0 ? image[0].imageLink : null;
        await changePhoto(imageLink);
        setImage([]);
        await dispatch(getCurrentUser());
        if (imageLink) {
            await dispatch(addStatus({ body, imageList: [{ imageLink }] })).unwrap();
        }
        onClose();
    };

    const handleFileRemove = (index) => {
        setImage(([...imageList]) => {
            imageList.splice(index, 1);
            return imageList;
        });
    };

    return (
        <div className="change-avatar" ref={modalPhotoRef}>
            <div className="overlay" onMouseDown={handleClose}></div>
            <div className="ca-container">
                <div className="div">
                    <div className="title-chan">
                        <span>Cập nhật ảnh đại diện</span>
                    </div>
                    <ClearIcon className="remove-icon" onClick={onClose}/>
                </div>
                <div className="upLoad">
                    <label htmlFor="file" className="items">
                        <Button className="btn" component="label" variant="contained" startIcon={<CloudUploadIcon/>}>
                            <span>UpLoad</span>
                            <input
                                accept="image/*"
                                id="file"
                                type="file"
                                multiple
                                onChange={handleFileChange}
                            />
                        </Button>
                    </label>
                    <div className="preview">
                        <PreviewOneImg imageList={image} remove={handleFileRemove}/>
                        {isUploading && (
                            <div className="load">
                                <Box sx={{'& > button': {m: 1}}}>
                                    <LoadingButton
                                        className="loading"
                                        endIcon={<SendIcon/>}
                                        loading={true}
                                        loadingPosition="end"
                                        variant="contained"
                                    >
                                    </LoadingButton>
                                </Box>
                            </div>
                        )}
                    </div>
                </div>
                <div className="action">
                    <div className="btn">
                        <button className="save" onClick={handleSave}>Save</button>
                        <button  onClick={onClose}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

import {useContext, useState} from "react";
import "./newPost.scss";
import TextareaAutosize from "react-textarea-autosize";
import PostButton from "./postbutton/PostButton";
import PreviewImg from "../previewimg/PreviewImg";
import {getImageURL, uploadImage} from "../../firebase";
import {v4 as uuidv4} from "uuid";
import {useDispatch} from "react-redux";
import {addStatus, showStatus} from "../../redux/service/statusService.jsx";

function NewPost() {
    const dispatch = useDispatch();
    const [body, setBody] = useState("");
    const [imageList, setImageList] = useState([]);

    const handleFileChange = async (e) => {
        if (e.target.files[0]?.type.includes("image/")) {
            const file = e.target.files[0];
            const randomName = uuidv4();
            await uploadImage(randomName, file);
            const imageURL = await getImageURL(randomName);
            setImageList(([...images]) => {
                images.push({imageLink: imageURL});
                return images;
            });
        }
    };

    const handleFileRemove = (index) => {
        setImageList(([...images]) => {
            images.splice(index, 1);
            return images;
        });
    };

    const handlePost = () => {
        dispatch(addStatus({body, imageList})).then(() => {
            dispatch(showStatus());
        });
    };

    return (
        <div className="new-post">
            <div className="wrapper">
                <div className="title">
                    <h4>Make a new post</h4>
                </div>
                <div className="first-row">
                    <div className={body ? "hide" : ""}>
                        <img alt=""/>
                    </div>
                    <div className={`text-box ${body ? "animation" : ""}`}>
                        <TextareaAutosize
                            className="write-new-post"
                            placeholder={`What's on your mind`}
                            value={body}
                            onChange={(e) => {
                                setBody(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <PreviewImg imageList={imageList} remove={handleFileRemove}/>
                <div className="second-row">
                    <div className="item">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/c0dWho49-X3.png"/>
                        <span>Live video</span>
                    </div>

                    <label htmlFor="file" className="item">
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png"/>
                        <span>Live video</span>
                        <input
                            accept="image/*"
                            id="file"
                            type="file"
                            onChange={handleFileChange}
                        />
                    </label>

                    <div className="post-button">
                        <PostButton
                            onClick={handlePost}
                            disabled={body ? false : true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewPost;

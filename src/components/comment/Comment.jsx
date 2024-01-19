/* eslint-disable react/prop-types */
import "./comment.scss";
import UsernameLink from "../usernamelink/UsernameLink";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Time from "../time/Time";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import {useEffect, useRef, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {CircularProgress, TextareaAutosize} from "@mui/material";
import {formatDistanceToNow} from "date-fns";
import PreviewImg from "../previewimg/PreviewImg";
import {getImageURL, uploadImage} from "../../firebase";
import {deleteComment, updateComment} from "../../redux/service/commentService.jsx";
import ImageIcon from "@mui/icons-material/Image";

const Comment = ({comment, postId, onUpdate}) => {
    const actionButtonRef = useRef(null);
    const [index, setIndex] = useState(-1);
    const [liked, setLiked] = useState(false);
    const [showActions, setShowActions] = useState(false);
    const handleLike = () => {
        setLiked(!liked);
        // call api to like comment
    };

    return (
        <div className="comment-container">
            <div className="comment-left">
                <img src={comment.author.avatarImage} alt=""/>
            </div>
            <div className="comment-middle">
                <div className="comment-wrapper">
                    <div className="author-name">
                        <UsernameLink user={comment.author}/>
                    </div>
                    <div className="comment-body">
                        <div>{comment.body}</div>
                    </div>
                    {comment.image && (
                        <div className="image">
                            <img
                                src={comment.image.imageLink}
                                onClick={() => setIndex(0)}
                                alt=""
                            />
                            <Lightbox
                                index={index}
                                open={index >= 0}
                                close={() => setIndex(-1)}
                                plugins={[Zoom]}
                                slides={[{src: comment.image.imageLink}]}
                            />
                        </div>
                    )}
                </div>
                <div className="comment-footer">
                    <div className="like" onClick={handleLike}>
                        {liked ? (
                            <FavoriteOutlinedIcon className="liked"/>
                        ) : (
                            <FavoriteBorderOutlinedIcon/>
                        )}
                        <span className={liked ? "liked" : ""}>10 Likes</span>
                    </div>
                    <Time time={comment.createdAt}/>
                </div>
            </div>
            <div className="comment-right">
                <div className="actions">
                    <div
                        className="dot"
                        ref={actionButtonRef}
                        onClick={() => setShowActions(!showActions)}
                    >
                        <MoreHorizIcon/>
                    </div>
                    {showActions && (
                        <Popup
                            comment={comment} postId={postId} onUpdate={onUpdate}
                            buttonRef={actionButtonRef}
                            onClose={() => setShowActions(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Comment;

const Popup = ({comment, onClose, buttonRef, postId, onUpdate}) => {
    const popupRef = useRef(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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
        <div ref={popupRef}>
            <div className="popup">
                <div className="popup-wrapper">
                    <div className="item" onClick={() => setShowEditModal(true)}>
                        Edit
                    </div>
                    <div className="item" onClick={() => setShowDeleteModal(true)}>
                        Delete
                    </div>
                    <div className="item">Report this comment</div>
                </div>
            </div>
            {showEditModal && (
                <EditPost comment={comment} postId={postId} onUpdate={onUpdate}
                          onClose={() => setShowEditModal(false)}/>
            )}
            {showDeleteModal && (
                <DeleteComment
                    commentId={comment.id} onUpdate={onUpdate}
                    onClose={() => {
                        setShowDeleteModal(false);
                    }}
                />
            )}
        </div>
    );
};

function DeleteComment({commentId, onClose, onUpdate}) {
    const modalRef = useRef(null);
    const handleClose = (e) => {
        if (e.target === modalRef.current) {
            onClose();
        }
    };

    const handleDelete = async () => {
        try {
            await deleteComment(commentId);
            onClose();
            onUpdate();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="delete-comment-modal" ref={modalRef} onClick={handleClose}>
            <div className="delete-container">
                <div className="delete-wrapper">
                    <div className="delete-header">
                        <span>Delete comment</span>
                    </div>
                    <div className="delete-body">
                        <span>Are you sure you want to delete this comment?</span>
                    </div>
                    <div className="delete-footer">
                        <button className="cancel" onClick={() => onClose()}>
                            <div>Cancel</div>
                        </button>
                        <button className="delete" onClick={handleDelete}>
                            <div>Delete</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function EditPost({comment, onClose, onUpdate}) {
    const [body, setBody] = useState(comment.body);
    const [imageList, setImageList] = useState([comment.image]);
    const fileInputId = uuidv4();
    const [isUploading, setIsUploading] = useState(false);
    const modalRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const input = inputRef.current;
        input.setSelectionRange(input.value.length, input.value.length);
        input.focus();
    }, []);

    const handleClose = (e) => {
        if (e.target === modalRef.current) {
            onClose();
        }
    };

    const handleFileChange = async (e) => {
        const images = [];
        for (const file of e.target.files) {
            if (file.type.includes("image")) {
                const randomName = uuidv4();
                setIsUploading(true);
                await uploadImage(randomName, file);
                const imageURL = await getImageURL(randomName);
                images.push({imageLink: imageURL});
                setIsUploading(false);
            }
        }
        setImageList([...imageList, ...images]);
    };

    const handlePaste = async (e) => {
        const images = [];
        let items = e.clipboardData.items;
        for (const item of items) {
            if (item.type.includes("image")) {
                setIsUploading(true);
                var blob = item.getAsFile();
                const randomName = uuidv4();
                await uploadImage(randomName, blob);
                const imageURL = await getImageURL(randomName);
                images.push({imageLink: imageURL});
                setIsUploading(false);
            }
        }
        setImageList(images);
    };

    const handleFileRemove = () => {
        setImageList([]);
    };

    const handleSave = async () => {
        if (!body) return;
        onClose();
        const updatedComment = {
            ...comment,
            body: body,
        };
        try {
            await updateComment(comment.id, updatedComment);
            onUpdate();
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="edit-comment-modal" ref={modalRef} onClick={handleClose}>
            <div className="edit-container">
                <div className="edit-wrapper">
                    <div className="edit-header">
                        <span>Edit comment</span>
                    </div>
                    <div className="edit-body">
                        <div className="author-info">
                            <div className="avatar">
                                <img src={comment.author.avatarImage} alt=""/>
                            </div>
                            <div className="author-container">
                                <div className="author-name">{comment.author.fullName}</div>
                                <div className="time">
                                    {`${formatDistanceToNow(comment.createdAt)} ago`}
                                </div>
                            </div>
                        </div>
                        <div className="post-content">
                            <TextareaAutosize
                                ref={inputRef}
                                minRows={imageList.length > 0 ? 4 : 8}
                                maxRows={12}
                                placeholder={`What's on your mind`}
                                value={body}
                                spellCheck="false"
                                onChange={(e) => {
                                    setBody(e.target.value);
                                }}
                                onPaste={handlePaste}
                            />
                            <label htmlFor={fileInputId} className="attach-image">
                                <input
                                    accept="image/*"
                                    id={fileInputId}
                                    type="file"
                                    multiple
                                    onChange={handleFileChange}
                                />
                                <ImageIcon/>
                            </label>
                            <PreviewImg imageList={imageList} remove={handleFileRemove}/>
                        </div>
                    </div>
                    <div className="edit-footer">
                        <button className="cancel" onClick={() => onClose()}>
                            <div>Cancel</div>
                        </button>
                        <button className="save" onClick={handleSave}>
                            <div className="btn-content">
                                {isUploading ? (
                                    <CircularProgress color="inherit" size={20}/>
                                ) : (
                                    <div>Save</div>
                                )}
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

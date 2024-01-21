import "./moreOptions.scss";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import VpnLockOutlinedIcon from "@mui/icons-material/VpnLockOutlined";
import FlagIcon from "@mui/icons-material/Flag";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import { useEffect, useRef, useState } from "react";
import PrivacySetting from "../privacysetting/PrivacySetting";
import DeletePost from "../deletepost/DeletePost";
import EditPost from "../editpost/EditPost";
import {useDispatch, useSelector} from "react-redux";
import {changePrivacy} from "../../../redux/service/statusService.jsx";
import {getAllSaveArticle, remove, save} from "../../../redux/service/saveAvticleService.jsx";

function MoreOptions({ onClose, buttonRef, post, updateSuccessMessage}) {
  const popupRef = useRef(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPrivacySetting, setShowPrivacySettings] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const currentUser = useSelector(({ user }) => user.currentUser);
  const dispatch = useDispatch();
  const [article, setArticle] = useState([]);

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

  const handleSave = (checked) => {
    const status= {
      id:post.id,
      privacyLevel: checked
    }
    console.log(status)
    // TODO: save edit
    try {
      dispatch(changePrivacy(status))
      onClose();
    }catch (e){
      console.log(e)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllSaveArticle(currentUser.id);
        setArticle(result.map(item => ({ id: item.id, status: item.status })));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentUser.id]);


  const handleSavePost = async (postId) => {
    try {
      await save({ id: postId });
      updateSuccessMessage(true);
      setTimeout(() => updateSuccessMessage(false), 3000)
    } catch (error) {
      console.error("Error saving post:", error);
    }
  }

  const handleDeleteSaved = async (articleId) => {
    try {
      await remove(articleId, currentUser.id);
      updateSuccessMessage(false)
    } catch (error) {
      console.error('Error removing article:', error);
    }
  };

  return (
    <>
      <div ref={popupRef}>
        <div className="more-popup">
          <div className="wrapper">
            {currentUser.id === post.author.id ? (
              <>
                <div className="item" onClick={() => setShowEditModal(true)}>
                  <span className="icon">
                    <EditNoteOutlinedIcon />
                  </span>
                  <span>Edit your post</span>
                </div>
                <div
                  className="item"
                  onClick={() => setShowPrivacySettings(true)}
                >
                  <span className="icon">
                    <VpnLockOutlinedIcon />
                  </span>
                  <span className="title">Change post's privacy</span>
                </div>
                <div className="item" onClick={() => setShowDeleteModal(true)}>
                  <span className="icon">
                    <DeleteForeverOutlinedIcon />
                  </span>
                  <span>Delete your post</span>
                </div>
              </>
            ) : (
            <>
              <div className="item">
                {article.some(articles => articles.status.id === post.id) ? (
                    <div className="unsave" onClick={()=>{
                      const savedArticle = article.find(article => article.status.id === post.id);
                      if (savedArticle) {
                        handleDeleteSaved(savedArticle.id).then();
                        onClose();
                      }
                    }}>
                      <span className="icon">
                            <BookmarkRemoveIcon/>
                      </span>
                      <span>UnSave Post</span>
                    </div>
                ) : (
                    <div className="save" onClick={()=>{
                      handleSavePost(post.id).then();
                      onClose();
                    }}>
                        <span className="icon">
                            <BookmarkIcon/>
                        </span>
                        <span>Save Post</span>
                    </div>
                )}
              </div>
              <div className="item">
                <span className="icon">
                  <FlagIcon/>
                </span>
                <span>Report this post</span>
              </div>
            </>
            )}
          </div>
        </div>
        {showEditModal && (
            <EditPost post={post} onClose={() => setShowEditModal(false)}/>
        )}
        {showDeleteModal && (
            <DeletePost
            postId={post.id}
            onClose={() => {
              setShowDeleteModal(false);
            }}
          />
        )}
        {showPrivacySetting && (
          <PrivacySetting
              handleSave={handleSave}
            defaultChecked={post.privacyLevel}
            onClose={() => setShowPrivacySettings(false)}
          />
        )}
      </div>
    </>
  );
}
export default MoreOptions;

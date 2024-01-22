import './all.scss';
import {Link} from "react-router-dom";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {useEffect, useRef, useState} from "react";
import {remove} from "../../../redux/service/saveAvticleService.jsx";
export const All = ({currentUser,article, setSavedArticles}) => {
    const [isPopUp, setPopUp] = useState(null);
    const popUpRef = useRef();

    const handlePopUpToggle = (index) => {
        setPopUp((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleDeleteSaved = async (articleId) => {
        try {
            await remove(articleId, currentUser.id);
            setSavedArticles((prevSavedArticles) =>
                prevSavedArticles.filter((article) => article.id !== articleId)
            );
            setPopUp(false);
        } catch (error) {
            console.error('Error removing article:', error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popUpRef.current && !popUpRef.current.contains(event.target)) {
                setPopUp(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [popUpRef]);


    return(
        <>
            {article.map((article, index) => (
                <div className="main-saved-all" key={article.id}>
                    <div className="container-saved">
                        {article.status.imageList && article.status.imageList.length > 0 ? (
                            <div className="content-img">
                                <img src={article.status.imageList[0].imageLink} alt="" />
                            </div>
                        ) : (
                            <div className="content-img">
                                <img src={article.appUser.avatarImage} alt="" />
                            </div>
                        )}

                        <div className="content-header">
                            <div className="X19">
                                {article.status.body.length > 100 ? (
                                    <>
                                        {article.status.body.substring(0, 189)}...
                                    </>
                                ) : (
                                    article.status.body
                                )}
                            </div>
                            <div className="X20">
                                <div className="type">
                                    Post
                                </div>
                                <div className="type">
                                    Save To Demo
                                </div>
                            </div>
                            <div className="X21">
                                <div className="user">
                                    <img
                                        src={article.appUser.avatarImage}
                                        alt=""/>
                                </div>
                                <div className="link-post">
                                    <span>Save from </span>
                                    <div className="X210">
                                        <Link to={""}>{article.appUser.firstName +" "+ article.appUser.lastName}</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="X22">
                                <div className="X22Sy">
                                    <div className="X22Sy1">
                                        <span>Add to collection</span>
                                    </div>
                                    <div className="X22Sy1">
                                        <span>Share</span>
                                    </div>
                                    <div className="X22Sy1"  onClick={() => handlePopUpToggle(index)}>
                                        <span><MoreHorizIcon/></span>
                                    </div>
                                </div>
                                {isPopUp === index && (
                                    <div className="PopupSaved" ref={popUpRef}>
                                        <div className="actionSaved" onClick={()=> handleDeleteSaved(article.id)}>
                                            <i></i>
                                            <span>UnSaved</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
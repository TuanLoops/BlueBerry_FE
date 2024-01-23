import './onepost.scss';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Post from "../post/post.jsx";
import {getStatusById} from "../../redux/service/statusService.jsx";


export const OnePost = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const posts = useSelector(({status})=> status.list)

    useEffect(() => {
        dispatch(getStatusById(postId))
    }, [postId]);

    return (
        <div className="onePost">
           <div className="Xp1">
               {Object.keys(posts).length > 0 ? (
                   <Post post={posts[0]} />
               ) : (
                   <p>No data found for postId: {postId}</p>
               )}
           </div>
        </div>
    );

};

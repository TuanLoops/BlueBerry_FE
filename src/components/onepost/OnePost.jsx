import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getStatusById} from "../../redux/service/statusService.jsx";


export const OnePost = () => {
    const {postId} = useParams();
    const dispatch = useDispatch();
    const post = useSelector((state)=>state.status.onePost)
    useEffect(() => {
        dispatch(getStatusById(postId))
    }, []);
    console.log(post)
    return(
        <>
            {post &&  <div>{post.imageList.id}</div>}
        </>
    )
}
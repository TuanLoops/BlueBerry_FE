import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {UrlStatus} from "../../context/connect.jsx";
import Post from "../post/post.jsx";
import Posts from "../posts/Posts.jsx";


export const OnePost = () => {
    const { postId } = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await UrlStatus().get(`${postId}`);
                setPosts(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [postId]);
    console.log(postId)
    console.log(posts)
    return (
        <div>
            {posts && (
                <Posts posts={posts}/>
            )}
        </div>
    );
};

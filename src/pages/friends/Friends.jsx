import './friends.scss';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUserFriendList, unfriend} from "../../redux/service/friendService.jsx";
import {UrlFriend} from "../../context/connect.jsx";
import {AllFriend} from "./all/AllFriend.jsx";
export const Friends = () => {
    const dispatch = useDispatch();
    const [friendAll, setFriendAll] = useState("All")
    const [friend, setFriend] =useState([]);

    const  fetchData = async () => {
        const res = await UrlFriend().get("/list")
        setFriend(res.data)
    }

    useEffect(() => {
        fetchData().then()
    }, []);

    const handleUnFriend = async (id) => {
        await dispatch(unfriend(id))
        fetchData().then()
    }
    return(
        <div className="friend-page">
            <div className="left-friend">
                <div className="title">
                    <h1>Friend</h1>
                </div>
                <div className="btn">
                    <button onClick={()=> setFriendAll("All")}>All Friend</button>
                    <button>InComing Friend Request</button>
                    <button>Resident Friend Request</button>
                </div>
            </div>
            <div className="right-friend">
                {friendAll === "All" && (
                    <AllFriend friend={friend} handleUnFriend={handleUnFriend}/>
                )}
            </div>
        </div>
    )
}
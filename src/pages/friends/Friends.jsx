import "./friends.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getIncomingFriendRequests,
  getSentFriendRequests,
  unfriend,
} from "../../redux/service/friendService.jsx";
import { UrlFriend } from "../../context/connect.jsx";
import { AllFriend } from "./all/AllFriend.jsx";
import { FriendInComing } from "./friendincoming/FriendInComing.jsx.jsx";
import { FriendSend } from "./friendsend/FriendSend.jsx";
export const Friends = () => {
  const dispatch = useDispatch();
  const [friendAll, setFriendAll] = useState("All");
  const [friend, setFriend] = useState([]);
  const incomingFriendRequests = useSelector(
    ({ friend }) => friend.incomingFriendRequests
  );
  const sentFriendRequests = useSelector(
    ({ friend }) => friend.sentFriendRequests
  );
  console.log(sentFriendRequests);
  const fetchData = async () => {
    const res = await UrlFriend().get("/list");
    setFriend(res.data);
    dispatch(getIncomingFriendRequests());
    dispatch(getSentFriendRequests());
  };

  useEffect(() => {
    fetchData().then();
  }, []);

  const handleUnFriend = async (id) => {
    await dispatch(unfriend(id));
    fetchData().then();
  };
  return (
    <div className="friend-page">
      <div className="left-friend">
        <div className="title">
          <h1>Friend</h1>
        </div>
        <div className="btn">
          <button onClick={() => setFriendAll("All")}>All Friend</button>
          <button onClick={() => setFriendAll("COMING")}>
            InComing Friend Request
          </button>
          <button onClick={() => setFriendAll("RESIDENT")}>
            Resident Friend Request
          </button>
        </div>
      </div>
      <div className="right-friend">
        {friendAll === "All" ? (
          <AllFriend friend={friend} handleUnFriend={handleUnFriend} />
        ) : friendAll === "COMING" ? (
          <div className="right-friend-container">
            {" "}
            {incomingFriendRequests && (
              <FriendInComing request={incomingFriendRequests} />
            )}{" "}
          </div>
        ) : (
          <div className="right-friend-container">
            <FriendSend request={sentFriendRequests} />
          </div>
        )}
      </div>
    </div>
  );
};

import { Badge } from "@mui/material";
import "./rightBar.scss";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { differenceInSeconds } from "date-fns";
import {
  acceptFriendRequest,
  declineFriendRequest,
} from "../../redux/service/friendService";
import { openPopup } from "../../redux/reducer/chatReducer";
import { UrlChat } from "../../context/connect";

const RightBar = () => {
  const friendList = useSelector(({ friend }) => friend.friendList);
  const friendRequests = useSelector(
    ({ friend }) => friend.incomingFriendRequests
  );

  return (
    <div className="rightBar">
      <div className="container">
        <FriendRequestQuickView requests={friendRequests} />
        <FriendList friendList={friendList} />
      </div>
    </div>
  );
};

export default RightBar;

const FriendRequestQuickView = ({ requests }) => {
  const dispatch = useDispatch();

  const handleAcceptRequest = (requestId) => {
    dispatch(acceptFriendRequest(requestId));
  };

  const handleDeclineRequest = (requestId) => {
    dispatch(declineFriendRequest(requestId));
  };

  return (
    <div className="request-container">
      <div className="request-title">{requests.length} Friend requests</div>
      {requests.map((request) => (
        <div key={request.id} className="request">
          <Avatar
            sx={{ width: 36, height: 36 }}
            src={request.sender.avatarImage}
            alt={request.sender.fullName}
          />
          <div className="request-details">
            <span className="request-name">{request.sender.fullName}</span>
            <div className="button-group">
              <button
                className="btn accept"
                onClick={() => handleAcceptRequest(request.id)}
              >
                Accept
              </button>
              <button
                className="btn decline"
                onClick={() => handleDeclineRequest(request.id)}
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const FriendList = ({ friendList }) => {
  const dispatch = useDispatch();
  const chatRooms = useSelector(({ chat }) => chat.chatRooms);

  const handleClick = async (id) => {
    try {
      const res = await UrlChat().get(`user/${id}`);
      dispatch(openPopup(res.data.id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="friend-list">
      <div className="title">Friend list</div>
      {friendList.map((friend) => (
        <div
          key={friend.id}
          className="friend"
          onClick={() => handleClick(friend.id)}
        >
          {differenceInSeconds(Date.now(), new Date(friend.lastOnline)) <=
          60 ? (
            <>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  sx={{ width: 36, height: 36 }}
                  src={friend.avatarImage}
                  alt={friend.fullName}
                />
              </Badge>
              <span className="friend-name">{friend.fullName}</span>
            </>
          ) : (
            <>
              <Avatar
                sx={{ width: 36, height: 36 }}
                src={friend.avatarImage}
                alt={friend.fullName}
              />
              <span className="friend-name offline">{friend.fullName}</span>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

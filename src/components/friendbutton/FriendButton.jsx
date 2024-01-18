import { useDispatch, useSelector } from "react-redux";
import "./friendButton.scss";
import { FaUserCheck } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";
import { FaUserXmark } from "react-icons/fa6";
import {
  acceptFriendRequest,
  cancelFriendRequest,
  sendFriendRequest,
  unfriend,
} from "../../redux/service/friendService";

function FriendButton({ userId }) {
  const dispatch = useDispatch();

  const friendList = useSelector(({ friend }) => friend.friendList);

  const incomingFriendRequests = useSelector(
    ({ friend }) => friend.incomingFriendRequests
  );
  const sentFriendRequests = useSelector(
    ({ friend }) => friend.sentFriendRequests
  );

  const handleAddFriend = () => {
    dispatch(sendFriendRequest(userId));
  };

  const handleUnfriend = () => {
    dispatch(unfriend(userId));
  };

  const handleCancelRequest = () => {
    dispatch(cancelFriendRequest(userId));
  };

  const handleAcceptRequest = () => {
    dispatch(acceptFriendRequest(userId));
  };

  const isFriend = friendList.find((friend) => friend.id === userId);
  const isIncomingRequest = incomingFriendRequests.find(
    (request) => request.sender.id === userId
  );
  const isSentRequest = sentFriendRequests.find(
    (request) => request.receiver.id === userId
  );

  return (
    <div className="friend-button">
      {isFriend ? (
        <button className="unfriend" onClick={handleUnfriend}>
          <FaUserXmark /> Unfriend
        </button>
      ) : isIncomingRequest ? (
        <button className="accept" onClick={handleAcceptRequest}>
          <FaUserCheck /> Accept request
        </button>
      ) : isSentRequest ? (
        <button className="cancel" onClick={handleCancelRequest}>
          <FaUserXmark /> Cancel request
        </button>
      ) : (
        <button className="add" onClick={handleAddFriend}>
          <FaUserPlus /> Add friend
        </button>
      )}
    </div>
  );
}
export default FriendButton;

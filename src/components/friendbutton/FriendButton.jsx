import { useSelector } from "react-redux";
import "./friendButton.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FriendButton({ friendId }) {
  const friendList = useSelector(({ friends }) => friends.list);
  const incomingFriendRequests = useSelector(({ friends }) => friends.requests);
  const sentFriendRequests = useSelector(({ friends }) => friends.sentRequests);

  return (
    <div className="friend-button">
      {friendList.find((friend) => friend.id === friendId) ? (
        <button className="unfriend">
          <FontAwesomeIcon icon="fa-regular fa-user-xmark" /> Unfriend
        </button>
      ) : incomingFriendRequests.find(
          (request) => request.sender.id === friendId
        ) ? (
        <button className="accept">
          <FontAwesomeIcon icon="fa-regular fa-user-check" /> Accept request
        </button>
      ) : sentFriendRequests.find(
          (request) => request.receiver.id === friendId
        ) ? (
        <button className="cancel">
          <FontAwesomeIcon icon="fa-regular fa-user-xmark" /> Cancel request
        </button>
      ) : (
        <button></button>
      )}
    </div>
  );
}
export default FriendButton;

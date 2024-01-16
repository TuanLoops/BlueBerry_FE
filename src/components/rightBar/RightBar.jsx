import { Badge } from "@mui/material";
import "./rightBar.scss";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";

const RightBar = () => {
  const friendList = [
    {
      name: "John Doe",
      avatarImage:
        "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "John Doe",
      avatarImage:
        "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "John Doe",
      avatarImage:
        "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "John Doe",
      avatarImage:
        "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "John Doe",
      avatarImage:
        "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];

  const friendRequests = [
    {
      id: 1,
      name: "Jane Doe Doe",
      avatarImage:
        "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 2,
      name: "John Doe",
      avatarImage:
        "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];

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
  return (
    <div className="request-container">
      <div className="request-title">{requests.length} Friend requests</div>
      {requests.map((request) => (
        <div key={request.id} className="request">
          <Avatar
            sx={{ width: 36, height: 36 }}
            src={request.avatarImage}
            alt={request.name}
          />
          <div className="request-details">
            <span className="request-name">{request.name}</span>
            <div className="button-group">
              <button className="btn accept">Accept</button>
              <button className="btn decline">Decline</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const FriendList = ({ friendList }) => {

  return (
    <div className="friend-list">
      <div className="title">Friend list</div>
      {friendList.map((friend, index) => (
        <div key={index} className="friend">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              sx={{ width: 36, height: 36 }}
              src={friend.avatarImage}
              alt={friend.name}
            />
          </Badge>
          <span className="friend-name">{friend.name}</span>
        </div>
      ))}
    </div>
  );
};

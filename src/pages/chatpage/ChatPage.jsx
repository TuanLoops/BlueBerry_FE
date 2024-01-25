import { useNavigate, useParams } from "react-router-dom";
import "./chatPage.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatRooms } from "../../redux/service/chatService";
import { Avatar } from "@mui/material";
import ChatBox from "../../components/chatbox/ChatBox";
import { FaUserCircle } from "react-icons/fa";

function ChatPage() {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector(({ user }) => user.currentUser);
  const chatRooms = useSelector(({ chat }) => chat.chatRooms).filter(
    (room) => room.messages.length > 0
  );

  useEffect(() => {
    dispatch(getChatRooms());
  }, []);

  useEffect(() => {
    if (!roomId && chatRooms.length > 0) {
      navigate(chatRooms[0].id);
    }
  }, [chatRooms]);

  const findOtherUser = (chatRoom) => {
    return chatRoom?.participants.find(
      (participant) => participant.id !== currentUser.id
    );
  };

  return (
    <div className="chat-page">
      <div className="left-bar">
        <div className="title">
          <h1>Chats</h1>
        </div>
        <div className="rooms">
          {chatRooms.length > 0 ? (
            chatRooms.map((chatRoom) => (
              <ChatItem key={chatRoom.id} chatRoom={chatRoom} />
            ))
          ) : (
            <div className="placeholder">You don't have any messages</div>
          )}
        </div>
      </div>
      <div className="middle">
        <ChatBox selectedRoom={chatRooms?.find((room) => room.id === roomId)} />
      </div>
      <div className="right-bar">
        <div className="avatar">
          <Avatar
            alt="Current User"
            src={
              findOtherUser(chatRooms?.find((room) => room.id === roomId))
                ?.avatarImage
            }
            sx={{ width: 180, height: 180 }}
          />
        </div>
        <div className="room-title">
          {
            findOtherUser(chatRooms?.find((room) => room.id === roomId))
              ?.fullName
          }
        </div>
        <div className="button">
          <FaUserCircle /> Profile
        </div>
      </div>
    </div>
  );
}
export default ChatPage;

function ChatItem({ chatRoom }) {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const currentUser = useSelector(({ user }) => user.currentUser);

  const findOtherUser = () => {
    return chatRoom.participants.find(
      (participant) => participant.id !== currentUser.id
    );
  };

  return (
    <div
      className={`chat-item ${roomId === chatRoom.id ? "selected" : ""}`}
      onClick={() => navigate(`/chat/${chatRoom.id}`)}
    >
      <Avatar
        sx={{ width: 56, height: 56 }}
        src={findOtherUser().avatarImage}
        alt=""
      />
      <div className="chat-detail">
        <div className="chat-room-name">{findOtherUser().fullName}</div>
        <div className="last-message">
          {chatRoom.lastMessage.sender.id === currentUser.id ? "You: " : ""}
          {chatRoom.lastMessage.content}
        </div>
      </div>
    </div>
  );
}

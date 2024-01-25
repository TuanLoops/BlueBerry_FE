import { useDispatch, useSelector } from "react-redux";
import "./chatPopups.scss";
import ChatBox from "../chatbox/ChatBox";
import { useEffect } from "react";
import { closeAllPopups } from "../../redux/reducer/chatReducer";
import { getChatRooms } from "../../redux/service/chatService";

function ChatPopups() {
  const popups = useSelector(({ chat }) => chat.popups);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(closeAllPopups());
    };
  }, []);

  return (
    <div className="chat-popups">
      {popups.map((popup) => (
        <ChatPopup key={popup} popup={popup} />
      ))}
    </div>
  );
}
export default ChatPopups;

function ChatPopup({ popup }) {
  const chatRooms = useSelector(({ chat }) => chat.chatRooms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChatRooms());
  }, []);

  return (
    <div className="popup">
      <ChatBox
        isPopup={true}
        selectedRoom={chatRooms.find((room) => room.id === popup)}
      />
    </div>
  );
}

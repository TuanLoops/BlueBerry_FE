import { Avatar, TextareaAutosize } from "@mui/material";
import "./chatBox.scss";
import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNow, set } from "date-fns";
import { useState } from "react";
import { UrlChat } from "../../context/connect";
import { IoMdClose } from "react-icons/io";
import { closePopup } from "../../redux/reducer/chatReducer";
import CircularProgress from "@mui/material/CircularProgress";

function ChatBox({ selectedRoom, isPopup }) {
  const currentUser = useSelector(({ user }) => user.currentUser);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const findOtherUser = () => {
    return selectedRoom?.participants.find(
      (participant) => participant.id !== currentUser.id
    );
  };

  const handleSendMessage = async () => {
    if (input) {
      setLoading(true);
      try {
        await UrlChat().post(`/sendMessage/${selectedRoom.id}`, {
          message: input,
        });
        setInput("");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="chat-box">
      <div className="header">
        <div className="user-details">
          <Avatar
            alt=""
            src={findOtherUser()?.avatarImage}
            sx={{ width: 40, height: 40 }}
          />
          <span>{findOtherUser()?.fullName}</span>
        </div>
        <div className="button-container">
          {isPopup && (
            <button
              className="close"
              onClick={() => dispatch(closePopup(selectedRoom.id))}
            >
              <IoMdClose />
            </button>
          )}
        </div>
      </div>
      {selectedRoom?.messages.length > 0 ? (
        <div className="messages-container">
          {selectedRoom?.messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>
      ) : (
        <div className="placeholder">Send a message to say hi!</div>
      )}
      <div className="footer">
        <div className="input-field">
          <TextareaAutosize
            value={input}
            onChange={(e) => setInput(e.target.value)}
            minRows={1}
            maxRows={7}
            placeholder="Type your message..."
          />
        </div>
        <div className="send-button">
          <button
            onClick={handleSendMessage}
            disabled={input.trim().length === 0}
          >
            {loading ? (
              <CircularProgress size={20} />
            ) : (
              <svg className="send">
                <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,10.118014 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.8376543,3.0486314 1.15159189,3.99121575 L3.03521743,10.4322088 C3.03521743,10.5893061 3.34915502,10.7464035 3.50612381,10.7464035 L16.6915026,11.5318905 C16.6915026,11.5318905 17.1624089,11.5318905 17.1624089,12.0031827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;

function Message({ message }) {
  const currentUser = useSelector(({ user }) => user.currentUser);

  const isSender = (message) => {
    return message.sender.id === currentUser.id;
  };

  return (
    <div className={`message ${isSender(message) ? "sender" : ""}`}>
      <div className="avatar">
        <Avatar
          alt=""
          src={message.sender.avatarImage}
          sx={{ width: 38, height: 38 }}
        />
      </div>
      <div className="content">{message.content}</div>
      <div className="timestamp">{`${formatDistanceToNow(
        message.timeStamp
      )} ago`}</div>
    </div>
  );
}

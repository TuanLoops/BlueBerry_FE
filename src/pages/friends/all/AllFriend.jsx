import { useNavigate } from "react-router-dom";
import FriendButton from "../../../components/friendbutton/FriendButton";
import { UrlChat } from "../../../context/connect";
import { openPopup } from "../../../redux/reducer/chatReducer";
import { useDispatch } from "react-redux";
import { AiFillMessage } from "react-icons/ai";

export const AllFriend = ({ friend }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClickName = (id) => {
    navigate("/profile/" + id);
  };

  const handleMessageClick = async (id) => {
    try {
      const res = await UrlChat().get(`user/${id}`);
      dispatch(openPopup(res.data.id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="list-friend">
      <div className="title">
        <span>All Friends</span>
      </div>
      <div className="grip">
        {friend.map((friend, index) => (
          <div className="oneGrip" key={friend.id}>
            <div className="image">
              <img src={friend.avatarImage} alt="" />
            </div>
            <div className="info">
              <div className="info-user">
                <div
                  className="name"
                  onClick={() => handleClickName(friend.id)}
                >
                  {friend.fullName}
                </div>
              </div>
              <div className="action-user">
                <FriendButton userId={friend.id} />
                <button
                  className="message"
                  onClick={() => handleMessageClick(friend.id)}
                >
                  <AiFillMessage />
                  Message
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

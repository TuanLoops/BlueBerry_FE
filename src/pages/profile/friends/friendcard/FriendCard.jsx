import "./friendcard.scss";
import FriendButton from "../../../../components/friendbutton/FriendButton";
import UsernameLink from "../../../../components/usernamelink/UsernameLink";
import { Link } from "react-router-dom";

export const FriendCard = ({ friend, id }) => {
  return (
    <div className="oneGrip" key={friend.id}>
      <div className="image">
        <img src={friend.avatarImage} alt="" />
      </div>
      <div className="info">
        <div className="info-user">
          <div className="name">
            <UsernameLink user={friend} />
          </div>
        </div>
        <div className="action-user">
          {friend.id !== id ? (
            <>
              <FriendButton userId={friend.id} />
              <div className="messages">
                <button>Message</button>
              </div>
            </>
          ) : (
            <>
              <Link to={"/accountsettings"} className="account-settings">
                <button>
                  <span>Edit Profile</span>
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

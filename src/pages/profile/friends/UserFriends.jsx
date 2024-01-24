import { useNavigate, useParams } from "react-router-dom";
import "./userfriends.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UrlFriend } from "../../../context/connect.jsx";
import { Avatar } from "@mui/material";
import { getInfoUser } from "../../../redux/service/userService.jsx";
import UsernameLink from "../../../components/usernamelink/UsernameLink.jsx";
export const UserFriends = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(1);
  const [userFriends, setUserFriends] = useState([]);
  const [mutualFriends, setMutualFriends] = useState([]);
  const user = useSelector(({ user }) => user.infoUser);
  const currentUser = useSelector(({ user }) => user.currentUser);
  const currentFriends = useSelector(({ friend }) => friend.friendList);

  const fetchData = async () => {
    if (+id === currentUser.id) {
      navigate("/friend");
    }
    dispatch(getInfoUser(id));
    await UrlFriend()
      .get(`/list/${id}`)
      .then((res) => {
        setUserFriends(res.data ? res.data : []);
        if (res.data) {
          let newList = res.data.map((data) => {
            if (currentFriends.some(data.id)) {
              return data;
            }
          });
          setMutualFriend(newList);
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <div className="friend">
      <div className="left-friend">
        <div className="user-details">
          {user ? (
            <>
              <div className="avatar">
                <Avatar
                  sx={{ width: 150, height: 150 }}
                  src={user.avatarImage}
                  alt={user.fullName}
                />
              </div>

              <div className="name">
                <UsernameLink user={user} />
              </div>
              <div className="email">{user.email}</div>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="fillter">
          <div
            className={`btn-fillter ${selected === 1 ? "active" : ""}`}
            onClick={() => setSelected(1)}
          >
            <span className="btn-name">All Friend</span>
          </div>
          <div
            className={`btn-fillter ${selected === 2 ? "active" : ""}`}
            onClick={() => setSelected(2)}
          >
            <span className="btn-name">Mutual Friend</span>
          </div>
        </div>
      </div>
      <div className="right-friend">
        <div className="container">
          {userFriends.some((item) => item.id === currentUser.id) ? (
            <>
              {selected === 1 ? (
                <>
                  <div className="friend-container">
                    {userFriends.length > 0 ? (
                      userFriends.map((friend) => <p>{friend.fullName}</p>)
                    ) : (
                      <div  className="not-found">
                      <p>This user has no friends yet</p>
                      </div>
                    )}
                  </div>
                </>
              ) : selected === 2 ? (
                <div className="friend-container">
                  {mutualFriends.length > 0 ? (
                    mutualFriends.map((friend) => <p>{friend.fullName}</p>)
                  ) : (
                    <div  className="not-found">
                    <p>There are no mutual friends</p>
                    </div>
                  )}
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            <div className="error">
              <p className="text">
                Can't view this user's friends, please add friends to view the
                user's friends
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import { useNavigate, useParams } from "react-router-dom";
import "./userfriends.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UrlFriend } from "../../../context/connect.jsx";
export const UserFriends = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(1);
  const [userFriends, setUserFriends] = useState([]);
  const user = useSelector(({ user }) => user.infoUser);
  const currentUser = useSelector(({ user }) => user.currentUser);
  const currentFriends = useSelector(({ friend }) => friend.friendList);

  const fetchData = async () => {
    if (+id === currentUser.id) {
      navigate("/friend");
    }
    await UrlFriend().get(`/list/${id}`)
      .then((res) => {
        setUserFriends(res.data ? res.data : []);
      });
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <div className="friend">
      <div className="left-friend">
        <div className="title">
          <h1>Friend </h1>
        </div>
        <div className="btn">
          <button>All Friend</button>
          <button>Mutual Friend</button>
          <button>Resident Friend Request</button>
        </div>
      </div>
      <div className="right-friend">
        <div className="container">
          {userFriends.some((item) => item.id === currentUser.id) ? (
            <>
              <div className="item">
                <div className="avatar">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQinxRawWd1hg3nnzizyGY4po95fZ0W8J51cvP3oXVv0fO0pmv4YOkBmLZpAz0PdFXf84U&usqp=CAU"
                    alt=""
                  />
                </div>
                <div className="full-name">Full Name</div>
                <div className="btn">
                  <button>Add Friend</button>{" "}
                </div>
              </div>
              <div className="item">
                <div className="avatar">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQinxRawWd1hg3nnzizyGY4po95fZ0W8J51cvP3oXVv0fO0pmv4YOkBmLZpAz0PdFXf84U&usqp=CAU"
                    alt=""
                  />
                </div>
                <div className="full-name">Full Name</div>
                <div className="btn">
                  <button>Add Friend</button>{" "}
                </div>
              </div>
              <div className="item">
                <div className="avatar">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQinxRawWd1hg3nnzizyGY4po95fZ0W8J51cvP3oXVv0fO0pmv4YOkBmLZpAz0PdFXf84U&usqp=CAU"
                    alt=""
                  />
                </div>
                <div className="full-name">Full Name</div>
                <div className="btn">
                  <button>Add Friend</button>{" "}
                </div>
              </div>
              <div className="item">
                <div className="avatar">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQinxRawWd1hg3nnzizyGY4po95fZ0W8J51cvP3oXVv0fO0pmv4YOkBmLZpAz0PdFXf84U&usqp=CAU"
                    alt=""
                  />
                </div>
                <div className="full-name">Full Name</div>
                <div className="btn">
                  <button>Add Friend</button>{" "}
                </div>
              </div>
              <div className="item">
                <div className="avatar">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQinxRawWd1hg3nnzizyGY4po95fZ0W8J51cvP3oXVv0fO0pmv4YOkBmLZpAz0PdFXf84U&usqp=CAU"
                    alt=""
                  />
                </div>
                <div className="full-name">Full Name</div>
                <div className="btn">
                  <button>Add Friend</button>{" "}
                </div>
              </div>
              <div className="item">
                <div className="avatar">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQinxRawWd1hg3nnzizyGY4po95fZ0W8J51cvP3oXVv0fO0pmv4YOkBmLZpAz0PdFXf84U&usqp=CAU"
                    alt=""
                  />
                </div>
                <div className="full-name">Full Name</div>
                <div className="btn">
                  <button>Add Friend</button>{" "}
                </div>
              </div>
              <div className="item">
                <div className="avatar">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQinxRawWd1hg3nnzizyGY4po95fZ0W8J51cvP3oXVv0fO0pmv4YOkBmLZpAz0PdFXf84U&usqp=CAU"
                    alt=""
                  />
                </div>
                <div className="full-name">Full Name</div>
                <div className="btn">
                  <button>Add Friend</button>{" "}
                </div>
              </div>
              <div className="item">
                <div className="avatar">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQinxRawWd1hg3nnzizyGY4po95fZ0W8J51cvP3oXVv0fO0pmv4YOkBmLZpAz0PdFXf84U&usqp=CAU"
                    alt=""
                  />
                </div>
                <div className="full-name">Full Name</div>
                <div className="btn">
                  <button>Add Friend</button>{" "}
                </div>
              </div>
              <div className="item">
                <div className="avatar">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQinxRawWd1hg3nnzizyGY4po95fZ0W8J51cvP3oXVv0fO0pmv4YOkBmLZpAz0PdFXf84U&usqp=CAU"
                    alt=""
                  />
                </div>
                <div className="full-name">Full Name</div>
                <div className="btn">
                  <button>Add Friend</button>{" "}
                </div>
              </div>
              <div className="item">
                <div className="avatar">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQinxRawWd1hg3nnzizyGY4po95fZ0W8J51cvP3oXVv0fO0pmv4YOkBmLZpAz0PdFXf84U&usqp=CAU"
                    alt=""
                  />
                </div>
                <div className="full-name">Full Name</div>
                <div className="btn">
                  <button>Add Friend</button>{" "}
                </div>
              </div>
              <div className="item">
                <div className="avatar">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQinxRawWd1hg3nnzizyGY4po95fZ0W8J51cvP3oXVv0fO0pmv4YOkBmLZpAz0PdFXf84U&usqp=CAU"
                    alt=""
                  />
                </div>
                <div className="full-name">Full Name</div>
                <div className="btn">
                  <button>Add Friend</button>{" "}
                </div>
              </div>
              <div className="item">
                <div className="avatar">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQinxRawWd1hg3nnzizyGY4po95fZ0W8J51cvP3oXVv0fO0pmv4YOkBmLZpAz0PdFXf84U&usqp=CAU"
                    alt=""
                  />
                </div>
                <div className="full-name">Full Name</div>
                <div className="btn">
                  <button>Add Friend</button>{" "}
                </div>
              </div>
              <div className="item">
                <div className="avatar">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQinxRawWd1hg3nnzizyGY4po95fZ0W8J51cvP3oXVv0fO0pmv4YOkBmLZpAz0PdFXf84U&usqp=CAU"
                    alt=""
                  />
                </div>
                <div className="full-name">Full Name</div>
                <div className="btn">
                  <button>Add Friend</button>{" "}
                </div>
              </div>
              <div className="item">
                <div className="avatar">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQinxRawWd1hg3nnzizyGY4po95fZ0W8J51cvP3oXVv0fO0pmv4YOkBmLZpAz0PdFXf84U&usqp=CAU"
                    alt=""
                  />
                </div>
                <div className="full-name">Full Name</div>
                <div className="btn">
                  <button>Add Friend</button>{" "}
                </div>
              </div>
              <div className="item">
                <div className="avatar">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQinxRawWd1hg3nnzizyGY4po95fZ0W8J51cvP3oXVv0fO0pmv4YOkBmLZpAz0PdFXf84U&usqp=CAU"
                    alt=""
                  />
                </div>
                <div className="full-name">Full Name</div>
                <div className="btn">
                  <button>Add Friend</button>{" "}
                </div>
              </div>
              <div className="item">
                <div className="avatar">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQinxRawWd1hg3nnzizyGY4po95fZ0W8J51cvP3oXVv0fO0pmv4YOkBmLZpAz0PdFXf84U&usqp=CAU"
                    alt=""
                  />
                </div>
                <div className="full-name">Full Name</div>
                <div className="btn">
                  <button>Add Friend</button>{" "}
                </div>
              </div>
            </>
          ) : (
            <div>no friend</div>
          )}
        </div>
      </div>
    </div>
  );
};

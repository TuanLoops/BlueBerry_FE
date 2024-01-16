import LeftBar from "../../components/leftBar/LeftBar";
import NewPost from "../../components/newpost/NewPost";
import RightBar from "../../components/rightBar/RightBar";
import Posts from "./../../components/posts/Posts";
import "./home.scss";
import { useDispatch, useSelector } from "react-redux";
import { createContext, useContext, useEffect, useState } from "react";
import { showStatus } from "../../redux/service/statusService.jsx";

const Home = () => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(true);
  const posts = useSelector((state) => state.status.list);

  useEffect(() => {
    dispatch(showStatus());
  }, []);

  return (
    <div className="home">
      <LeftBar />
      <div className="middle">
        <div className="news-feed">
          <NewPost />
          <Posts posts={posts} />
        </div>
      </div>
      <RightBar />
    </div>
  );
};

export default Home;

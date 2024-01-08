import LeftBar from "../../components/leftBar/LeftBar";
import NewPost from "../../components/newpost/NewPost";
import RightBar from "../../components/rightBar/RightBar";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <LeftBar />
      <div className="middle">
        <div className="news-feed">
          <NewPost />
          {/* <Posts /> */}
        </div>
      </div>
      <RightBar />
    </div>
  );
};

export default Home;

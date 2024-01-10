import LeftBar from "../../components/leftBar/LeftBar";
import NewPost from "../../components/newpost/NewPost";
import RightBar from "../../components/rightBar/RightBar";
import Posts from "./../../components/posts/Posts";
import "./home.scss";

const Home = () => {
  const posts = [
    {
      id: 1,
      name: "John Doe",
      userId: 1,
      profilePic:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      img: [
        "https://cdn.eva.vn/upload/3-2021/images/2021-09-29/hotgirl-mac-ho-khoe-cap-tam-hon-trang-non-dan-mang-nhin-ma-thay-thuong-chiec-ao-190695967_174131951191962_8746197699423010605_n-1632927222-780-width600height750.jpg",
        "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://firebasestorage.googleapis.com/v0/b/blueberry-3a0b0.appspot.com/o/images%2F4fcc241a-e978-432b-9d73-2c28ee0ac59b?alt=media&token=43af5142-1703-46ae-b653-e0e8b91deffb",
      ],
    },
    {
      id: 2,
      name: "Jane Doe",
      userId: 2,
      profilePic:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
      img: [
        "https://firebasestorage.googleapis.com/v0/b/blueberry-3a0b0.appspot.com/o/images%2F6ac1655e-fdd3-435b-9e64-8c8d4396111e?alt=media&token=c878256a-10c8-4c44-a452-ee3dca7365fb",
        "https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-vn-3.jpg",
        "https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-vn-3.jpg",
        "https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-vn-3.jpg",
        "https://cdn.eva.vn/upload/3-2021/images/2021-09-29/hotgirl-mac-ho-khoe-cap-tam-hon-trang-non-dan-mang-nhin-ma-thay-thuong-chiec-ao-190695967_174131951191962_8746197699423010605_n-1632927222-780-width600height750.jpg",
      ],
    },
  ];

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

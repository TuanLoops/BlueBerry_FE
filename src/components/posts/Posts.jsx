import Post from "../post/Post";
import "./posts.scss";

const Posts = ({posts}) => {
  return (
    <div className="posts">
      {posts?.map((posts) => (
        <Post post={posts} key={posts.id} />
      ))}
    </div>
  );
};

export default Posts;

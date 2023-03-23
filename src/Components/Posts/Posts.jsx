import Post from "./Post";
import "./Posts.css";

const Posts = ({ posts }) => {
  return (
    <>
      <div className="posts">
        {posts.map((p) => {
          return <Post key={p._id} post={p} />;
        })}
      </div>
    </>
  );
};

export default Posts;

import Post from "./Post";
import "./Posts.css";

const Posts = ({ posts }) => {
  console.log(posts);
  return (
    <>
      <div className="posts">
        {posts
          ? posts.map((p) => {
              return <Post key={p._id} post={p} />;
            })
          : null}
      </div>
    </>
  );
};

export default Posts;

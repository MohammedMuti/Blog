import { Link } from "react-router-dom";
import "./Post.css";

const Post = ({ post }) => {
  const PF = "https://blog-server-eh2n.onrender.com/images/";

  return (
    <>
      <div className="post">
        <Link to={`/post/${post._id}`}>
          {post.photo && <img src={PF + post.photo} alt="" />}
        </Link>
        <div className="postInfo">
          <div className="postCats">
            {post.categories.map((cat) => {
              return <span className="postCat">{cat.name}</span>;
            })}
          </div>
          <Link to={`/post/${post._id}`}>
            <span className="postTitle">{post.title}</span>
          </Link>
          <hr />
          <span className="postDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        <p>{post.desc}</p>
      </div>
    </>
  );
};

export default Post;

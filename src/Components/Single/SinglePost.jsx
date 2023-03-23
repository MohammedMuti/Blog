import axios from "../axios";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./SinglePost.css";
import { useState } from "react";
import { useContext } from "react";
import ContextProvider from "../../Context/Context";

const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [{ user }] = useContext(ContextProvider);
  const navigate = useNavigate();
  const [title, setTitle] = useState(false);
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState("");
  const [access, setAccess] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`/posts/${path}`);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setPost(res.data);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    const res = await axios
      .delete(`/posts/${path}`, {
        headers: {
          token: `Bearer ${user.accessToken}`,
        },
        data: {
          username: post.username,
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleModify = async () => {
    const res = await axios
      .post(
        "/posts/postaccess",
        {
          postUsername: post.username,
        },
        {
          headers: {
            token: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        if (res.data === true) {
          setAccess(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleModify();

  const handleUpdate = async () => {
    const res = await axios
      .put(
        `/posts/${path}`,
        {
          username: user.username,
          title: title,
          desc: desc,
        },
        {
          headers: {
            token: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setUpdateMode(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const PF = "http://localhost:8000/images/";

  return (
    <>
      <div className="singlePost">
        <div className="singlePostWrapper">
          {post.photo && <img src={PF + post.photo} alt="" />}
          {updateMode ? (
            <input
              autoFocus
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h1>
              {title}
              <div className="singlePostEdit">
                {user ? (
                  access ? (
                    <>
                      <i
                        className="fa-regular fa-pen-to-square"
                        onClick={() => setUpdateMode(true)}
                      ></i>
                      <i
                        className="fa-regular fa-trash-can"
                        onClick={handleDelete}
                      ></i>
                    </>
                  ) : null
                ) : null}
              </div>
            </h1>
          )}
          <div className="singlePostInfo">
            <span>
              Author:
              <Link to={`/?user=${post.username}`}>
                <b>{post.username}</b>
              </Link>
            </span>
            <span>{new Date(post.createdAt).toDateString()}</span>
          </div>
          {updateMode ? (
            <>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <button onClick={handleUpdate}>Update</button>
            </>
          ) : (
            <>
              <p>{desc}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SinglePost;

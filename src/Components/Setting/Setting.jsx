import "./Setting.css";
import Sidebar from "../Sidebar/Sidebar";
import { useContext } from "react";
import ContextProvider from "../../Context/Context";
import axios from "../axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Setting = () => {
  const [{ user }, dispatch] = useContext(ContextProvider);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  // console.log(user);

  const handleDelete = async () => {
    const res = await axios
      .delete(`/users/${user._id}`, {
        headers: {
          token: `Bearer ${user.accessToken}`,
        },
        data: {
          id: user._id,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: "SET_USER",
          user: null,
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await axios
      .put(
        `/users/${user._id}`,
        {
          userId: user._id,
          username: username,
          password: password,
          email,
        },
        {
          headers: {
            token: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: "SET_USER",
          user: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const PF = "http://localhost:8000/Profiles/";

  return (
    <>
      <Navbar />
      <div className="setting">
        <div className="settingWrapper">
          <div className="settingTitle">
            <span className="settingUpdate">Update Your Accout</span>
            <span onClick={handleDelete} className="settingDelete">
              Delete Accout
            </span>
          </div>
          <form>
            <label>Profile Picture</label>
            <div className="settingPP">
              <img src={PF + user.profilePic + ".jpeg"} alt="" />
              {/* <label htmlFor="fileInput">
                <i className="fa-sharp fa-regular fa-circle-user"></i>
              </label>
              <input
                type="file"
                name=""
                id="fileInput"
                style={{ display: "none" }}
              /> */}
            </div>
            <label>Username</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              placeholder={user.username}
            />
            <label>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder={user.email}
            />
            <label>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
            />
            <button onClick={handleUpdate}>Update</button>
          </form>
        </div>
        <Sidebar />
      </div>
    </>
  );
};

export default Setting;

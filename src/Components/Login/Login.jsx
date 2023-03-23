import axios from "../axios";
import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ContextProvider from "../../Context/Context";
import "./Login.css";
import { useEffect } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // console.log(error);
  const [{ user, isFetching }, dispatch] = useContext(ContextProvider);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGIN_START",
    });
    const res = await axios
      .post("/auth/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data === "USER_NOT_FOUND" || res.data === "WRONG_PASSWORD") {
          return setError("USER_NOT_FOUND");
        }
        console.log(res);
        dispatch({
          type: "SET_USER",
          user: res.data,
          isFetching: false,
        });
        setUsername("");
        setPassword("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(user);
  // console.log(isFetching);

  const handleError = (error) => {
    switch (error) {
      case "USER_NOT_FOUND":
        return "Invalid Username or Password";

      default:
        return null;
    }
  };

  return (
    <>
      <div className="login">
        <span>Login</span>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            placeholder="Enter your Username"
          />
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Enter your Password"
          />
          {error && <p>{handleError(error)}</p>}
          <button type="submit">Login</button>
        </form>
        <button className="registerBtn" disabled={isFetching}>
          <Link to="/register">Register</Link>
        </button>
      </div>
    </>
  );
};

export default Login;

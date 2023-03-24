import axios from "../axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import Navbar from "../Navbar/Navbar";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios
      .post("/auth/register", {
        username: username,
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        if (res.data === "USEREXISTS") {
          return setError(true);
        }
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(res);
  };

  return (
    <>
      <Navbar />
      <div className="register">
        <span>Register</span>
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
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            placeholder="Enter your Email"
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
          <button>Register</button>
          {error && (
            <p>Username is already taken, select a different username.</p>
          )}
        </form>
        <button type="submit" className="registerBtn">
          <Link to="/login">Login</Link>
        </button>
      </div>
    </>
  );
};

export default Register;

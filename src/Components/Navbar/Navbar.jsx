import { useContext } from "react";
import { Link } from "react-router-dom";
import ContextProvider from "../../Context/Context";
import "./Navbar.css";

const Navbar = () => {
  const [{ user }, dispatch] = useContext(ContextProvider);

  const handleLogout = () => {
    if (user) {
      dispatch({
        type: "LOGOUT_USER",
      });
    }
  };

  const PF = "http://localhost:8000/Profiles/";

  return (
    <div className="nav-component">
      <div className="navbar">
        <div className="navLeft">
          <i className="fa-brands fa-square-facebook"></i>
          <i className="fa-brands fa-square-twitter"></i>
          <i className="fa-brands fa-square-pinterest"></i>
          <i className="fa-brands fa-square-instagram"></i>
        </div>
        <div className="navMid">
          <ul className="nav-list">
            <li>
              <Link to="/Blog">HOME</Link>
            </li>
            <li>
              <Link to="/Blog">ABOUT</Link>
            </li>
            <li>
              <Link to="/Blog">CONTACT</Link>
            </li>
            <li>
              <Link to="/write">WRITE</Link>
            </li>
            <li>
              <Link onClick={handleLogout}>{user && "LOGOUT"}</Link>
            </li>
          </ul>
        </div>
        <div className="navRight">
          {user ? (
            <Link to="/settings">
              <img src={PF + user.profilePic + ".jpeg"} alt="" />
            </Link>
          ) : (
            <ul>
              <li>
                <Link to="/login">LOGIN</Link>
              </li>
              <li>
                <Link to="/register">REGISTER</Link>
              </li>
            </ul>
          )}
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      <div className="navMiddle">
        <ul className="nav-list">
          <li>
            <Link to="/Blog">HOME</Link>
          </li>
          <li>
            <Link to="/Blog">ABOUT</Link>
          </li>
          <li>
            <Link to="/Blog">CONTACT</Link>
          </li>
          <li>
            <Link to="/write">WRITE</Link>
          </li>
          <li>
            <Link onClick={handleLogout}>{user && "LOGOUT"}</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

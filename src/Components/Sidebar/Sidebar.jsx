import axios from "../axios";
import { useEffect, useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import ContextProvider from "../../Context/Context";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const [{ user }, dispatch] = useContext(ContextProvider);

  useEffect(() => {
    const fetchCat = async () => {
      const res = await axios.get("/categories");
      setCategories(res.data);
    };
    fetchCat();
  });

  const PF = "https://blog-server-eh2n.onrender.com/Profiles/";
  return (
    <>
      {" "}
      {user && (
        <div className="sidebar">
          <div className="sidebarItem">
            <span>ABOUT ME</span>
            {user.profilePic ? (
              <img src={PF + user.profilePic + ".jpeg"} alt="" />
            ) : null}
            <p>
              Your Profile Picture is Randomly Selected. Don't Worry, Every one
              of them are pretty cool if you know them
            </p>
            <div className="sidebarItem">
              <span>CATEGORIES</span>
              <ul>
                {categories.map((cat) => {
                  return (
                    <Link key={cat._id} to={`/?cat=${cat.name}`}>
                      <li>{cat.name}</li>
                    </Link>
                  );
                })}
              </ul>
            </div>
            <div className="sidebarItem">
              <span>FOLLOW US</span>
              <div className="sidebarSocial">
                <i className="fa-brands fa-square-facebook"></i>
                <i className="fa-brands fa-square-twitter"></i>
                <i className="fa-brands fa-square-pinterest"></i>
                <i className="fa-brands fa-square-instagram"></i>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;

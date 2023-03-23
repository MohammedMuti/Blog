import { useEffect } from "react";
import { useState } from "react";
import Header from "../Header/Header";
import Posts from "../Posts/Posts";
import Sidebar from "../Sidebar/Sidebar";
import "./Home.css";
import axios from "../axios";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("/posts" + search);
      setPosts(response.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
        <Navbar />
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
};

export default Home;

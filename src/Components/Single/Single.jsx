import Sidebar from "../Sidebar/Sidebar";
import "./Single.css";
import SinglePost from "./SinglePost";
import Navbar from "./Components/Navbar/Navbar";

const Single = () => {
  return (
    <>
      <Navbar />
      <div className="single">
        <SinglePost />
        <Sidebar />
      </div>
    </>
  );
};

export default Single;

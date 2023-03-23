import Sidebar from "../Sidebar/Sidebar";
import "./Single.css";
import SinglePost from "./SinglePost";

const Single = () => {
  return (
    <>
      <div className="single">
        <SinglePost />
        <Sidebar />
      </div>
    </>
  );
};

export default Single;

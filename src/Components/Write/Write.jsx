import { useEffect, useState } from "react";
import "./Write.css";
import axios from "../axios";
import { useContext } from "react";
import ContextProvider from "../../Context/Context";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [{ user }] = useContext(ContextProvider);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
    const selectedFile = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let photo = null;
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      photo = filename;
      const imageRes = await axios
        .post("/upload", data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const res = await axios
      .post(
        "/posts",
        {
          username: user.username,
          title: title,
          desc: description,
          photo: photo,
        },
        {
          headers: {
            token: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="write">
        {image && <img src={image} alt="" />}
        <form onSubmit={handleSubmit}>
          <div className="writeFormGroup">
            <label htmlFor="fileInput">
              <i className="fa-solid fa-plus"></i>
            </label>
            <input
              type="file"
              onChange={handleFileUpload}
              id="fileInput"
              style={{ display: "none" }}
            />
            <input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              type="text"
              placeholder="Title"
              autoFocus
              className="writeInput"
            />
          </div>
          <div className="writeFormGroup">
            <textarea
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
              placeholder="Tell your Story"
              className="writeInput writeText"
            ></textarea>
          </div>
          <button type="submit">Publish</button>
        </form>
      </div>
    </>
  );
};

export default Write;

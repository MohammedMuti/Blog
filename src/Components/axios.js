import axios from "axios";

const instance = axios.create({
  baseURL: "https://blog-server-eh2n.onrender.com/api",
});

export default instance;

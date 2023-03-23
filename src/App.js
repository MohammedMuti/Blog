import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Single from "./Components/Single/Single";
import Write from "./Components/Write/Write";
import Setting from "./Components/Setting/Setting";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { useContext, useEffect } from "react";
import ContextProvider from "./Context/Context";

function App() {
  const [{ user }, dispatch] = useContext(ContextProvider);
  console.log(user);

  useEffect(() => {
    localStorage.setItem("username", JSON.stringify(user));
  }, [user]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/post/:postId" exact element={<Single />} />
          <Route
            path="/settings"
            exact
            element={user ? <Setting /> : <Register />}
          />
          <Route
            path="/write"
            exact
            element={user ? <Write /> : <Register />}
          />
          <Route path="/login" exact element={user ? <Home /> : <Login />} />
          <Route
            path="/register"
            exact
            element={user ? <Home /> : <Register />}
          />
          <Route path="/" exact element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
const Login = () => {
  const [showAvatar, setShowAvatar] = useState({
    file: null,
    url: "",
  });
  const handleAvatar = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      setShowAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.warn("hello");
  };
  return (
    <div className="login">
      <div className="item">
        <h2>Welcome back,</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" name="email" />
          <input type="password" placeholder="password" name="password" />
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create Account</h2>
        <form>
          <label htmlFor="file">
            <img src={showAvatar.url || "/public/avatar.png"} alt="profile" />
            Upload an image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input type="text" placeholder="username" name="username" />
          <input type="email" placeholder="email" name="email" />
          <input type="password" placeholder="password" name="password" />
          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

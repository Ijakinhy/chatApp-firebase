import React from "react";
import "./_loginscreen.scss";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/auth.action";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(login());
  };
  return (
    <div className="login">
      <div className="login_container">
        <img
          src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
          alt="logo"
          className="header_logo"
        />
        <button onClick={() => handleLogin()}>Login with google</button>
        <p> this app is made using youtube api</p>
      </div>
    </div>
  );
};

export default LoginScreen;

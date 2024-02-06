import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/actions/auth.action";
import "./_loginScreen.scss";

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
        <button onClick={handleLogin}>Login with google</button>
        <p>this project is made using youtube Data API</p>
      </div>
    </div>
  );
};

export default LoginScreen;

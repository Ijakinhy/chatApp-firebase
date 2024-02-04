import React from "react";
import "./_loginScreen.scss";

const LoginScreen = () => {
  return (
    <div className="login">
      <div className="login_container">
        <img
          src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
          alt="logo"
          className="header_logo"
        />
        <button>Login with google</button>
        <p>this project is made using youtube Data API</p>
      </div>
    </div>
  );
};

export default LoginScreen;

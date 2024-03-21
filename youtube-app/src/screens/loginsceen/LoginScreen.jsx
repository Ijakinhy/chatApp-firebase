import React, { useEffect } from "react";
import "./_loginscreen.scss";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/actions/auth.action";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

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

import React, { useEffect } from "react";
import "./userInfo.css";
import { useSelector } from "react-redux";
const UserInfo = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="userInfo">
      <div className="user">
        <img src={currentUser.avatar || "/public/avatar.png"} alt="profile" />
        <h2>{currentUser.username}</h2>
      </div>
      <div className="icons">
        <img src="/public/more.png" alt="icon" />
        <img src="/public/video.png" alt="icon" />
        <img src="/public/edit.png" alt="icon" />
      </div>
    </div>
  );
};

export default UserInfo;

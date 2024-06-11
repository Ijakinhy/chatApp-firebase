import React from "react";
import "./userInfo.css";
const UserInfo = () => {
  return (
    <div className="userInfo">
      <div className="user">
        <img src="/public/avatar.png" alt="profile" />
        <h2>israel</h2>
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

import React from "react";
import "./_videos.scss";
import { AiFillEye } from "react-icons/ai";
const Videos = () => {
  return (
    <div className="video">
      <div className="video_top">
        <img
          src="	https://i.ytimg.com/vi/VAaUy_Moivw/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLBN0mUIYcHxgp0unzR8Hw42OsVqJA"
          alt=""
        />
        <span>05:40</span>
      </div>
      <div className="video_title">
        create app in 5 minutes #made by israel havyarimana
      </div>
      <div className="video_details">
        <span>
          <AiFillEye /> 3m Views •
        </span>
        <span>10 days ago</span>
      </div>
      <div className="video_channel">
        <img
          src="https://yt3.googleusercontent.com/se2CkUqe18RMc8tzSxjZeLTadtyLBpBADwo1gcHk4Gudn8Kx0x4kw5WNzdMgAYuem8IloMIUFA=s176-c-k-c0x00ffffff-no-rj"
          alt=""
        />
        <p>Rainbaw Hat jer</p>
      </div>
    </div>
  );
};

export default Videos;

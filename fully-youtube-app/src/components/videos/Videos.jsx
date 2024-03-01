import React from "react";
import "./_videos.scss";
import { AiFillEye } from "react-icons/ai";
const Videos = () => {
  return (
    <div className="video">
      <div className="video_top">
        <img
          src="https://i.ytimg.com/vi/zL20ETnYnjw/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLB2HAQpc8c9FSJGyhba0vZRj3tzkg"
          alt="thumbnail"
        />
        <span>05:30</span>
      </div>
      <div className="video_title">
        Savage Music Festival Injuries - Up To $5,000,000 Cases | Double Episode
        | Personal Injury Court #made by chintu
      </div>
      <div className="video_details">
        <span>
          <AiFillEye /> 5m Views •
        </span>
        <span>1 year ago</span>
      </div>
      <div className="video_channel">
        <img
          src="	https://yt3.ggpht.com/ytc/AIdro_lT_FSEs_ra90GGnZXfS39DdIIIBkLxIp11mwQ4Rw=s68-c-k-c0x00ffffff-no-rj"
          alt="channel"
        />
        <p>Rainbow hat jr</p>
      </div>
    </div>
  );
};

export default Videos;

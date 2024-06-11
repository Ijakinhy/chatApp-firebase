import React from "react";
import "./details.css";

const Details = () => {
  return (
    <div className="details">
      <div className="user">
        <img src="/public/avatar.png" alt="" />
        <h2>israel</h2>
        <p>Lorem ipsum dolor sit amet </p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Setting</span>
            <img src="/public/arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="/public/arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="/public/arrowUp.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetails">
                <img
                  src="https://i.pinimg.com/564x/ce/20/60/ce2060314b4daef70babb66dbb29cfa6.jpg"
                  alt=""
                />
                <span>photo_2020_pro</span>
              </div>
              <img src="/public/download.png" className="icon" alt="" />
            </div>

            <div className="photoItem">
              <div className="photoDetails">
                <img
                  src="https://i.pinimg.com/564x/ce/20/60/ce2060314b4daef70babb66dbb29cfa6.jpg"
                  alt=""
                />
                <span>photo_2020_pro</span>
              </div>
              <img src="/public/download.png" className="icon" alt="" />
            </div>
            <div className="photoItem">
              <div className="photoDetails">
                <img
                  src="https://i.pinimg.com/564x/ce/20/60/ce2060314b4daef70babb66dbb29cfa6.jpg"
                  alt=""
                />
                <span>photo_2020_pro</span>
              </div>
              <img src="/public/download.png" className="icon" alt="" />
            </div>
            <div className="photoItem">
              <div className="photoDetails">
                <img
                  src="https://i.pinimg.com/564x/ce/20/60/ce2060314b4daef70babb66dbb29cfa6.jpg"
                  alt=""
                />
                <span>photo_2020_pro</span>
              </div>
              <img src="/public/download.png" className="icon" alt="" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared files</span>
            <img src="/public/arrowDown.png" alt="" />
          </div>
        </div>
        <button>Block User</button>
      </div>
    </div>
  );
};

export default Details;

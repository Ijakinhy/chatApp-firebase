import React, { useState } from "react";
import "./chatList.css";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="/public/search.png" alt="search" />
          <input type="text" placeholder="Search" />
        </div>
        <img
          src={addMode ? "/public/minus.png" : "/public/plus.png"}
          alt="profile"
          onClick={() => setAddMode((prev) => !prev)}
          className="add"
        />
      </div>
      <div className="item">
        <img src="/public/avatar.png" alt="" />
        <div className="texts">
          <span>israel</span>
          <p> hello looks</p>
        </div>
      </div>
      <div className="item">
        <img src="/public/avatar.png" alt="" />
        <div className="texts">
          <span>israel</span>
          <p> hello looks</p>
        </div>
      </div>
      <div className="item">
        <img src="/public/avatar.png" alt="" />
        <div className="texts">
          <span>israel</span>
          <p> hello looks</p>
        </div>
      </div>
      <div className="item">
        <img src="/public/avatar.png" alt="" />
        <div className="texts">
          <span>israel</span>
          <p> hello looks</p>
        </div>
      </div>
      <div className="item">
        <img src="/public/avatar.png" alt="" />
        <div className="texts">
          <span>israel</span>
          <p> hello looks</p>
        </div>
      </div>
      <div className="item">
        <img src="/public/avatar.png" alt="" />
        <div className="texts">
          <span>israel</span>
          <p> hello looks</p>
        </div>
      </div>
      <div className="item">
        <img src="/public/avatar.png" alt="" />
        <div className="texts">
          <span>israel</span>
          <p> hello looks</p>
        </div>
      </div>
      <div className="item">
        <img src="/public/avatar.png" alt="" />
        <div className="texts">
          <span>israel</span>
          <p> hello looks</p>
        </div>
      </div>
      <div className="item">
        <img src="/public/avatar.png" alt="" />
        <div className="texts">
          <span>israel</span>
          <p> hello looks</p>
        </div>
      </div>
      <div className="item">
        <img src="/public/avatar.png" alt="" />
        <div className="texts">
          <span>israel</span>
          <p> hello looks</p>
        </div>
      </div>
      <div className="item">
        <img src="/public/avatar.png" alt="" />
        <div className="texts">
          <span>israel</span>
          <p> hello looks</p>
        </div>
      </div>
      <div className="item">
        <img src="/public/avatar.png" alt="" />
        <div className="texts">
          <span>israel</span>
          <p> hello looks</p>
        </div>
      </div>
    </div>
  );
};

export default ChatList;

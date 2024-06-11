import React, { useState } from "react";
import "./chats.css";
import EmojiPicker from "emoji-picker-react";

const Chats = () => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [text, setText] = useState("");

  const handleEmojiClick = (event) => {
    setText((prev) => prev + event.emoji);
    setTimeout(() => {
      setOpenEmoji(false);
    }, 1000);
  };
  return (
    <div className="chats">
      <div className="top">
        <div className="user">
          <img src="/public/avatar.png" alt="" />
          <div className="texts">
            <span>israel</span>
            <p>Lorem ipsum, dolor sit amet </p>
          </div>
        </div>
        <div className="icons">
          <img src="/public/phone.png" alt="icon" />
          <img src="/public/video.png" alt="icon" />
          <img src="/public/info.png" alt="icon" />
        </div>
      </div>
      <div className="center">
        <div className="message">
          <img src="/public/avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur distinctio, soluta alias unde officia quod molestiae
              nihil, facilis ea debitis atque deserunt est inventore voluptas
              minus! Officiis earum deleniti illum.{" "}
            </p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur distinctio, soluta alias unde officia quod molestiae
              nihil, facilis ea debitis atque deserunt est inventore voluptas
              minus! Officiis earum deleniti illum.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="/public/avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur distinctio, soluta alias unde officia quod molestiae
              nihil, facilis ea debitis atque deserunt est inventore voluptas
              minus! Officiis earum deleniti illum.{" "}
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur distinctio, soluta alias unde officia quod molestiae
              nihil, facilis ea debitis atque deserunt est inventore voluptas
              minus! Officiis earum deleniti illum.{" "}
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="/public/avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur distinctio, soluta alias unde officia quod molestiae
              nihil, facilis ea debitis atque deserunt est inventore voluptas
              minus! Officiis earum deleniti illum.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur distinctio, soluta alias unde officia quod molestiae
              nihil, facilis ea debitis atque deserunt est inventore voluptas
              minus! Officiis earum deleniti illum.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="/public/avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur distinctio, soluta alias unde officia quod molestiae
              nihil, facilis ea debitis atque deserunt est inventore voluptas
              minus! Officiis earum deleniti illum.
            </p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message own">
          <div className="texts">
            <img
              src="https://i.pinimg.com/564x/76/1e/b8/761eb81535806ec7186fdf2abd6453ad.jpg"
              alt=""
            />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur distinctio, soluta alias unde officia quod molestiae
              nihil, facilis ea debitis atque deserunt est inventore voluptas
              minus! Officiis earum deleniti illum.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="/public/img.png" alt="" />
          <img src="/public/camera.png" alt="" />
          <img src="/public/mic.png" alt="" />
        </div>
        <input
          value={text}
          type="text"
          placeholder="Type a message..."
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img
            src="/public/emoji.png"
            alt=""
            onClick={() => setOpenEmoji(!openEmoji)}
          />
          <div className="picker">
            <EmojiPicker onEmojiClick={handleEmojiClick} open={openEmoji} />
          </div>
        </div>
        <button className="sendButton">Send</button>
      </div>
    </div>
  );
};

export default Chats;

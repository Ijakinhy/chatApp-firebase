import React, { useEffect, useRef, useState } from "react";
import "./chats.css";
import EmojiPicker from "emoji-picker-react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useSelector } from "react-redux";

const Chats = () => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [chat, setChat] = useState(null);

  const [text, setText] = useState("");
  const endRef = useRef();
  const { chatId, user } = useSelector((state) => state.chat);
  const { currentUser } = useSelector((state) => state.user);
  const handleEmojiClick = (event) => {
    setText((prev) => prev + event.emoji);
    setTimeout(() => {
      setOpenEmoji(false);
    }, 1000);
  };
  useEffect(() => endRef.current.scrollIntoView({ behavior: "smooth" }), []);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });
    return () => {
      unSub();
    };
  }, [chatId]);
  // console.log(chat);
  const handleSendMessage = async () => {
    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          createdAt: new Date(),
          text: text,
          senderId: currentUser.id,
        }),
      });
      const userIDs = [user.id, currentUser.id];
      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userChats", id);
        const userChatsSnapShot = await getDoc(userChatsRef);

        if (userChatsSnapShot.exists()) {
          const userChatsData = userChatsSnapShot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (item) => item.chatId === chatId
          );
          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (error) {
      console.log(error.message);
    }
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
        {chat?.messages?.map((message) => (
          <div className="message own" key={message?.createdAt}>
            <div className="texts">
              {message.img && <img src={message.img} alt="" />}
              <p>{message?.text}</p>
              <span>1 min ago</span>
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
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
        <button className="sendButton" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chats;

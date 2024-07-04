import React, { useEffect, useState } from "react";
import "./chatList.css";
import AddUser from "./addUser/AddUser";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../lib/firebase";
import { changeChat } from "../../../slices/chatSlice";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);

  const { chatId } = useSelector((state) => state.chat);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userChats", currentUser.id),
      async (res) => {
        const items = res.data()?.chats || [];

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.data();

          return {
            ...item,
            user,
          };
        });

        const chatData = await Promise.all(promises);
        // console.log(chatData);
        const sortedData = chatData.sort((a, b) => b.updatedAt - a.updatedAt);

        setChats(sortedData);
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser.id]);
  // console.log(chats);

  const user = chats.map((chat) => chat.user);

  const handleSelectChat = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });
    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );
    userChats[chatIndex].isSeen = true;
    try {
      await updateDoc(doc(db, "userChats", currentUser.id), {
        chats: userChats,
      });
      dispatch(
        changeChat({ chatId: chat.chatId, user: chat.user, currentUser })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

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

      {chats.map((chat) => {
        return (
          <div
            className="item"
            key={chat?.chatId}
            onClick={() => handleSelectChat(chat)}
            style={{ backgroundColor: chat.isSeen ? "transparent" : "#5183fe" }}
          >
            <img src={chat.user.avatar} alt="" />
            <div className="texts">
              <span>{chat.user.username}</span>
              <p>{chat.lastMessage}</p>
            </div>
          </div>
        );
      })}

      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;

import { collection, getDoc, getDocs } from "firebase/firestore";
import React from "react";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

const useApp = () => {
  const {
    currentUser: { uid },
  } = getAuth();
  const boardColRef = collection(db, `users/${uid}/boards`);

  const createBoard = async ({ name, color }) => {
    try {
      const res = await addDoc(boardColRef, {
        name,
        color,
        createdAt: serverTimestamp(),
      });
      toast.success("Board created successfully!");
      console.log(res);
    } catch (error) {
      const msg = error.code.split("auth/")[1].split("-").join(" ");
      toast.error(msg);
      console.log(msg);
    }
  };

  const fetchBoards = async () => {
    try {
      const querySnapShop = await getDocs(boardColRef);

      const boards = querySnapShop.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(boards);

      return boards;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createBoard,
    fetchBoards,
  };
};

export default useApp;

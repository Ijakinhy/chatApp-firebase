import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";

const initialState = {
  boards: [],
  areBoardsFetch: false,
};

export const createBoard = createAsyncThunk(
  "user/createBoard`",
  async (payload) => {
    const { name, color, uid } = payload;
    const BoardsColRef = collection(db, `users/${uid}/boards`);
    try {
      const res = await addDoc(BoardsColRef, {
        name,
        color,
        createdAt: serverTimestamp(),
      });

      toast.success("Board created successfully!");
    } catch (error) {
      console.log(error.message);
    }
  }
);
// fetch boards

export const fetchBoards = createAsyncThunk(
  "users/fetchBoards",
  async (payload) => {
    const { uid } = payload;
    const BoardsColRef = collection(db, `users/${auth.currentUser.uid}/boards`);
    try {
      const boardsSnap = await getDocs(BoardsColRef);
      const boards = boardsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(boards);
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const boardListSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setBoards: (state, action) => {
      return { ...state, boards: action.payload, areBoardsFetch: true };
    },
  },
});

export const { setBoards } = boardListSlice.actions;

export default boardListSlice.reducer;

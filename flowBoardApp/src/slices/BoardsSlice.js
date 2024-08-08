import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
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
  async (uid) => {
    const BoardsColRef = collection(db, `users/${uid}/boards`);
    try {
      const boardsSnap = await getDocs(BoardsColRef);
      const boards = boardsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(boards);
      return boards;
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        return { ...state };
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        return { ...state, boards: action.payload, areBoardsFetch: true };
      })
      .addCase(fetchBoards.rejected, (state) => {
        return {
          ...state,
          areBoardsFetch: false,
          error: action.error.message,
        };
      });
  },
});

export default boardListSlice.reducer;

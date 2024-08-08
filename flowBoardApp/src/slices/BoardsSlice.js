import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";

const initialState = {
  boards: [],
  areBoardsFetch: false,
  loading: true,
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

export const fetchBoards = createAsyncThunk(
  "users/fetchBoards",
  async (uid) => {
    const BoardsColRef = collection(db, `users/${uid}/boards`);
    try {
      const q = query(BoardsColRef, orderBy("createdAt", "desc"));
      const boardsSnap = await getDocs(q);
      const boards = boardsSnap.docs.map((doc) => {
        const createdAt = doc.data().createdAt?.toDate();

        return {
          id: doc.id,
          ...doc.data(),
          createdAt,
        };
      });
      boards.sort((a, b) => b.createdAt - a.createdAt);
      const sortedBoards = boards.map((board) => ({
        ...board,
        createdAt: board.createdAt?.toLocaleDateString(),
      }));

      return sortedBoards;
    } catch (error) {
      console.log(error.message);
      throw error;
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
        return { ...state, loading: true };
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        return {
          ...state,
          boards: action.payload,
          areBoardsFetch: true,
          loading: false,
        };
      })
      .addCase(fetchBoards.rejected, (state) => {
        return {
          ...state,
          areBoardsFetch: false,
          error: action.error.message,
          loading: false,
        };
      });
  },
});

export default boardListSlice.reducer;

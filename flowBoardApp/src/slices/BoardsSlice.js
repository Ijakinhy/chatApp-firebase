import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const initialState = {
  boards: [],
  areBoardsFetch: false,
  loading: true,
  massage: "",
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
    showMessage: (state, action) => {
      return { ...state, message: action.payload };
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
      })
      .addCase(createBoard.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(createBoard.fulfilled, (state) => {
        return { ...state, loading: false, massage: "New Board Created" };
      })
      .addCase(createBoard.rejected, (state, action) => {
        return { ...state, loading: false, message: action.error.message };
      });
  },
});

export const { showMessage } = boardListSlice.actions;

export default boardListSlice.reducer;

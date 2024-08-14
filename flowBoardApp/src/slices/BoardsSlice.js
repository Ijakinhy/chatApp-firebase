import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const initialState = {
  boards: [],
  areBoardsFetch: false,
  loading: true,
  massage: "",
  boardData: [],
  areBoardDataFetch: false,
};
// create Board
export const createBoard = createAsyncThunk(
  "user/createBoard`",

  async (payload) => {
    const { name, color, uid } = payload;
    const BoardsColRef = collection(db, `users/${uid}/boards`);
    const colRef = collection(db, `users/${uid}/boards`);
    const boardRef = collection(db, "boards");

    try {
      const res = await (docRef,
      {
        boards: arrayUnion({
          id: `${name}-${Date.now()}`,
          name,
          color,
          createdAt: new Date().toLocaleString("en-US"),
        }),
      });
    } catch (error) {
      console.log(error.message);
    }
  }
);
// fetch Boards
export const fetchBoards = createAsyncThunk(
  "users/fetchBoards",
  async (uid) => {
    // const BoardsColRef = collection(db, "boards");

    try {
      // const q = query(BoardsColRef, orderBy("createdAt", "desc"));
      const docRef = doc(db, "boards", uid);
      const docSnap = await getDoc(docRef);

      const boards = docSnap.data().boards || [];

      // const boards = boardsSnap.docs.map((doc) => {
      //   const createdAt = doc.data().createdAt?.toDate();

      //   return {
      //     id: doc.id,
      //     ...doc.data(),
      //     createdAt,
      //   };
      // });

      boards.sort((a, b) => b.createdAt - a.createdAt);
      const sortedBoards = boards.map((board) => ({
        ...board,
        createdAt: new Date(board.createdAt)?.toLocaleString(),
      }));

      return sortedBoards;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
);

// fetch  Board Data

// boardListSlice
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

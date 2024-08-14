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
    const colRef = collection(db, `users/${uid}/boards`);

    try {
      const res = await addDoc(colRef, {
        id: `${name}-${Date.now()}`,
        name,
        color,
        createdAt: new Date().toLocaleString("en-US"),
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
    const boardsColRef = collection(db, `users/${uid}/boards`);

    try {
      const q = query(boardsColRef, orderBy("createdAt", "desc"));
      // // const q = query(BoardsColRef, orderBy("createdAt", "desc"));
      // const docRef = doc(db, "boards", uid);
      const docSnap = await getDocs(q);
      // console.log(docSnap);

      const boards = docSnap.docs.map((doc) => {
        console.log(doc.data());

        return {
          ...doc.data(),
          id: doc.id,
          };
      });

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

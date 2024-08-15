import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  arrayUnion,
  doc,
  FieldValue,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import firebase from "firebase/compat/app";

const initialState = {
  boardData: [],
  AreBoardDataFetched: false,
  lastUpdated: null,
  loading: true,
  data: null,
};
// fetching the board Data
export const fetchBoard = createAsyncThunk(
  "user/boardData",
  async (payload) => {
    const { uid, boardId } = payload;
    try {
      const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const boardData = docSnap.data();

        return boardData;
      } else return null;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// / update the board Data

export const updateBoardData = createAsyncThunk(
  "boardData/updateBoardData",
  async (payload) => {
    const { uid, boardId, tabName, text } = payload;
    const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);

    try {
      await updateDoc(docRef, {
        lastUpdated: serverTimestamp(),
        [`tabs.${tabName}`]: arrayUnion({
          id: `${text}-${Date.now()}`,
          text,
        }),
      });
    } catch (error) {
      console.log(error.message);
    }
  }
);

const boardDataSlice = createSlice({
  name: "boardData",
  initialState,
  reducers: {
    handleLastUpdated: () => {
      return {
        ...state,
        lastUpdated,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoard.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(fetchBoard.fulfilled, (state, action) => {
        return {
          ...state,
          boardData: action.payload,
          areBoardDataFetched: true,
          loading: false,
          lastUpdated: action.payload.lastUpdated,
          data: action.payload?.tabs,
        };
      })
      .addCase(fetchBoard.rejected, (state) => {
        return { ...state, loading: false, areBoardDataFetched: false };
      })
      .addCase(updateBoardData.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(updateBoardData.fulfilled, (state, action) => {
        return { ...state, loading: false };
      })
      .addCase(updateBoardData.rejected, (state) => {
        return { ...state, loading: false };
      });
  },
});
export const { handleLastUpdated } = boardDataSlice.actions;
export default boardDataSlice.reducer;

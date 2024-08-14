import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const initialState = {
  boardData: [],
  AreBoardDataFetched: false,
  lastUpdated: null,
  loading: true,
  data: null,
};

export const fetchBoard = createAsyncThunk(
  "user/boardData",
  async (boardId) => {
    try {
      const docRef = doc(db, "boardsData", boardId);
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

const boardDataSlice = createSlice({
  name: "boardData",
  initialState,
  reducers: {},
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
          data: action.payload.tabs,
        };
      })
      .addCase(fetchBoard.rejected, (state) => {
        return { ...state, loading: false, areBoardDataFetched: false };
      });
  },
});

export default boardDataSlice.reducer;

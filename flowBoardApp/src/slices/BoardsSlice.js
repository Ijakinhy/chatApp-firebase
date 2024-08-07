import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boards: [],
  areBoardsFetch: false,
};

export const boardListSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setBoards: (state, action) => {
      return {
        ...state,
        boards: action.payload,
        areBoardsFetch: true,
      };
    },
  },
});

export const { setBoards } = boardListSlice.actions;

export default boardListSlice.reducer;

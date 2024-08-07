import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import boardListSlice from "./slices/BoardsSlice";

const rootReducer = combineReducers({
  user: userSlice,
  boards: boardListSlice,
});

export default rootReducer;

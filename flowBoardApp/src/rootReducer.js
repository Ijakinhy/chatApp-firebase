import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";

const rootReducer = combineReducers({
  users: userSlice,
});

export default rootReducer;

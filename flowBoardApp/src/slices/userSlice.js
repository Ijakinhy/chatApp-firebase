import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeLoginStatus: (state, action) => {
      return { ...state, isLoggedIn: action.payload, loading: false };
    },
  },
});

export const { changeLoginStatus } = userSlice.actions;
export default userSlice.reducer;

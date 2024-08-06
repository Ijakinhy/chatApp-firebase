import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "Jakin",
  },
  reducers: {
    updateUser(state, action) {
      state.name = action.payload;
    },
  },
});

export default userSlice.reducer;

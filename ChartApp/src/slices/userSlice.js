import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

const initialState = {
  currentUser: null,
  isLoading: false,
};
export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (uid) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        return docSnap.data();
      }
      if (!uid) {
        // return { ...initialState, isLoading: false };
        return null;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.currentUser = action?.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// export const { fetchUserInfo } = userSlice.actions;

export default userSlice.reducer;
export const selectCurrentUser = (state) => state.user;

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

      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        return docSnapshot.data();
      } else {
        throw new Error("Document does not exist");
      }
    } catch (error) {
      console.log(error.message);
    }
  }
);
// export const handleBoardDataUpdate = createAsyncThunk(
//   "addTask",
//   async (payload) => {
//     const { uid, boardId, tabs } = payload;
//     const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
//     try {
//       await updateDoc(docRef, { tabs, lastUpdated: serverTimestamp() });
//     } catch (error) {
//       console.log(error.message);
//     }
//   }
// );
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

          lastUpdated: action.payload?.lastUpdated,
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
        return {
          ...state,
          loading: false,
          data: action.payload?.tabs,
          boardData: action.payload,
          areBoardDataFetched: false,
          lastUpdated: action.payload?.lastUpdated,
        };
      })
      .addCase(updateBoardData.rejected, (state) => {
        return { ...state, loading: false };
      });
    // .addCase(handleBoardDataUpdate.pending, (state) => {
    //   return { ...state, loading: true };
    // })
    // .addCase(handleBoardDataUpdate.fulfilled, (state, action) => {
    //   return { ...state, loading: false };
    // })
    // .addCase(handleBoardDataUpdate.rejected, (state) => {
    //   return { ...state, loading: false };
    // });
  },
});
export const { handleLastUpdated } = boardDataSlice.actions;
export default boardDataSlice.reducer;

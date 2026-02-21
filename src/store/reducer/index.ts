import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../@types/common";
import { getUsersAsync } from "../actions";

interface rootInterface {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: rootInterface = {
  users: [],
  loading: false,
  error: null,
};

export const rootReducer = createSlice({
  name: "root",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUsersAsync.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = [...state.users, ...action.payload];
      })
      .addCase(getUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export default rootReducer.reducer;

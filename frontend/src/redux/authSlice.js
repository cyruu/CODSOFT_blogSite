import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getInitialToken = createAsyncThunk(
  "initialToken",
  async (thunkApi) => {
    const loginToken = window.localStorage.getItem("loginToken");
    if (loginToken) {
      const res = await axios.get("http://localhost:3000/decodeJwtToken", {
        withCredentials: true,
      });

      return res.data.decodedToken;
    }
    return null;
  }
);
//check for loginToken in localstorage

const slice = createSlice({
  name: "authSlice",
  initialState: {
    loggedInUser: null,
    loading: false,
    error: false,
  },
  reducers: {
    getLoggedInUser: (state, action) => {
      // return state.loggedInUser;
      console.log("asdfa", state.loggedInUser);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitialToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInitialToken.fulfilled, (state, action) => {
        state.loading = false;
        console.log("inside extra reducers", action.payload);
        state.loggedInUser = action.payload;
      })
      .addCase(getInitialToken.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { getLoggedInUser } = slice.actions;
export default slice.reducer;

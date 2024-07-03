import { configureStore } from "@reduxjs/toolkit";
import authReducer, { getInitialToken } from "./authSlice.js";

const store = configureStore({
  reducer: authReducer,
});
store.dispatch(getInitialToken());
export default store;

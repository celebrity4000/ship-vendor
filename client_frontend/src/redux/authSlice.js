import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: localStorage.getItem("token") ? true : false,
  user: JSON.parse(localStorage.getItem("user")) || null,
  userType: localStorage.getItem("userType") || null,
  isFetching: false,
  error: false,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signupStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    signupSuccess: (state, action) => {
      state.isFetching = false;
      state.isAuth = true;
      state.error = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.userType = action.payload.userType;

      // Store user data and token in localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("userType", action.payload.userType);
    },
    signupFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
      state.token = null;
      state.userType = null;

      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userType");
    },
    updateUser: (state, action) => {
      state.isAuth = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.userType = action.payload.userType;

      // Update user data in localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("userType", action.payload.userType);
    },
  },
});

export const { signupStart, signupSuccess, signupFailure, logout, updateUser } =
  authSlice.actions;

export default authSlice.reducer;

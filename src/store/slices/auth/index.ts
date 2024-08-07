import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  me: null,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.me = action.payload;
      state.isLoading = false;
    },
    loginFailure: (state) => {
      state.isLoading = false;
    },
    authenticate: () => {},
    authenticateSuccess: (state, action) => {
      state.me = action.payload;
      state.isLoading = false;
    },
    logout: () => {},
    logoutSuccess: (state) => {
      state.me = null;
      state.isLoading = false;
    },
  },
});

export const { login, loginSuccess, loginFailure, logout, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;

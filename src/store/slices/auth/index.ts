import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  me: null,
  error: null,
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
    loginFailure: (state, action) => {
      state.error = action?.payload;
      state.isLoading = false;
    },
    authenticate: () => {},
    authenticateSuccess: (state, action) => {
      state.me = action.payload;
      state.isLoading = false;
    },
    authenticateFailure: (state, action) => {
      state.error = action?.payload;
      state.isLoading = false;
    },
    logout: () => {},
    logoutSuccess: (state) => {
      state.me = null;
      state.isLoading = false;
    },
    logoutFailure: (state, action) => {
      state.error = action?.payload;
      state.isLoading = false;
    },
  },
});

export const {
  login,
  loginSuccess,
  loginFailure,
  authenticate,
  authenticateSuccess,
  authenticateFailure,
  logout,
  logoutSuccess,
  logoutFailure,
} = authSlice.actions;

export default authSlice.reducer;

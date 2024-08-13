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
    loginFailure: (state) => {
      state.isLoading = false;
    },
    authenticate: () => {},
    authenticateSuccess: (state, action) => {
      state.me = action.payload;
      state.isLoading = false;
    },
    authenticateFailure: (state) => {
      state.isLoading = false;
    },
    logout: () => {},
    logoutSuccess: (state) => {
      state.me = null;
      state.isLoading = false;
    },
    logoutFailure: (state) => {
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetError: (state) => {
      state.error = null;
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
  setError,
  resetError,
} = authSlice.actions;

export default authSlice.reducer;

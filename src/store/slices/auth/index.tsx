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
  },
});

export const { login, loginSuccess, loginFailure } = authSlice.actions;
export default authSlice.reducer;

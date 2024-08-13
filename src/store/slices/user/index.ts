import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  isLoading: false,
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserFetch: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    },
    getUserFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const { getUserFetch, getUserSuccess, getUserFailure } = usersSlice.actions;
export default usersSlice.reducer;

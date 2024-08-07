import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cases: null,
  isLoading: false,
};

export const casesSlice = createSlice({
  name: "cases",
  initialState,
  reducers: {
    getAllCases: (state) => {
      state.isLoading = true;
    },
    getAllCasesSuccess: (state, action) => {
      state.cases = action.payload;
      state.isLoading = false;
    },
    getAllCasesFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const { getAllCases, getAllCasesSuccess, getAllCasesFailure } = casesSlice.actions;
export default casesSlice.reducer;

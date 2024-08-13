import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cases: [],
  isLoading: false,
  socketConnection: false,
};

export const casesSlice = createSlice({
  name: "cases",
  initialState,
  reducers: {
    createConnection: (state) => {
      state.socketConnection = true;
    },
    sendMessage: () => {},
    receiveMessage: () => {},
    receiveInitialMessages: () => {},
    closeConnection: (state) => {
      state.socketConnection = false;
    },
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

export const {
  getAllCases,
  getAllCasesSuccess,
  getAllCasesFailure,
  sendMessage,
  receiveMessage,
  receiveInitialMessages,
  closeConnection,
} = casesSlice.actions;
export default casesSlice.reducer;

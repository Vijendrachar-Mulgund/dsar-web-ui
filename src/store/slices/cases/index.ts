import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cases: [],
  messages: [],
  isLoading: false,
  socketConnection: false,
};

export const casesSlice = createSlice({
  name: "cases",
  initialState,
  reducers: {
    getAllCasesSuccess: (state, action) => {
      state.cases = action.payload;
      state.isLoading = false;
    },
    saveMessages: (state, action) => {
      state.messages = action.payload;
    },
    createConnection: () => {},
    sendMessage: () => {},
    receiveMessage: () => {},
    receiveInitialMessages: () => {},
    getAllCases: () => {},
    getAllCasesFailure: () => {},
    closeConnection: () => {},
  },
});

export const {
  getAllCases,
  getAllCasesSuccess,
  getAllCasesFailure,
  sendMessage,
  receiveMessage,
  receiveInitialMessages,
  saveMessages,
  closeConnection,
} = casesSlice.actions;
export default casesSlice.reducer;

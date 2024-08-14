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
    appendMessage: (state, action) => {
      console.log("appendMessage", action.payload);
      state.messages.push(action.payload);
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
  appendMessage,
  closeConnection,
} = casesSlice.actions;
export default casesSlice.reducer;

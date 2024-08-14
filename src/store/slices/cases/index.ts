import { Case, Message } from "@/types/case";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cases: [] as Case[],
  messages: [] as Message[],
  isLoading: false as boolean,
};

export const casesSlice = createSlice({
  name: "cases",
  initialState,
  reducers: {
    getAllCasesSuccess: (state, action) => {
      state.cases = action?.payload;
      state.isLoading = false;
    },
    saveInitialMessages: (state, action) => {
      state.messages = action?.payload;
    },
    saveMessage: (state, action) => {
      state.messages.push(action?.payload);
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
  saveInitialMessages,
  saveMessage,
  closeConnection,
} = casesSlice.actions;
export default casesSlice.reducer;

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
    getAllCases: () => {},
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
    createChatConnection: () => {},
    sendMessage: () => {},
    receiveMessage: () => {},
    receiveInitialMessages: () => {},
    getAllCasesFailure: () => {},
    closeChatConnection: () => {},
    closeCaseConnection: () => {},
  },
});

export const {
  getAllCases,
  getAllCasesSuccess,
  getAllCasesFailure,
  createChatConnection,
  sendMessage,
  receiveMessage,
  receiveInitialMessages,
  saveInitialMessages,
  saveMessage,
  closeChatConnection,
  closeCaseConnection,
} = casesSlice.actions;
export default casesSlice.reducer;

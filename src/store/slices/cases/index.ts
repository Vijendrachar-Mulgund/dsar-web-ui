import { Case, Message } from "@/types/case";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cases: [] as Case[],
  messages: [] as Message[],
  currentCase: {} as Case,
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
    getCaseDetail: () => {},
    getCaseDetailSuccess: (state, action) => {
      state.currentCase = action?.payload;
    },
    joinCaseRoomSaga: () => {},
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
  joinCaseRoomSaga,
  getCaseDetail,
  getCaseDetailSuccess,
  saveMessage,
  closeChatConnection,
  closeCaseConnection,
} = casesSlice.actions;
export default casesSlice.reducer;

import { SenderType } from "@/enums/SenderType";
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
    getAllCasesSuccess: (state, action) => {
      state.cases = action?.payload;
      state.isLoading = false;
    },
    saveInitialMessages: (state, action) => {
      state.messages = action?.payload;
      state.isLoading = false;
    },
    saveMessage: (state, action) => {
      if (
        action?.payload?.senderType === SenderType.artificialIntelligence ||
        action?.payload?.senderType === SenderType.drone
      ) {
        state.isLoading = false;
      } else if (action?.payload?.senderType === SenderType.user) {
        state.isLoading = true;
      }
      state.messages.push(action?.payload);
    },
    getCaseDetail: (state) => {
      state.isLoading = false;
    },
    getCaseDetailSuccess: (state, action) => {
      state.currentCase = action?.payload;
      state.isLoading = false;
    },
    leaveCaseRoom: (state) => {
      state.isLoading = false;
    },
    clearCurrentCase: (state) => {
      state.currentCase = {};
    },
    joinCaseRoomSaga: (state) => {
      state.isLoading = false;
    },
    createChatConnection: (state) => {
      state.isLoading = false;
    },
    sendMessage: (state) => {
      state.isLoading = false;
    },
    receiveMessage: (state) => {
      state.isLoading = false;
    },
    receiveInitialMessages: (state) => {
      state.isLoading = false;
    },
    getAllCasesFailure: (state) => {
      state.isLoading = false;
    },
    closeChatConnection: (state) => {
      state.isLoading = false;
    },
    closeCaseConnection: (state) => {
      state.isLoading = false;
    },
    handleCaseError: (state) => {
      state.isLoading = false;
    },
    handleChatError: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
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
  leaveCaseRoom,
  clearCurrentCase,
  saveMessage,
  closeChatConnection,
  closeCaseConnection,
  handleCaseError,
  handleChatError,
} = casesSlice.actions;
export default casesSlice.reducer;

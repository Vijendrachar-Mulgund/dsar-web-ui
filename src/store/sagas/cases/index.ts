import { takeLatest } from "redux-saga/effects";
import { saveInitialMessages, saveMessage } from "@/store/slices/cases";

import { store } from "@/store/store";

import { aiChatSocketio, caseSocketio } from "@/store/socket";
import toast from "react-hot-toast";

// Cases
function* createCaseConnection(): Generator<any, void, any> {
  try {
    caseSocketio.emit("get-all-cases");
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
}

function* getAllCases(): Generator<any, void, any> {
  try {
    caseSocketio.on("all-cases", (data: any) => {
      store.dispatch({ type: "cases/getAllCasesSuccess", payload: data });
    });
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
}

function* joinCaseRoom(payload: any): Generator<any, void, any> {
  try {
    caseSocketio.emit("join-room", payload?.payload);
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
}

function* getCaseDetail(): Generator<any, void, any> {
  try {
    caseSocketio.on("case-detail", (data: any) => {
      store.dispatch({ type: "cases/getCaseDetailSuccess", payload: data?.data });
    });
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
}

function* closeCaseConnection(): Generator<any, void, any> {
  try {
    caseSocketio.removeAllListeners();
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
}

// Chat
function* createChatConnection(payload: any): Generator<any, void, any> {
  try {
    aiChatSocketio.emit("join-room", payload?.payload);
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
}

function* receiveInitialMessages(): Generator<any, void, any> {
  try {
    aiChatSocketio.on("initial-messages", (data: any) => {
      store.dispatch(saveInitialMessages(data));
    });
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
}

function* sendMessage(payload: any): Generator<any, void, any> {
  try {
    aiChatSocketio.emit("message", payload?.payload);
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
}

function* receiveMessage(): Generator<any, void, any> {
  try {
    aiChatSocketio.on("message", (data) => {
      store.dispatch(saveMessage(data));
    });
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
}

function* closeChatConnection(payload: any): Generator<any, void, any> {
  try {
    aiChatSocketio.emit("leave-room", payload?.payload);
    aiChatSocketio.removeAllListeners();
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
}

// Case
export function* getAllCasesSaga(): Generator<any, void, any> {
  yield takeLatest("cases/getAllCases", getAllCases);
}

export function* createCaseConnectionSaga(): Generator<any, void, any> {
  yield takeLatest("cases/createCaseConnection", createCaseConnection);
}

export function* joinCaseRoomSaga(): Generator<any, void, any> {
  yield takeLatest("cases/joinCaseRoom", joinCaseRoom);
}

export function* getCaseDetailSaga(): Generator<any, void, any> {
  yield takeLatest("cases/getCaseDetail", getCaseDetail);
}

export function* closeCaseConnectionSaga(): Generator<any, void, any> {
  yield takeLatest("cases/closeCaseConnection", closeCaseConnection);
}

// Chat
export function* createChatConnectionSaga(): Generator<any, void, any> {
  yield takeLatest("cases/createChatConnection", createChatConnection);
}

export function* receiveInitialMessagesSaga(): Generator<any, void, any> {
  yield takeLatest("cases/receiveInitialMessages", receiveInitialMessages);
}

export function* sendMessageSaga(): Generator<any, void, any> {
  yield takeLatest("cases/sendMessage", sendMessage);
}

export function* receiveMessageSaga(): Generator<any, void, any> {
  yield takeLatest("cases/receiveMessage", receiveMessage);
}

export function* closeChatConnectionSaga(): Generator<any, void, any> {
  yield takeLatest("cases/closeChatConnection", closeChatConnection);
}

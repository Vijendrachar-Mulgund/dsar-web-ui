import { call, put, takeLatest } from "redux-saga/effects";
import { getAllCasesSuccess, saveInitialMessages, saveMessage } from "@/store/slices/cases";
import { axiosInstance } from "@/store/axios";

import { store } from "@/store/store";

import { aiChatSocketio } from "@/store/socket";
import toast from "react-hot-toast";

function* getAllCases(): Generator<any, void, any> {
  try {
    const data: any = yield call(() => axiosInstance.get("/case/get-all-cases"));
    const cases: any = data?.data?.case;
    yield put(getAllCasesSuccess(cases));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
}

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

export function* getAllCasesSaga(): Generator<any, void, any> {
  yield takeLatest("cases/getAllCases", getAllCases);
}

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

import { call, put, takeLatest } from "redux-saga/effects";
import { getAllCasesSuccess, saveMessages } from "@/store/slices/cases";
import { axiosInstance } from "@/store/axios";

import { store } from "@/store/store";

import { socketio } from "@/store/socket";
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

function* createConnection(payload: any): Generator<any, void, any> {
  try {
    socketio.emit("join-room", payload?.payload);
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
}

function* receiveInitialMessages(): Generator<any, void, any> {
  try {
    socketio.on("initial-messages", (data: any) => {
      store.dispatch(saveMessages(data));
    });
    yield put(saveMessages([]));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
}

function* sendMessage(payload: any): Generator<any, void, any> {
  try {
    socketio.emit("message", payload?.payload);
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
}

function* receiveMessage(): Generator<any, void, any> {
  try {
    socketio.on("message", () => {});
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
}

function* closeConnection(payload: any): Generator<any, void, any> {
  try {
    socketio.emit("leave-room", payload?.payload);
    socketio.removeAllListeners();
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
}

export function* getAllCasesSaga(): Generator<any, void, any> {
  yield takeLatest("cases/getAllCases", getAllCases);
}

export function* createConnectionSaga(): Generator<any, void, any> {
  yield takeLatest("cases/createConnection", createConnection);
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

export function* closeConnectionSaga(): Generator<any, void, any> {
  yield takeLatest("cases/closeConnection", closeConnection);
}

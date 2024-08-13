import { call, put, takeEvery } from "redux-saga/effects";
import { getAllCasesSuccess } from "@/store/slices/cases";
import { axiosInstance } from "@/store/axios";

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

function* receiveInitialMessages(): Generator<any, void, any> {}

function* sendMessage(payload: any): Generator<any, void, any> {
  try {
    socketio.emit("message", payload?.payload);
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
}

function* receiveMessage(): Generator<any, void, any> {
  try {
    socketio.on("message", (data: any) => {
      console.log("Received message", data);
    });
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
}

function* closeConnection(): Generator<any, void, any> {
  try {
    socketio.close();
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
}

export function* getAllCasesSaga(): Generator<any, void, any> {
  yield takeEvery("cases/getAllCases", getAllCases);
}

export function* createConnectionSaga(): Generator<any, void, any> {
  yield takeEvery("cases/createConnection", createConnection);
}

export function* receiveInitialMessagesSaga(): Generator<any, void, any> {
  yield takeEvery("cases/receiveInitialMessages", receiveInitialMessages);
}

export function* sendMessageSaga(): Generator<any, void, any> {
  yield takeEvery("cases/sendMessage", sendMessage);
}

export function* receiveMessageSaga(): Generator<any, void, any> {
  yield takeEvery("cases/receiveMessage", receiveMessage);
}

export function* closeConnectionSaga(): Generator<any, void, any> {
  yield takeEvery("cases/closeConnection", closeConnection);
}

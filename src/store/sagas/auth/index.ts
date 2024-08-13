import { call, put, takeEvery } from "redux-saga/effects";
import { loginSuccess, loginFailure, logoutSuccess, authenticateFailure } from "@/store/slices/auth";
import { axiosInstance } from "@/store/axios";
import { LoginPayload } from "@/types/auth";
import { User } from "@/types/auth";

function* login(payload: any): Generator<any, void, any> {
  try {
    const body: LoginPayload = payload?.payload;
    const data: any = yield call(() => axiosInstance.post("/auth/sign-in", body));
    const me: User = data?.data?.user;
    yield put(loginSuccess(me));
  } catch (error: any) {
    console.log("login", error);
    yield put(loginFailure(error?.response?.data?.message));
  }
}

function* authenticate(): Generator<any, void, any> {
  try {
    const data: any = yield call(() => axiosInstance.post("/auth/authenticate"));
    const me: User = data?.data?.user;
    yield put(loginSuccess(me));
  } catch (error: any) {
    yield put(authenticateFailure(error?.response?.data?.message));
  }
}

function* logout(): Generator<any, void, any> {
  try {
    yield call(() => axiosInstance.post("/auth/sign-out"));
    yield put(logoutSuccess());
  } catch (error: any) {
    yield put(loginFailure(error?.response?.data?.message));
  }
}

export function* loginSaga(): Generator<any, void, any> {
  yield takeEvery("auth/login", login);
}

export function* authenticateSaga(): Generator<any, void, any> {
  yield takeEvery("auth/authenticate", authenticate);
}

export function* logoutSaga(): Generator<any, void, any> {
  yield takeEvery("auth/logout", logout);
}

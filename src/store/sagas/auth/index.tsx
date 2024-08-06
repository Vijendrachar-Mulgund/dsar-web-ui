import { call, put, takeEvery } from "redux-saga/effects";
import { loginSuccess, loginFailure, logoutSuccess } from "@/store/slices/auth";
import { axiosInstance } from "@/store/apis/auth";

function* login(payload: any): Generator<any, void, any> {
  try {
    const me: any = yield call(() => axiosInstance.post("/auth/sign-in", payload?.payload));
    yield put(loginSuccess(me?.data?.user));
  } catch (error: any) {
    yield put(loginFailure(error?.message));
  }
}

function* authenticate(payload: any): Generator<any, void, any> {
  try {
    const me: any = yield call(() => axiosInstance.post("/auth/authenticate", payload?.payload));
    yield put(loginSuccess(me?.data?.user));
  } catch (error: any) {
    yield put(loginFailure(error?.message));
  }
}

function* logout(): Generator<any, void, any> {
  try {
    yield call(() => axiosInstance.post("/auth/sign-out"));
    yield put(logoutSuccess());
  } catch (error: any) {
    console.log("logout", error);
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

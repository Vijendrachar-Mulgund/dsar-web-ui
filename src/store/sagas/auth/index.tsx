import { call, put, takeEvery } from "redux-saga/effects";
import { getUserSuccess, getUserFailure } from "@/store/slices/user";

function* login(payload: any): Generator<any, void, any> {
  try {
    console.log("payload", payload);
    console.log("local", import.meta.env.VITE_API_URL);
    const user: any = yield call(() =>
      fetch(`${import.meta.env.VITE_API_URL}/auth/sign-in`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload.payload),
      }),
    );
    const userJson = yield user.json();
    yield put(getUserSuccess(userJson));
  } catch (error: any) {
    yield put(getUserFailure(error?.message));
  }
}

export function* loginSaga(): Generator<any, void, any> {
  yield takeEvery("auth/login", login);
}

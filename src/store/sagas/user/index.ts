import { call, put, takeEvery } from "redux-saga/effects";
import { getUserSuccess, getUserFailure } from "@/store/slices/user";

function* fetchUser(): Generator<any, void, any> {
  try {
    const user: any = yield call(() => fetch("https://jsonplaceholder.typicode.com/users", { method: "GET" }));
    const userJson = yield user.json();
    yield put(getUserSuccess(userJson));
  } catch (error: any) {
    yield put(getUserFailure(error?.message));
  }
}

export function* getUserSaga(): Generator<any, void, any> {
  yield takeEvery("user/getUserFetch", fetchUser);
}

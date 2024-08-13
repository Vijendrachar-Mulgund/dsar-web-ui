import { call, put, takeEvery } from "redux-saga/effects";
import { getUserSuccess, getUserFailure } from "@/store/slices/user";
import { axiosInstance } from "@/store/axios";
import { User } from "@/types/auth";

function* fetchUser(): Generator<any, void, any> {
  try {
    const data: any = yield call(() => axiosInstance.get("/users/all-users"));
    const users: User[] = data?.data?.users;
    yield put(getUserSuccess(users));
  } catch (error: any) {
    yield put(getUserFailure(error?.message));
  }
}

export function* getUserSaga(): Generator<any, void, any> {
  yield takeEvery("user/getUserFetch", fetchUser);
}

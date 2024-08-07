import { call, put, takeEvery } from "redux-saga/effects";
import { getAllCasesSuccess, getAllCasesFailure } from "@/store/slices/cases";
import { axiosInstance } from "@/store/axios";

function* allCases(payload: any): Generator<any, void, any> {
  try {
    const body: any = payload?.payload;
    const data: any = yield call(() => axiosInstance.post("/auth/sign-in", body));
    const me: any = data?.data?.user;
    yield put(getAllCasesSuccess(me));
  } catch (error: any) {
    yield put(getAllCasesFailure(error?.message));
  }
}

export function* getAllCasesSaga(): Generator<any, void, any> {
  yield takeEvery("cases/getAllCases", allCases);
}

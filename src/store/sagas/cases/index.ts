import { call, put, takeEvery } from "redux-saga/effects";
import { getAllCasesSuccess } from "@/store/slices/cases";
import { axiosInstance } from "@/store/axios";
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

export function* getAllCasesSaga(): Generator<any, void, any> {
  yield takeEvery("cases/getAllCases", getAllCases);
}

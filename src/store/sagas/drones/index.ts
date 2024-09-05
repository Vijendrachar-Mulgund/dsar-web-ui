import { call, put, takeEvery } from "redux-saga/effects";
import { axiosInstance } from "@/store/axios";

import toast from "react-hot-toast";
import { Drone } from "@/types/drones";
import { getDroneSuccess } from "@/store/slices/drones";

function* getAllRegisteredDrones(): Generator<any, void, any> {
  try {
    const data: any = yield call(() => axiosInstance.get("/drones/available-drones"));
    const drones: Drone[] = data?.data?.drones;
    yield put(getDroneSuccess(drones));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
}

export function* getAllDronesSaga(): Generator<any, void, any> {
  yield takeEvery("drones/getDrones", getAllRegisteredDrones);
}

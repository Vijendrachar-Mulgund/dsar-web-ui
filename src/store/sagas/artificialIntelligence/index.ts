import { call, put, takeEvery } from "redux-saga/effects";
import { getArtificialIntelligenceSuccess } from "@/store/slices/artificialIntelligence";
import { axiosInstance } from "@/store/axios";
import { ArtificialIntelligence } from "@/types/artificialIntelligence";

import toast from "react-hot-toast";

function* getAllArtificialIntelligence(): Generator<any, void, any> {
  try {
    const data: any = yield call(() => axiosInstance.get("/artificial-intelligence/all-ai-models"));
    const ais: ArtificialIntelligence[] = data?.data?.data;
    yield put(getArtificialIntelligenceSuccess(ais));
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
}

export function* getAllArtificialIntelligenceSaga(): Generator<any, void, any> {
  yield takeEvery("artificialIntelligence/getArtificialIntelligence", getAllArtificialIntelligence);
}

import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import userReducer from "@/store/slices/user";
import authReducer from "@/store/slices/auth";
import casesReducer from "@/store/slices/cases";
import rootSaga from "@/store/sagas";

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    cases: casesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga),
});

saga.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

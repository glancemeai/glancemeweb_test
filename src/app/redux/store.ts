import { configureStore } from "@reduxjs/toolkit";
import AlertSlice from "./utils/message"
export const store = configureStore({
  reducer: {
    AlertSlice: AlertSlice,
  },
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
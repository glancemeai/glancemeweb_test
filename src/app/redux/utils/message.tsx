import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  data: { type: "error" | "info" | "success" | ""; message: string; show: boolean };
}

const initialState: State = {
  data: { type: "", message: "", show: false },
};

const AlertMessageSlice = createSlice({
  name: "AlertSlice",
  initialState: initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<State>) => {
      state.data = action.payload.data;
    },
  },
});

export const { setAlert } = AlertMessageSlice.actions;
export default AlertMessageSlice.reducer;

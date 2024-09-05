import { Drone } from "@/types/drones";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drones: [] as Drone | [],
  isLoading: false as boolean,
};

export const droneSlice = createSlice({
  name: "drones",
  initialState,
  reducers: {
    getDrone: (state) => {
      state.isLoading = true;
    },
    getDroneSuccess: (state, action) => {
      state.isLoading = false;
      state.drones = action.payload;
    },
  },
});

export const { getDrone, getDroneSuccess } = droneSlice.actions;

export default droneSlice.reducer;

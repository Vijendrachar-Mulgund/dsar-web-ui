import { ArtificialIntelligence } from "@/types/artificialIntelligence";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  artificialIntelligence: [] as ArtificialIntelligence | [],
  isLoading: false as boolean,
};

export const artificialIntelligenceSlice = createSlice({
  name: "artificialIntelligence",
  initialState,
  reducers: {
    getArtificialIntelligence: (state) => {
      state.isLoading = true;
    },
    getArtificialIntelligenceSuccess: (state, action) => {
      state.isLoading = false;
      state.artificialIntelligence = action.payload;
    },
  },
});

export const { getArtificialIntelligence, getArtificialIntelligenceSuccess } = artificialIntelligenceSlice.actions;

export default artificialIntelligenceSlice.reducer;

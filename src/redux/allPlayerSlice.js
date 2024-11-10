import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    page: 1,
  },
  tempFilters: {},
  isClub: false,
  ratings: {},
};

export const allPlayerSlice = createSlice({
  name: "allPlayers",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...action.payload };
    },
    setTempFilters: (state, action) => {
      state.tempFilters = { ...state.tempFilters, ...action.payload };
    },
    setRatings: (state, action) => {
      const { rating, players } = action.payload;
      state.ratings[rating] = players;
    },
    applyTempFilters: (state) => {
      state.filters = { ...state.tempFilters };
    },
    clearTempFilters: (state) => {
      state.tempFilters = {};
    },
    setIsClub: (state, action) => {
      state.isClub = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setFilters,
  setRatings,
  setIsClub,
  setTempFilters,
  applyTempFilters,
  clearTempFilters,
} = allPlayerSlice.actions;

export default allPlayerSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    page: 1,
  },
  ratings: {},
};

export const allPlayerSlice = createSlice({
  name: "allPlayers",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...action.payload };
    },
    setRatings: (state, action) => {
      const { rating, players } = action.payload;
      state.ratings[rating] = players;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFilters, setRatings } = allPlayerSlice.actions;

export default allPlayerSlice.reducer;

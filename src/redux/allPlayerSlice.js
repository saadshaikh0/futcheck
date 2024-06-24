import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    page: 1,
  },
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
    setRatings: (state, action) => {
      const { rating, players } = action.payload;
      state.ratings[rating] = players;
    },
    setIsClub: (state, action) => {
      state.isClub = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFilters, setRatings, setIsClub } = allPlayerSlice.actions;

export default allPlayerSlice.reducer;

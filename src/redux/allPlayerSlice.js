import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    page: 1,
  },
};

export const allPlayerSlice = createSlice({
  name: "allPlayers",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFilters } = allPlayerSlice.actions;

export default allPlayerSlice.reducer;

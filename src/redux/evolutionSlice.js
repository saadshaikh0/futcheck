import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: {},
};

export const evolutionSlice = createSlice({
  name: "evolution",
  initialState,
  reducers: {
    setEvolution: (state, action) => {
      state.details = { ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEvolution } = evolutionSlice.actions;

export default evolutionSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: {},
  selectedChemStyle: null,
  selectedChemistryPoints: 3,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayer: (state, action) => {
      state.details = { ...action.payload };
    },
    setSelectedChemStyle: (state, action) => {
      state.selectedChemStyle = action.payload;
    },
    setSelectedChemistryPoints: (state, action) => {
      state.selectedChemistryPoints = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPlayer, setSelectedChemStyle, setSelectedChemistryPoints } =
  playerSlice.actions;

export default playerSlice.reducer;

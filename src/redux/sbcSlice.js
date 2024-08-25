import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: {},
  challengeDetails: {},
  challengeSolutions: [],
  solutionLeagueDetails: {},
};

export const sbcSlice = createSlice({
  name: "sbc",
  initialState,
  reducers: {
    setSbc: (state, action) => {
      state.details = { ...action.payload };
    },
    setChallenge: (state, action) => {
      state.challengeDetails = { ...action.payload };
    },
    setChallengeSolutions: (state, action) => {
      state.challengeSolutions = action.payload;
    },
    setSolutionLeagueDetails: (state, action) => {
      state.solutionLeagueDetails = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSbc,
  setChallenge,
  setChallengeSolutions,
  setSolutionLeagueDetails,
} = sbcSlice.actions;

export default sbcSlice.reducer;

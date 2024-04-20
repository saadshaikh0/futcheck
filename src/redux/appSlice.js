import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rarities: [],
  teams: [],
  leagues: [],
  nations: [],
  userInfo: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = { ...action.payload };
    },
    setRarities: (state, action) => {
      state.rarities = [...action.payload];
    },
    setLeagues: (state, action) => {
      state.leagues = [...action.payload];
    },
    setNations: (state, action) => {
      state.nations = [...action.payload];
    },
    setTeams: (state, action) => {
      state.teams = [...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRarities, setLeagues, setNations, setTeams, setUserInfo } =
  appSlice.actions;

export default appSlice.reducer;

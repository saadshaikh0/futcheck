import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rarities: [],
  teams: [],
  leagues: [],
  nations: [],
  nationIdMap: {},
  leagueIdMap: {},
  teamIdMap: {},
  userInfo: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateFavouritePlayers: (state, action) => {
      if (state.userInfo && action.payload) {
        state.userInfo.favourite_players = action.payload;
      }
    },
    removeUserInfo: (state, action) => {
      state.userInfo = null;
    },
    setUserInfo: (state, action) => {
      state.userInfo = { ...action.payload };
    },
    setRarities: (state, action) => {
      state.rarities = [...action.payload];
    },
    setLeagues: (state, action) => {
      state.leagues = [...action.payload];
      state.leagueIdMap = action.payload.reduce((map, obj) => {
        map[obj.id] = obj;
        return map;
      }, {});
    },
    setNations: (state, action) => {
      state.nations = [...action.payload];
      state.nationIdMap = action.payload.reduce((map, obj) => {
        map[obj.id] = obj;
        return map;
      }, {});
    },
    setTeams: (state, action) => {
      state.teams = [...action.payload];
      state.teamIdMap = action.payload.reduce((map, obj) => {
        map[obj.id] = obj;
        return map;
      }, {});
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setRarities,
  setLeagues,
  setNations,
  setTeams,
  setUserInfo,
  removeUserInfo,
  updateFavouritePlayers,
} = appSlice.actions;

export default appSlice.reducer;

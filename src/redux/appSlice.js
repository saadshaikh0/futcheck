import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie } from "../components/utils/cookies";

const initialState = {
  rarities: [],
  teams: [],
  leagues: [],
  nations: [],
  nationIdMap: {},
  leagueIdMap: {},
  teamIdMap: {},
  userInfo: null,
  selectedTimezone: "UTC",
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
      ["google_token", "access_token", "refresh_token", "fc_user"].forEach(
        deleteCookie
      );
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
    setSelectedTimezone: (state, action) => {
      state.selectedTimezone = action.payload;
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
  setSelectedTimezone,
} = appSlice.actions;

export default appSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "./playerSlice";
import appSlice from "./appSlice";
import allPlayerSlice from "./allPlayerSlice";
const store = configureStore({
  reducer: {
    player: playerSlice,
    app: appSlice,
    allPlayers: allPlayerSlice,
  },
});

export default store;

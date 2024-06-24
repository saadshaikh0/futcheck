import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "./playerSlice";
import appSlice from "./appSlice";
import allPlayerSlice from "./allPlayerSlice";
import sbcSlice from "./sbcSlice";
const store = configureStore({
  reducer: {
    player: playerSlice,
    app: appSlice,
    allPlayers: allPlayerSlice,
    sbc: sbcSlice,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "./playerSlice";
import appSlice from "./appSlice";
import allPlayerSlice from "./allPlayerSlice";
import sbcSlice from "./sbcSlice";
import squadWizardSlice from "./squadWizardSlice";
import evolutionSlice from "./evolutionSlice";
const store = configureStore({
  reducer: {
    player: playerSlice,
    app: appSlice,
    allPlayers: allPlayerSlice,
    sbc: sbcSlice,
    squadWizard: squadWizardSlice,
    evolution: evolutionSlice,
  },
});

export default store;

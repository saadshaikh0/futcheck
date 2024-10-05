import { createSlice } from "@reduxjs/toolkit";
import { SQUAD_WIZARD_FORMATIONS } from "../components/utils/formations"; // Import formations data

const initialFormation = "4-3-3";
const initialPositions = SQUAD_WIZARD_FORMATIONS[initialFormation] || [];

const initialState = {
  formation: initialFormation,
  positions: initialPositions,
  players: Array(initialPositions.length).fill(null),
  selectedPositionIndex: null,
  loading: false,
  error: null,
};
const squadWizardSlice = createSlice({
  name: "squadWizard",
  initialState,
  reducers: {
    setFormation: (state, action) => {
      state.formation = action.payload;
      state.positions = SQUAD_WIZARD_FORMATIONS[state.formation] || [];
      //   state.players = Array(state.positions.length).fill(null);
    },
    setPlayerAtPosition: (state, action) => {
      const { index, player } = action.payload;
      state.players[index] = player;
    },
    removePlayerAtPosition: (state, action) => {
      const index = action.payload;
      state.players[index] = null;
    },
    setSelectedPositionIndex: (state, action) => {
      state.selectedPositionIndex = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    swapPlayersAtPositions: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      const temp = state.players[fromIndex];
      state.players[fromIndex] = state.players[toIndex];
      state.players[toIndex] = temp;
    },
  },
});

export const {
  setFormation,
  setPlayerAtPosition,
  removePlayerAtPosition,
  setSelectedPositionIndex,
  swapPlayersAtPositions,
  setLoading,
  setError,
} = squadWizardSlice.actions;

export default squadWizardSlice.reducer;

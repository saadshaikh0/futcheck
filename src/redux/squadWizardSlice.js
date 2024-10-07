import { createSlice } from "@reduxjs/toolkit";
import { SQUAD_WIZARD_FORMATIONS } from "../components/utils/formations"; // Import formations data
import {
  calculateChemistry,
  calculateRating,
} from "../components/squadWizard/squadUtils";

const initialFormation = "4-4-2";
const initialPositions = SQUAD_WIZARD_FORMATIONS[initialFormation] || [];

const initialState = {
  formation: initialFormation,
  positions: initialPositions,
  players: Array(initialPositions.length).fill(null),
  selectedPositionIndex: null,
  loading: false,
  error: null,
  chemistry: {},
  rating: 0,
};

const updateChemistryAndRating = (state) => {
  state.chemistry = calculateChemistry(state.players, state.positions);
  state.rating = calculateRating(state.players, state.positions);
};

const squadWizardSlice = createSlice({
  name: "squadWizard",
  initialState,
  reducers: {
    setFormation: (state, action) => {
      state.formation = action.payload;
      state.positions = SQUAD_WIZARD_FORMATIONS[state.formation] || [];
      //   state.players = Array(state.positions.length).fill(null);
      updateChemistryAndRating(state);
    },
    setPlayerAtPosition: (state, action) => {
      const { index, player } = action.payload;
      state.players[index] = player;
      updateChemistryAndRating(state);
    },
    removePlayerAtPosition: (state, action) => {
      const index = action.payload;
      state.players[index] = null;
      updateChemistryAndRating(state);
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
      updateChemistryAndRating(state);
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

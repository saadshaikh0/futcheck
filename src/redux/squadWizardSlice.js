import { createSlice } from "@reduxjs/toolkit";
import {
  getFormationPositions,
  SQUAD_WIZARD_FORMATIONS,
} from "../components/utils/formations"; // Import formations data
import {
  calculateChemistry,
  calculateRating,
} from "../components/squadWizard/squadUtils";

const initialFormation = "f442";
const initialPositions = getFormationPositions(initialFormation) || [];

const initialState = {
  formation: initialFormation,
  positions: initialPositions,
  players: Array(initialPositions.length).fill(null),
  selectedPositionIndex: 0,
  loading: false,
  error: null,
  chemistry: {},
  squadPrice: 0,
  rating: 0,
  lockedPlayers: [],
};

const updateChemistryAndRating = (state) => {
  state.chemistry = calculateChemistry(state.players, state.positions);
  state.rating = calculateRating(state.players, state.positions);
  state.squadPrice = state.players.reduce((acc, player) => {
    return acc + (player ? player.latest_price : 0);
  }, 0);
};

const squadWizardSlice = createSlice({
  name: "squadWizard",
  initialState,
  reducers: {
    setFormation: (state, action) => {
      state.formation = action.payload;
      state.positions =
        getFormationPositions(state.formation.replaceAll("-", "")) || [];
      //   state.players = Array(state.positions.length).fill(null);
      updateChemistryAndRating(state);
    },
    setAllPlayers: (state, action) => {
      state.players = action.payload;
      updateChemistryAndRating(state);
    },
    setPlayerAtPosition: (state, action) => {
      const { index, player } = action.payload;
      state.players[index] = player;
      updateChemistryAndRating(state);

      // Find the next null position
      const nextNullIndex = state.players.findIndex((p) => p === null);
      if (nextNullIndex !== -1) {
        state.selectedPositionIndex = nextNullIndex;
      }
    },
    toggleLockAtPosition: (state, action) => {
      const index = action.payload;
      const existingLockIndex = state.lockedPlayers.findIndex(
        (lock) => lock.positionIndex === index
      );
      if (existingLockIndex !== -1) {
        state.lockedPlayers.splice(existingLockIndex, 1);
      } else if (state.players[index]) {
        state.lockedPlayers.push({
          positionIndex: index,
          player: state.players[index],
        });
      }
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
  setAllPlayers,
  toggleLockAtPosition,
} = squadWizardSlice.actions;

export default squadWizardSlice.reducer;

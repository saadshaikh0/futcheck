import { createSlice } from "@reduxjs/toolkit";
import {
  getFormationPositions,
  SQUAD_WIZARD_FORMATIONS,
} from "../components/utils/formations"; // Import formations data
import {
  calculateChemistry,
  calculateRating,
} from "../components/squadWizard/squadUtils";
import { ConstraintTypes } from "../components/squadWizard/SquadRequirements";

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
  hiddenConstraints: [],
  constraints: [],
  showRequirements: false,
  budgetInput: 100000,
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
    // New reducers for requirements
    setBudgetInput: (state, action) => {
      state.budgetInput = action.payload;
    },
    toggleRequirements: (state) => {
      state.showRequirements = !state.showRequirements;
    },
    addConstraint: (state, action) => {
      const { type, isMulti } = action.payload;

      if (isMulti) {
        const newConstraint = {
          id: Date.now(), // Unique ID
          type,
          key: 90,
          value: 1,
          operation: "min",
        };
        state.constraints.push(newConstraint);
      } else {
        const alreadyExists = state.constraints.some((c) => c.type === type);
        if (!alreadyExists) {
          const newConstraint = {
            id: Date.now(), // Unique ID
            type,
            operation: "min",
            value:
              type === ConstraintTypes.RATING
                ? 40
                : type === ConstraintTypes.CHEMISTRY
                ? 15
                : 1,
          };
          state.constraints.push(newConstraint);
        }
      }
    },
    removeConstraint: (state, action) => {
      const idToRemove = action.payload;
      state.constraints = state.constraints.filter(
        (constraint) => constraint.id !== idToRemove
      );
    },
    // In squadWizardSlice.js
    updateConstraint: (state, action) => {
      const { id, field, value } = action.payload;

      // Find the constraint by ID and update it
      const constraintIndex = state.constraints.findIndex((c) => c.id === id);

      if (constraintIndex !== -1) {
        // Create a new object with the updated field
        state.constraints[constraintIndex] = {
          ...state.constraints[constraintIndex],
          [field]: value,
        };
      }
    },
    hideConstraint: (state, action) => {
      const constraintType = action.payload;

      // First, find the constraint to hide
      const constraintToHide = state.constraints.find(
        (c) => c.type === constraintType
      );

      if (constraintToHide) {
        // Add to hidden constraints if not already there
        if (!state.hiddenConstraints.includes(constraintType)) {
          state.hiddenConstraints.push(constraintType);
        }

        // Remove from active constraints
        state.constraints = state.constraints.filter(
          (c) => c.type !== constraintType
        );
      }
    },

    showConstraint: (state, action) => {
      const constraintType = action.payload;

      // Remove from hidden constraints
      state.hiddenConstraints = state.hiddenConstraints.filter(
        (type) => type !== constraintType
      );

      // Note: The useEffect in SquadRequirements will handle adding it back
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
  setBudgetInput,
  toggleRequirements,
  addConstraint,
  removeConstraint,
  updateConstraint,
  hideConstraint,
  showConstraint,
} = squadWizardSlice.actions;

export default squadWizardSlice.reducer;

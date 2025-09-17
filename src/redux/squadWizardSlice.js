import { createSlice } from "@reduxjs/toolkit";
import {
  getFormationPositions,
  SQUAD_WIZARD_FORMATIONS,
} from "../components/utils/formations";
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
  constraints: [], // Will store constraints in Rust format
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

// Helper to create ConstraintValue in Rust format
const createConstraintValue = (key, value, operation) => {
  // Handle key conversion to Rust's ConstraintKey enum
  let constraintKey;
  if (key === null || key === undefined || key === "") {
    return null;
  }

  if (typeof key === "string" && key.includes(",")) {
    // Multiple values
    const ids = key
      .split(",")
      .map((id) => parseInt(id.trim()))
      .filter((id) => !isNaN(id));
    constraintKey = { Multiple: ids };
  } else if (Array.isArray(key)) {
    constraintKey = { Multiple: key };
  } else {
    constraintKey = { Single: parseInt(key) };
  }

  return {
    key: constraintKey,
    value: parseInt(value),
    operation: operation || "Min",
  };
};

const squadWizardSlice = createSlice({
  name: "squadWizard",
  initialState,
  reducers: {
    setFormation: (state, action) => {
      state.formation = action.payload;
      state.positions =
        getFormationPositions(state.formation.replaceAll("-", "")) || [];
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
    setBudgetInput: (state, action) => {
      state.budgetInput = action.payload;
    },
    toggleRequirements: (state) => {
      state.showRequirements = !state.showRequirements;
    },
    addConstraint: (state, action) => {
      const { type, isMulti, ...initialValues } = action.payload;

      // Create a new constraint with unique ID
      const newConstraint = {
        id: Date.now(),
        type,
        ...initialValues,
      };

      state.constraints.push(newConstraint);
    },
    removeConstraint: (state, action) => {
      const idToRemove = action.payload;
      state.constraints = state.constraints.filter(
        (constraint) => constraint.id !== idToRemove
      );
    },
    updateConstraint: (state, action) => {
      const { id, field, value } = action.payload;

      // Find the constraint by ID and update it
      const constraintIndex = state.constraints.findIndex((c) => c.id === id);

      if (constraintIndex !== -1) {
        state.constraints[constraintIndex] = {
          ...state.constraints[constraintIndex],
          [field]: value,
        };
      }
    },
    // Helper to get constraints in Rust format
    getConstraintsForRust: (state) => {
      const rustConstraints = {
        formation: state.formation,
        budget: state.budgetInput ? parseInt(state.budgetInput) : null,
        chemistry: null,
        rating: null,
        player_overall_rating_min: null,
        player_overall_rating_max: null,
        min_quality: null,
        max_quality: null,
        exactly_quality: null,
        rarity: null,
        rarity_group: null,
        nationality: null,
        nations: null,
        same_nations: null,
        league: null,
        leagues: null,
        same_leagues: null,
        teamid: null,
        clubs: null,
        same_clubs: null,
        player_chemistry: null,
        exactly_silver: null,
        club_players: [],
        locked_players: state.lockedPlayers.map((lp) => ({
          id: lp.player.id,
          position_index: lp.positionIndex,
          rating: lp.player.rating,
          base_id: lp.player.base_id,
          latest_price:
            lp.player.latest_price || lp.player.cost || lp.player.price || 0,
          teamid: lp.player.teamid,
          leagueid: lp.player.leagueid,
          nation: lp.player.nation,
          rarity_id: lp.player.rarity_id || lp.player.rarity || 0,
          position: Array.isArray(lp.player.position)
            ? lp.player.position
            : [lp.player.position],
          name: lp.player.name,
        })),
      };

      // Process constraints
      state.constraints.forEach((c) => {
        const { type, operation, value, key } = c;

        switch (type) {
          case ConstraintTypes.CHEMISTRY:
            rustConstraints.chemistry = createConstraintValue(
              value,
              value,
              operation
            );
            break;
          case ConstraintTypes.RATING:
            rustConstraints.rating = createConstraintValue(
              value,
              value,
              operation
            );
            break;
          case ConstraintTypes.PLAYER_OVERALL_RATING_MIN:
            rustConstraints.player_overall_rating_min = createConstraintValue(
              key,
              value,
              operation
            );
            break;
          case ConstraintTypes.PLAYER_OVERALL_RATING_MAX:
            rustConstraints.player_overall_rating_max = createConstraintValue(
              key,
              value,
              operation
            );
            break;
          case ConstraintTypes.MIN_QUALITY:
            rustConstraints.min_quality = createConstraintValue(
              key || 2,
              value || 11,
              operation
            );
            break;
          case ConstraintTypes.MAX_QUALITY:
            rustConstraints.max_quality = createConstraintValue(
              key || 2,
              value || 11,
              operation
            );
            break;
          case ConstraintTypes.EXACTLY_QUALITY:
            rustConstraints.exactly_quality = createConstraintValue(
              key || 2,
              value || 11,
              operation
            );
            break;
          case ConstraintTypes.RARITY:
            if (key)
              rustConstraints.rarity = createConstraintValue(
                key,
                value,
                operation
              );
            break;
          case ConstraintTypes.RARITY_GROUP:
            if (key)
              rustConstraints.rarity_group = createConstraintValue(
                key,
                value,
                operation
              );
            break;
          case ConstraintTypes.NATIONALITY:
            if (key)
              rustConstraints.nationality = createConstraintValue(
                key,
                value,
                operation
              );
            break;
          case ConstraintTypes.NATIONS:
            rustConstraints.nations = createConstraintValue(
              value,
              value,
              operation
            );
            break;
          case ConstraintTypes.SAME_NATIONS:
            rustConstraints.same_nations = createConstraintValue(
              value,
              value,
              operation
            );
            break;
          case ConstraintTypes.LEAGUE:
            if (key)
              rustConstraints.league = createConstraintValue(
                key,
                value,
                operation
              );
            break;
          case ConstraintTypes.LEAGUES:
            rustConstraints.leagues = createConstraintValue(
              value,
              value,
              operation
            );
            break;
          case ConstraintTypes.SAME_LEAGUES:
            rustConstraints.same_leagues = createConstraintValue(
              value,
              value,
              operation
            );
            break;
          case ConstraintTypes.TEAMID:
            if (key)
              rustConstraints.teamid = createConstraintValue(
                key,
                value,
                operation
              );
            break;
          case ConstraintTypes.CLUBS:
            rustConstraints.clubs = createConstraintValue(
              value,
              value,
              operation
            );
            break;
          case ConstraintTypes.SAME_CLUBS:
            rustConstraints.same_clubs = createConstraintValue(
              value,
              value,
              operation
            );
            break;
          case ConstraintTypes.PLAYER_CHEMISTRY:
            rustConstraints.player_chemistry = createConstraintValue(
              value,
              value,
              operation
            );
            break;
          case ConstraintTypes.EXACTLY_SILVER:
            rustConstraints.exactly_silver = true;
            break;
        }
      });

      // Remove null values
      Object.keys(rustConstraints).forEach((key) => {
        if (rustConstraints[key] === null) {
          delete rustConstraints[key];
        }
      });

      return rustConstraints;
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
} = squadWizardSlice.actions;

export default squadWizardSlice.reducer;

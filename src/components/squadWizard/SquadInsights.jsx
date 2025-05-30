import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { generateSquad, fetchPlayersByIds } from "../../api/apiService";
import {
  setAllPlayers,
  setLoading,
  setBudgetInput,
} from "../../redux/squadWizardSlice";
import DynamicRangeSlider from "./DynamicRangeSlider";
import { formatNumber } from "./squadUtils";
import SquadRequirements, {
  ConstraintTypes,
  OperationTypes,
} from "./SquadRequirements";

const SquadInsights = () => {
  const [activeTab, setActiveTab] = useState("wizard");
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();
  const formation = useSelector((state) => state.squadWizard.formation);
  const lockedPlayers = useSelector((state) => state.squadWizard.lockedPlayers);
  const chemistry = useSelector((state) => state.squadWizard.chemistry);
  const rating = useSelector((state) => state.squadWizard.rating);
  const loading = useSelector((state) => state.squadWizard.loading);
  const budgetInput = useSelector((state) => state.squadWizard.budgetInput);
  const constraints = useSelector((state) => state.squadWizard.constraints);

  // ---------- Handlers ----------
  const handleBlur = () => setIsEditing(false);

  const handleBudgetChange = (e) => {
    dispatch(setBudgetInput(Number(e.target.value)));
  };

  // Helper to determine which constraints allow multiple entries
  const isMultiConstraint = (type) => type === ConstraintTypes.HIGH_RATING;

  /**
   * Build the final payload and call `generateSquad`.
   */
  const handleGenerate = async () => {
    dispatch(setLoading(true));
    try {
      let target_rating = null;
      let target_chemistry = null;
      let other_constraints = {};

      constraints.forEach((c) => {
        if (isMultiConstraint(c.type)) {
          // Handle high_rating
          const constraintType =
            c.operation === OperationTypes.MIN
              ? "min_high_rating"
              : "max_high_rating";

          if (!other_constraints[constraintType]) {
            other_constraints[constraintType] = [];
          }

          other_constraints[constraintType].push({
            key: c.key, // rating threshold
            value: c.value, // max or min # allowed
          });
        } else if (c.type === ConstraintTypes.NATIONS) {
          // Handle nations based on operation
          const nationKey =
            c.operation === OperationTypes.MIN ? "min_nations" : "max_nations";

          other_constraints[nationKey] = {
            key: -1, // Using -1 as key as per the requirement
            value: c.value,
          };
        } else if (c.type === ConstraintTypes.LEAGUES) {
          // Handle leagues based on operation
          const leagueKey =
            c.operation === OperationTypes.MIN ? "min_leagues" : "max_leagues";

          other_constraints[leagueKey] = {
            key: -1,
            value: c.value,
          };
        } else if (c.type === ConstraintTypes.CLUBS) {
          // Handle clubs based on operation
          const clubKey =
            c.operation === OperationTypes.MIN ? "min_clubs" : "max_clubs";

          if (!other_constraints[clubKey]) {
            other_constraints[clubKey] = [];
          }

          other_constraints[clubKey].push({
            key: -1,
            value: c.value,
          });
        } else {
          // Handle basic constraints
          if (c.type === ConstraintTypes.RATING) {
            target_rating = {
              value: c.value,
              type: c.operation,
            };
          } else if (c.type === ConstraintTypes.CHEMISTRY) {
            target_chemistry = {
              value: c.value,
              type: c.operation,
            };
          } else if (c.type === ConstraintTypes.Quality) {
            const qualityKey =
              c.operation === OperationTypes.MIN
                ? "min_quality"
                : c.operation === OperationTypes.EXACTLY
                ? "exactly_quality"
                : "max_quality";

            other_constraints[qualityKey] = {
              key: c.value,
              value: 11,
            };
          }
        }
      });

      // Build final request object
      const requestPayload = {
        budget: budgetInput,
        formation,
        lockedPlayers: lockedPlayers.map((lp) => ({
          positionIndex: lp.positionIndex,
          ...lp.player,
          latest_price: lp.player.latest_price || 200,
        })),
        target_rating,
        target_chemistry,
        other_constraints,
      };

      const data = await generateSquad(requestPayload);
      const positionIndex = data.position_index || {};
      const playerIds = Object.values(positionIndex);

      // Map returned player IDs to actual player objects
      const fetchedPlayers = await fetchPlayersByIds({ ids: playerIds });
      const mappedPlayers = Object.keys(positionIndex).map(
        (pos) => fetchedPlayers.find((p) => p.id === positionIndex[pos]) || null
      );
      dispatch(setAllPlayers(mappedPlayers));
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex flex-grow flex-col bg-charcoal p-5 pt-2 text-center h-[calc(100vh-200px)]">
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={() => setActiveTab("wizard")}
          className={activeTab === "wizard" ? "font-bold" : ""}
        >
          Wizard
        </button>
        <button
          onClick={() => setActiveTab("insights")}
          className={activeTab === "insights" ? "font-bold" : ""}
        >
          Insights
        </button>
      </div>

      {activeTab === "wizard" ? (
        <div className="flex flex-col h-full overflow-auto">
          <label className="flex gap-2 text-white mb-2">
            Budget:
            {isEditing ? (
              <input
                type="number"
                value={parseInt(budgetInput)}
                onChange={handleBudgetChange}
                onBlur={handleBlur}
                min={0}
                max={100000000}
                className="w-full bg-transparent text-white mb-2 "
                autoFocus
              />
            ) : (
              <span
                onClick={() => setIsEditing(true)}
                className="w-full bg-transparent text-white mb-2 cursor-pointer"
              >
                {formatNumber(parseInt(budgetInput))}
              </span>
            )}
          </label>

          <DynamicRangeSlider
            value={budgetInput}
            onChange={handleBudgetChange}
            max={100000000}
          />

          {/* Requirements Component */}
          <SquadRequirements />

          <button
            onClick={handleGenerate}
            className="mt-8 px-4 py-2 bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      ) : (
        /* Insights tab */
        <div>
          <div className="flex flex-col gap-2 justify-between">
            <div className="grid grid-cols-2 text-left gap-2">
              <div>Team Chemistry</div>
              <div>{chemistry?.totalChemistry || 0}/33</div>
            </div>
            <div className="grid grid-cols-2 text-left gap-2">
              <div>Team Rating</div>
              <div>{rating}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SquadInsights;

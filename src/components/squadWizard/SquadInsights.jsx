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
import playerCache from "../utils/playerCache";
import wasmSquadBuilder from "../utils/wasmSquadBuilder";

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
   * Build the final payload and call WASM genetic algorithm.
   */
  const handleGenerate = async () => {
    dispatch(setLoading(true));

    try {
      const playerPool = await playerCache.fetchAndCachePlayers();

      if (!playerPool || playerPool.length === 0) {
        throw new Error("No players available");
      }

      const wasmConstraints = wasmSquadBuilder.transformConstraints(
        formation,
        budgetInput,
        lockedPlayers,
        constraints
      );

      const result = await wasmSquadBuilder.findBestSquad(
        playerPool,
        wasmConstraints
      );

      console.log("WASM Squad Result:", result);

      if (result.players && result.players.length > 0) {
        const playerIds = result.players.map((player) => player.id);

        const completePlayerData = await fetchPlayersByIds({ ids: playerIds });

        const orderedPlayers = result.position_mapping.map((playerId) => {
          return completePlayerData.find((player) => player.id === playerId);
        });

        const validPlayers = orderedPlayers.filter(
          (player) => player !== undefined
        );

        if (validPlayers.length > 0) {
          dispatch(setAllPlayers(validPlayers));
        } else {
          console.error("No valid players found after fetching complete data");
        }
      } else {
        console.error("No valid squad found");
      }
    } catch (err) {
      console.error("Squad generation error:", err);
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

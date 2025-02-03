import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { generateSquad, fetchPlayersByIds } from "../../api/apiService";
import { setAllPlayers } from "../../redux/squadWizardSlice";
import DynamicRangeSlider from "./DynamicRangeSlider";
import { formatNumber } from "./squadUtils";
const SquadInsights = () => {
  const [activeTab, setActiveTab] = useState("wizard");
  const [budgetInput, setBudgetInput] = useState(100000);
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();
  const formation = useSelector((state) => state.squadWizard.formation);
  const lockedPlayers = useSelector((state) => state.squadWizard.lockedPlayers);
  const chemistry = useSelector((state) => state.squadWizard.chemistry);
  const rating = useSelector((state) => state.squadWizard.rating);

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleBudgetChange = (event) => {
    setBudgetInput(Number(event.target.value));
  };

  const handleGenerate = async () => {
    try {
      const data = await generateSquad({
        budget: budgetInput,
        formation,
        lockedPlayers: lockedPlayers.map((lp) => ({
          positionIndex: lp.positionIndex,
          ...lp.player,
        })),
      });
      const positionIndex = data.position_index || {};
      const playerIds = Object.values(positionIndex);
      const fetchedPlayers = await fetchPlayersByIds({ ids: playerIds });
      const mappedPlayers = Object.keys(positionIndex).map(
        (pos) => fetchedPlayers.find((p) => p.id === positionIndex[pos]) || null
      );
      dispatch(setAllPlayers(mappedPlayers));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col bg-charcoal p-5 pt-2 text-center">
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
        <div>
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
                className="w-full bg-transparent text-white mb-2 text-black"
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
          <button
            onClick={handleGenerate}
            className="mt-4 px-4 py-2 bg-blue-600 text-white"
          >
            Generate
          </button>
        </div>
      ) : (
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

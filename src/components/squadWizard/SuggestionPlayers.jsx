// SuggestionPlayers.jsx
import React, { useState } from "react";
import PlayerCard from "../common/PlayerCard";
import { useQuery } from "@tanstack/react-query";
import { fetchPlayerSuggestions } from "../../api/apiService";
import { useDebounce } from "@uidotdev/usehooks";
import { useSelector } from "react-redux";
import { SQUAD_WIZARD_FORMATIONS } from "../utils/formations";
import { ChemistryPoints } from "../PlayerViewCards/StatsCard";
import { getChemistryPoints } from "./squadUtils";

const SuggestionPlayers = ({ handlePlayerSelect }) => {
  const [budgetInput, setBudgetInput] = useState(50000);
  const debouncedBudget = useDebounce(budgetInput, 1000) || 0;
  const players = useSelector((state) => state.squadWizard.players);
  const chemistry = useSelector((state) => state.squadWizard.chemistry);
  const handleBudgetChange = (event) => {
    setBudgetInput(Number(event.target.value));
  };

  const formation = useSelector((state) => state.squadWizard.formation);
  const squadPositions = SQUAD_WIZARD_FORMATIONS[formation] || [];
  const selectedPositionIndex = useSelector(
    (state) => state.squadWizard.selectedPositionIndex
  );
  const selectedPositionValue =
    squadPositions[selectedPositionIndex]?.position || "ST";

  const {
    data: suggestedPlayers = [],
    isLoading: suggestedPlayersLoading,
    error,
  } = useQuery({
    queryKey: [
      "fetchPlayerSuggestions",
      debouncedBudget,
      selectedPositionIndex,
      players,
      formation,
    ],
    queryFn: () =>
      fetchPlayerSuggestions(
        debouncedBudget || 10000,
        chemistry.totalChemistry || 0,
        selectedPositionIndex,
        players,
        formation
      ),
    enabled: !!selectedPositionValue,
  });

  return (
    <div className="w-full">
      <input
        type="number"
        placeholder="Enter budget..."
        value={budgetInput}
        onChange={handleBudgetChange}
        className="w-full p-2 mb-4 text-black rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p>Error loading suggestions: {error.message}</p>}
      <div className="grid overflow-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 w-full">
        {suggestedPlayersLoading ? (
          <p>Loading suggested players...</p>
        ) : (
          suggestedPlayers
            // .sort((a, b) => b.latest_price - a.latest_price)
            .map((player) => (
              <div
                className="relative flex bg-gray-500 pb-3 flex-col items-center"
                onClick={() => handlePlayerSelect(player)}
                key={player.id}
              >
                <div className="relative">
                  <PlayerCard
                    player={player}
                    isMini={false}
                    isSuperMini={false}
                  />
                  <div className="absolute bottom-4">
                    <ChemistryPoints
                      points={getChemistryPoints(
                        player,
                        selectedPositionIndex,
                        players,
                        squadPositions
                      )}
                    />
                  </div>
                </div>
                <div className="bg-black px-4 flex flex-col rounded-md absolute bottom-1">
                  {player.latest_price}
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default SuggestionPlayers;

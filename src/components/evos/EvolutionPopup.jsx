import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { fetchPlayerDetails } from "../../api/apiService";
import { processLevels } from "../utils/utils";
import {
  applyUpgradesToPlayer,
  calculateStatDifference,
  generateIntermediatePlayers,
} from "./EvolutionUtils";
import PlayerCard from "../common/PlayerCard";

const EvolutionPopup = ({
  isOpen,
  player,
  evoChain,
  evoDetails,
  closeDialog,
}) => {
  const [basePlayer, setBasePlayer] = useState(null);
  const [evolutionPlayers, setEvolutionPlayers] = useState([]);

  useEffect(() => {
    const initializeEvolutionPath = async () => {
      try {
        // Fetch the base player data
        let basePlayerData = await fetchPlayerDetails(player.base_id);
        basePlayerData = basePlayerData[0];
        basePlayerData.evo_level = 0; // Set evo_level to 0 for base player
        setBasePlayer(basePlayerData);

        const players = [];
        players.push(basePlayerData);
        let previousPlayer = basePlayerData;

        let cumulativeUpgrades = [];

        for (const evoId of evoChain) {
          // Get the evo details for the evoId
          const evo = evoDetails.find((e) => e.id === evoId);

          // Process levels to extract upgrades for this evo
          const levelsUpgradeData = processLevels(evo.levels);

          const intermediatePlayers = generateIntermediatePlayers(
            previousPlayer,
            levelsUpgradeData,
            player.evo_id
          );
          const statDifference = calculateStatDifference(
            previousPlayer,
            intermediatePlayers[intermediatePlayers.length - 1]
          );
          players.push({
            ...intermediatePlayers[intermediatePlayers.length - 1],
            evo_name: evo.name,
            statDifference,
          });
          previousPlayer = intermediatePlayers[intermediatePlayers.length - 1];
        }

        setEvolutionPlayers(players);
      } catch (error) {
        console.error("Error initializing evolution path:", error);
      }
    };

    initializeEvolutionPath();

    // Cleanup function to reset state when component unmounts or dependencies change
    return () => {
      setBasePlayer(null);
      setEvolutionPlayers([]);
    };
  }, [player, evoChain, evoDetails]);

  return (
    <div>
      {isOpen && player && (
        <Dialog
          open={isOpen}
          onClose={closeDialog}
          className="fixed z-10 inset-0 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <div className="relative bg-black text-white text-center rounded  mx-auto p-6">
              <Dialog.Title className="text-lg font-medium">
                Upgrades for {player.name}
              </Dialog.Title>
              <div className="grid grid-cols-2 md:flex gap-2">
                {evolutionPlayers.map((playerData, index) => (
                  <div>
                    <div className="w-[200px]" key={playerData.id}>
                      <PlayerCard
                        player={playerData}
                        isMini={false}
                        statDifference={playerData.statDifference}
                        shouldAddStatDifference={false}
                      />
                    </div>
                    <div>{playerData.evo_name}</div>
                  </div>
                ))}
              </div>
              <button
                onClick={closeDialog}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default EvolutionPopup;

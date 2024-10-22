import { useEffect, useState } from "react";
import { fetchPlayerDetails } from "../../api/apiService";
import { processLevels } from "../utils/utils";
import { generateIntermediatePlayers } from "./EvolutionUtils";
import PlayerCard from "../common/PlayerCard";

const EvolutionPath = ({ player, levels }) => {
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

        // Process levels to extract upgrades per level
        const levelsUpgradeData = processLevels(levels);

        // Generate intermediate players
        const players = generateIntermediatePlayers(
          basePlayerData,
          levelsUpgradeData,
          player.evo_id
        );

        // Add base player at the first index
        players.unshift(basePlayerData);

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
  }, [player, levels]);

  return (
    <div>
      <div className="grid grid-cols-2 md:flex gap-2">
        {evolutionPlayers.map((playerData, index) => (
          <div key={playerData.id}>
            <PlayerCard
              player={playerData}
              isMini={false}
              statDifference={playerData.statDifference}
              shouldAddStatDifference={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvolutionPath;

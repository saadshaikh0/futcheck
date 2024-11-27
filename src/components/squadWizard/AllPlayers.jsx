import React, { useState } from "react";
import PlayerCard from "../common/PlayerCard";
import { useQuery } from "@tanstack/react-query";
import { fetchAllPlayers } from "../../api/apiService";
import { useDebounce } from "@uidotdev/usehooks";
import { calculateChemistry, getChemistryPoints } from "./squadUtils";
import { useSelector } from "react-redux";
import { ChemistryPoints } from "../PlayerViewCards/StatsCard";
import CoinsImg from "../../assets/coins.png";
import { useHandleResize } from "../utils/hooks";
const AllPlayers = ({ handlePlayerSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useHandleResize();
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const positions = useSelector((state) => state.squadWizard.positions);
  const players = useSelector((state) => state.squadWizard.players);
  const selectedPositionIndex = useSelector(
    (state) => state.squadWizard.selectedPositionIndex
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const {
    data = { players: [], total_pages: 0 },
    isLoading,
    error,
  } = useQuery({
    queryKey: ["fetchAllPlayers", debouncedSearchTerm || "Marcus"],
    queryFn: () =>
      fetchAllPlayers({ name: debouncedSearchTerm || "Marcus" }, false),
  });

  return (
    <div className="w-full flex-col flex overflow-auto">
      <div className="p-4">
        <input
          type="text"
          placeholder="Search players..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && (
          <p className="text-red-500 mt-2">
            Error loading players: {error.message}
          </p>
        )}
      </div>
      <div
        className={`${
          isMobile ? "flex overflow-x-auto gap-4" : "grid grid-cols-2 gap-2"
        } p-4 w-full`}
      >
        {isLoading ? (
          <p>Loading players...</p>
        ) : (
          data.players?.map((player) => (
            <div
              className="relative flex pb-3 flex-col items-center"
              onClick={() => handlePlayerSelect(player)}
              key={player.id}
              style={{ minWidth: isMobile ? "120px" : "auto" }}
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
                      positions
                    )}
                  />
                </div>
              </div>
              <div className="flex justify-center text-white font-bold gap-1 items-center">
                <img src={CoinsImg} className="w-3 h-3" alt="coins" />
                {player?.latest_price?.toLocaleString("en-us")}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllPlayers;

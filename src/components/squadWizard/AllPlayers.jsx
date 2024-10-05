// AllPlayers.jsx
import React, { useState } from "react";
import PlayerCard from "../common/PlayerCard";
import { useQuery } from "@tanstack/react-query";
import { fetchAllPlayers } from "../../api/apiService";
import { useDebounce } from "@uidotdev/usehooks";

const AllPlayers = ({ handlePlayerSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

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
    <div className="w-full">
      <input
        type="text"
        placeholder="Search players..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full p-2 mb-4 text-black rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p>Error loading players: {error.message}</p>}
      <div className="grid overflow-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 w-full">
        {isLoading ? (
          <p>Loading players...</p>
        ) : (
          data.players?.map((player) => (
            <div
              className="relative flex bg-gray-500 pb-3 flex-col items-center"
              onClick={() => handlePlayerSelect(player)}
              key={player.id}
            >
              <PlayerCard player={player} isMini={false} isSuperMini={false} />
              <div className="bg-black px-4 rounded-md absolute bottom-1">
                {player.latest_price}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllPlayers;

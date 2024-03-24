import React from "react";
import PlayerCard from "./common/PlayerCard";
import { fetchSimilarPlayers } from "../api/apiService";
import { useQuery } from "@tanstack/react-query";
const SimilarPlayers = ({ player }) => {
  const { data: players = [], isLoading } = useQuery({
    queryKey: ["fetchSimilarPlayers", player.id],
    queryFn: () => fetchSimilarPlayers(player),
    cacheTime: Infinity,
    staleTime: Infinity,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="text-white grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10">
        {players.map((player) => (
          <div className="flex justify-center items-center">
            <PlayerCard player={player} />
          </div>
        ))}{" "}
      </div>
    </div>
  );
};

export default SimilarPlayers;

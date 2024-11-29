// EvolutionPlayers.jsx

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PlayerCard from "../common/PlayerCard";
import { fetchEvolvedPlayers } from "../../api/apiService";
import InfinitePlayerList from "../common/InfinitePlayerList";

const EvolutionPlayers = ({ id, onPlayerClick }) => {
  const [allPlayers, setAllPlayers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showEvolved, setShowEvolved] = useState(false);

  const {
    data = { results: [], num_pages: 0 },
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["fetchEvolvedPlayers", id, page],
    queryFn: () => fetchEvolvedPlayers({ id, page }),
    keepPreviousData: true,
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [id, page]);

  useEffect(() => {
    if (!isLoading && data.results.length) {
      setAllPlayers((prevPlayers) => {
        const existingPlayerIds = new Set(prevPlayers.map((p) => p.evolved.id));
        const newPlayers = data.results.filter(
          (player) => !existingPlayerIds.has(player.evolved.id)
        );
        return [...prevPlayers, ...newPlayers];
      });
      setHasMore(page < data.num_pages);
    } else if (data.results.length === 0) {
      setHasMore(false);
    }
  }, [data]);

  const onLoadMore = () => {
    if (hasMore && !isFetching) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const renderPlayerCard = (playerPair, index) => (
    <div
      className="flex flex-col items-center"
      onClick={() => onPlayerClick(playerPair.evolved)}
    >
      <div className="flex">
        <div className="bg-gray-600 hover:bg-gray-700 relative rounded-lg m-2">
          <PlayerCard
            player={showEvolved ? playerPair.evolved : playerPair.base}
            isMini={false}
          />
          <div className="absolute bg-black text-white top-0 left-0">
            {showEvolved
              ? playerPair.evolved.expected_price
              : playerPair.base.latest_price}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full flex flex-col mx-auto mt-5 lg:px-5 h-[70vh] lg:h-full ">
      {/* Header and Button */}
      <div className="flex flex-col gap-2 lg:flex-row justify-between items-center mb-4">
        <h2 className="text-white text-lg lg:text-xl font-medium">
          Evolution Players
        </h2>

        <button
          className={`lg:px-4 lg:py-2 px-1 rounded-md lg:rounded-lg ${
            showEvolved ? "bg-blue-500" : "bg-gray-500"
          } text-white`}
          onClick={() => setShowEvolved(!showEvolved)}
        >
          {showEvolved ? "Show Base Versions" : "Show Evolved Versions"}
        </button>
      </div>

      {/* Infinite Player List */}
      <InfinitePlayerList
        players={allPlayers}
        renderPlayerCard={renderPlayerCard}
        onLoadMore={onLoadMore}
        hasMore={hasMore}
        isLoading={isFetching}
        containerClassName="bg-gray-800 rounded-lg pb-2 overflow-auto h-full"
        loadingComponent={
          !isLoading && isFetching ? (
            <div className="flex justify-center my-4">
              <div className="loader">Loading...</div>
            </div>
          ) : null
        }
        noMoreDataComponent={
          !hasMore ? (
            <div className="text-center text-white my-4">
              No more players to load.
            </div>
          ) : null
        }
      />
    </div>
  );
};

export default EvolutionPlayers;

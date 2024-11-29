// InvestmentsTab.jsx

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PlayerCard from "../common/PlayerCard";
import { fetchTrendingPlayers } from "../../api/apiService";
import InfinitePlayerList from "../common/InfinitePlayerList";
import CoinsImg from "../../assets/coins.png";
const InvestmentsTab = () => {
  const [allPlayers, setAllPlayers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const {
    data = { results: [], num_pages: 0 },
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["fetchTrendingPlayers", page],
    queryFn: () => fetchTrendingPlayers({ page }),
    keepPreviousData: true,
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    if (!isLoading && data.results.length) {
      setAllPlayers((prevPlayers) => {
        const existingPlayerIds = new Set(prevPlayers.map((p) => p.id));
        const newPlayers = data.results.filter(
          (player) => !existingPlayerIds.has(player.id)
        );
        return [...prevPlayers, ...newPlayers];
      });
      setHasMore(page < data.num_pages);
    } else if (data.results.length === 0) {
      setHasMore(false);
    }
  }, [data, isLoading]);

  const onLoadMore = () => {
    if (hasMore && !isFetching) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const renderPlayerCard = (player, index) => (
    <div
      key={player.id}
      className="flex flex-col items-center"
      onClick={() => {}}
    >
      <div className="flex">
        <div className="bg-gray-600 hover:bg-gray-700 relative rounded-lg m-2">
          <PlayerCard player={player} isMini={false} />
          <div className="bg-black text-white bg-opacity-80 text-sm lg:text-2xl font-bold z-10 flex items-center gap-1 text-center px-5 rounded-lg justify-center absolute top-0 left-1/2 -translate-x-1/2">
            <img src={CoinsImg} className="!w-5 h-5" alt="coins" />
            {player?.latest_price?.toLocaleString("en-us")}
            {player?.trend && (
              <span
                className={`${
                  player?.trend < 0 ? "text-red-500" : "text-green-500"
                } font-mono text-xs lg:text-lg`}
              >
                {player?.trend > 0 ? "+" : ""}
                {player?.trend}%
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full flex flex-col mx-auto mt-5 lg:px-5 h-[90vh] lg:h-full">
      {/* Header */}
      <h2 className="text-white text-lg lg:text-xl font-medium text-center mb-4">
        Trending Players
      </h2>

      {/* Infinite Player List */}
      <InfinitePlayerList
        players={allPlayers}
        renderPlayerCard={renderPlayerCard}
        onLoadMore={onLoadMore}
        hasMore={hasMore}
        isLoading={isFetching}
        containerClassName="bg-gray-800 rounded-lg pb-2 overflow-auto h-full"
        loadingComponent={
          isFetching && (
            <div className="flex justify-center my-4">
              <div className="loader">Loading...</div>
            </div>
          )
        }
        noMoreDataComponent={
          !hasMore && (
            <div className="text-center text-white my-4">
              No more players to load.
            </div>
          )
        }
      />
    </div>
  );
};

export default InvestmentsTab;

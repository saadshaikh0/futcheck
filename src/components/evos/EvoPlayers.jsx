// EvoPlayers.jsx

import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PlayerCard from "../common/PlayerCard";
import { fetchEvoChains } from "../../api/apiService";
import EvolutionPopup from "./EvolutionPopup"; // Import EvolutionPopup

const EvoPlayers = ({ evolutions }) => {
  const [allPlayers, setAllPlayers] = useState([]);
  const [page, setPage] = useState(1);
  const containerRef = useRef();
  const [hasMore, setHasMore] = useState(true);

  // Add state for popup visibility and selected player
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedEvoChain, setSelectedEvoChain] = useState(null);

  const openDialog = (player, evo_chain) => {
    setSelectedPlayer(player);
    setSelectedEvoChain(evo_chain);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setSelectedPlayer(null);
    setSelectedEvoChain(null);
  };

  const {
    data = { results: [], num_pages: 0 },
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["fetchEvoChains", page],
    queryFn: () => fetchEvoChains({ page }),
    keepPreviousData: true,
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    if (!isLoading && data.results.length) {
      setAllPlayers((prevPlayers) => {
        const existingPlayerIds = new Set(
          prevPlayers.map((p) => p.best_active_evolved_player.id)
        );
        const newPlayers = data.results.filter(
          (player) =>
            !existingPlayerIds.has(player.best_active_evolved_player.id)
        );
        return [...prevPlayers, ...newPlayers];
      });
      setHasMore(page < data.num_pages);
    } else if (data.results.length === 0) {
      setHasMore(false);
    }
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = containerRef.current;
      if (!scrollContainer) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;

      if (
        scrollTop + clientHeight >= scrollHeight - 5 &&
        hasMore &&
        !isFetching
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    const scrollContainer = containerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [hasMore, isFetching]);

  return (
    <div className="relative w-full flex flex-col mx-auto mt-5 lg:px-5 h-[70vh] lg:h-[80vh] ">
      <div
        ref={containerRef}
        className="bg-gray-800 rounded-lg pb-2 overflow-auto h-full"
      >
        <div className="mt-3 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-2 md:gap-4">
          {allPlayers.map((playerData, index) => (
            <div
              key={`${playerData.id}-${index}`}
              className="flex flex-col items-center"
              onClick={() =>
                openDialog(
                  playerData.best_active_evolved_player,
                  playerData.best_active_evo_chain
                )
              }
            >
              <div className="flex">
                <div className="bg-gray-600 hover:bg-gray-700 relative rounded-lg m-2">
                  <PlayerCard
                    player={playerData.best_active_evolved_player}
                    isMini={false}
                  />
                  <div className="absolute bg-black text-white top-0 left-0">
                    {/* Additional information if needed */}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading &&
            [...Array(12).keys()].map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse flex flex-col items-center"
              >
                <div className="rounded bg-slate-200 h-40 w-32 m-2"></div>
                <div className="rounded bg-slate-200 h-40 w-32 m-2"></div>
              </div>
            ))}
        </div>
        {isFetching && !isLoading && (
          <div className="flex justify-center my-4">
            <div className="loader">Loading...</div>
          </div>
        )}
        {!hasMore && (
          <div className="text-center text-white my-4">
            No more players to load.
          </div>
        )}
      </div>
      {/* Render EvolutionPopup */}
      <EvolutionPopup
        isOpen={isOpen}
        player={selectedPlayer}
        evoDetails={evolutions}
        evoChain={selectedEvoChain}
        closeDialog={closeDialog}
      />
    </div>
  );
};

export default EvoPlayers;

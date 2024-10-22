import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PlayerCard from "../common/PlayerCard";
import { fetchEvolvedPlayers } from "../../api/apiService";

const EvolutionPlayers = ({ id, onPlayerClick }) => {
  const [allPlayers, setAllPlayers] = useState([]);
  const [page, setPage] = useState(1);
  const containerRef = useRef();
  const prevPageRef = useRef(page);
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = containerRef.current;
      if (!scrollContainer) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;

      // Check if the user has scrolled to the bottom of the div
      if (
        scrollTop + clientHeight >= scrollHeight - 5 &&
        hasMore &&
        !isFetching
      ) {
        // Trigger the next page fetch
        setPage((prevPage) => prevPage + 1);
      }
    };

    // Add scroll event listener
    const scrollContainer = containerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [hasMore, isFetching]);

  return (
    <div className="relative w-full flex flex-col mx-auto mt-5 lg:px-5 h-[70vh] lg:h-full ">
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
      <div
        ref={containerRef}
        className="bg-gray-800 rounded-lg pb-2 overflow-auto h-full"
      >
        <div className="mt-3 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-2 md:gap-4">
          {allPlayers.map((playerPair, index) => (
            <div
              key={`${playerPair.evolved.id}-${index}`}
              className="flex flex-col items-center"
              onClick={() => onPlayerClick(playerPair.evolved)}
            >
              <div className="flex">
                <div className="bg-gray-600 hover:bg-gray-700 rounded-lg m-2">
                  <PlayerCard
                    player={showEvolved ? playerPair.evolved : playerPair.base}
                    isMini={false}
                  />
                </div>
              </div>
              {/* You can add additional info or styling here */}
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
    </div>
  );
};

export default EvolutionPlayers;

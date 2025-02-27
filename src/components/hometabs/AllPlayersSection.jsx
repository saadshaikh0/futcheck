import React, { useState, useEffect } from "react";
import AllPlayers from "../allPlayers";
import {
  fetchInvestmentPlayers,
  fetchLatestPlayers,
  fetchTopRatedPlayers,
} from "../../api/apiService";
import { useQuery } from "@tanstack/react-query";
import PlayerCard from "../common/PlayerCard";
import { useHandleResize } from "../utils/hooks";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const AllPlayersSection = () => {
  const [activeTab, setActiveTab] = useState("Trending");
  const [showAll, setShowAll] = useState(false);
  const isMobile = useHandleResize();

  // Fetch top-rated players for "Trending" or "Recent" tabs
  const { data: topRatedPlayers = [] } = useQuery({
    queryKey: ["fetchTopRatedPlayers"],
    queryFn: fetchTopRatedPlayers,
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  // Fetch investment players, refetched only when "Investment" tab is active
  const {
    data = { results: [], num_pages: 0 },
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["fetchInvestmentPlayers", 1],
    queryFn: () => fetchInvestmentPlayers({ page: 1 }),
    keepPreviousData: true,
    enabled: false, // disable by default
  });

  const { data: latestPlayers = [] } = useQuery({
    queryKey: ["fetchLatestPlayers"],
    queryFn: fetchLatestPlayers,
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  // When tab changes to "Investment", refetch
  useEffect(() => {
    if (activeTab === "Investment") {
      refetch();
    }
  }, [activeTab, refetch]);

  // Decide which array of players to show
  let playersToRender = [];
  if (activeTab === "Investment") {
    playersToRender = data.results;
  } else if (activeTab === "Recent") {
    playersToRender = latestPlayers;
  } else {
    // "Trending" or "Recent"
    playersToRender = topRatedPlayers;
  }

  // Limit players to 12 if not showing all
  const displayedPlayers =
    isMobile && !showAll ? playersToRender.slice(0, 12) : playersToRender;

  return (
    <div
      className="pb-10"
      style={{
        background: isMobile
          ? "linear-gradient(0.41deg, rgba(0, 0, 0, 0.85) 4.22%, #220838 100.61%)"
          : "transparent",
      }}
    >
      <div className="relative w-4/5 mx-auto">
        {/* Transition Blur Effect */}
        <div
          className="absolute top-0 left-0 w-full h-24"
          // style={{
          //   background:
          //     "linear-gradient(180deg, #23083A 100%, rgba(49, 10, 82, 0.08) 8%)",
          //   filter: "blur(50px)",
          //   zIndex: 1,
          // }}
        ></div>

        <div className="relative z-10 mt-7">
          <div className="text-white lg:text-2xl font-bold text-center p-5">
            <div className="flex justify-around">
              {["Trending", "Investment", "Recent"].map((tab) => (
                <button
                  key={tab}
                  className={`uppercase   ${
                    activeTab === tab ? "opacity-100" : "opacity-60"
                  }`}
                  onClick={() => {
                    setActiveTab(tab);
                    setShowAll(false); // Reset showAll when tab changes
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Render the players for the selected tab */}
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-10">
            {displayedPlayers.map((player, idx) => (
              <PlayerCard
                key={idx}
                player={player}
                isDisabled={false}
                isMini={true}
                showPrice={true}
              />
            ))}
          </div>

          {/* Show More button for mobile */}
          {isMobile && !showAll && playersToRender.length > 12 && (
            <div className="flex justify-center mt-4">
              <button
                className="flex items-center gap-2 text-white bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded-lg"
                onClick={() => setShowAll(true)}
              >
                Show More
                <ChevronDownIcon className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllPlayersSection;

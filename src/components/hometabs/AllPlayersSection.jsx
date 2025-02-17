import React, { useState, useEffect } from "react";
import AllPlayers from "../allPlayers";
import {
  fetchInvestmentPlayers,
  fetchLatestPlayers,
  fetchTopRatedPlayers,
} from "../../api/apiService";
import { useQuery } from "@tanstack/react-query";
import PlayerCard from "../common/PlayerCard";

const AllPlayersSection = () => {
  const [activeTab, setActiveTab] = useState("Trending");

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

  return (
    <div style={{ background: "transparent" }}>
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
          <div className="text-white text-2xl font-bold text-center p-5">
            <div className="flex justify-center space-x-4">
              {["Trending", "Investment", "Recent"].map((tab) => (
                <button
                  key={tab}
                  className={`hover:underline ${
                    activeTab === tab ? "underline" : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Render the players for the selected tab */}
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-10">
            {playersToRender.map((player, idx) => (
              <PlayerCard
                key={idx}
                player={player}
                isDisabled={false}
                isMini={true}
                showPrice={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPlayersSection;

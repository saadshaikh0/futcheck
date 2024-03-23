import React, { useState } from "react";
import LatestPlayers from "./hometabs/latestPlayers";
import {
  fetchAllRarities,
  fetchLatestPlayers,
  fetchTopRatedPlayers,
} from "../api/apiService";
import { useQuery } from "@tanstack/react-query";
import AllPromos from "./hometabs/allPromos";

const tabs = ["Latest Players", "Top Rated", "Promos"];

const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const { data: players = [], isLoading } = useQuery({
    queryKey: ["fetchLatestPlayers"],
    queryFn: fetchLatestPlayers,
    cacheTime: Infinity,
    staleTime: Infinity,
  });
  const { data: top_rated_players = [] } = useQuery({
    queryKey: ["fetchTopRatedPlayers"],
    queryFn: fetchTopRatedPlayers,
    cacheTime: Infinity,
    staleTime: Infinity,
  });
  const { data: all_promos = [] } = useQuery({
    queryKey: ["fetchAllRarities"],
    queryFn: fetchAllRarities,
    cacheTime: Infinity,
    staleTime: Infinity,
  });
  return (
    <div className="bg-slate-950 mt-8">
      <div className="flex justify-center mb-4">
        <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 gap-4">
          {tabs.map((tab, index) => {
            return (
              <li onClick={() => setSelectedTab(index)} class="me-2">
                <a
                  href="#"
                  aria-current="page"
                  class={`inline-block px-2 text-gray-500 text-lg rounded ${
                    index == selectedTab ? "bg-fuchsia-400 text-slate-950" : ""
                  } `}
                >
                  {tab}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="w-4/5 mx-auto">
        {selectedTab == 0 && <LatestPlayers players={players} />}
        {selectedTab == 1 && <LatestPlayers players={top_rated_players} />}
        {selectedTab == 2 && <AllPromos rarities={all_promos} />}
      </div>
    </div>
  );
};

export default HomePage;

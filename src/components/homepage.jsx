import React, { useState } from "react";
import LatestPlayers from "./hometabs/latestPlayers";
import {
  fetchAllRarities,
  fetchLatestPlayers,
  fetchPlayersByIds,
  fetchTopRatedPlayers,
} from "../api/apiService";
import { useQuery } from "@tanstack/react-query";
import AllPromos from "./hometabs/allPromos";
import { useSelector } from "react-redux";

const tabs = ["Latest Players", "Top Rated", "Promos"];
const userTabs = ["Favourites"];
const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState("Latest Players");
  const userInfo = useSelector((state) => state.app.userInfo);
  const { data: players = [] } = useQuery({
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
  const { data: favouritePlayers = [] } = useQuery({
    queryKey: ["favouritePlayers", userInfo?.favourite_players],
    queryFn: () => fetchPlayersByIds({ ids: userInfo?.favourite_players }),
    cacheTime: 1000 * 60 * 100,
    staleTime: Infinity,
  });
  return (
    <div className="bg-slate-950 mt-8">
      <div className="flex justify-center mb-4">
        <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 gap-4">
          {tabs.map((tab, index) => {
            return (
              <li onClick={() => setSelectedTab(tab)} class="me-2">
                <a
                  href="#"
                  aria-current="page"
                  class={`inline-block px-2 text-gray-500 text-lg rounded ${
                    tab == selectedTab ? "bg-fuchsia-400 text-slate-950" : ""
                  } `}
                >
                  {tab}
                </a>
              </li>
            );
          })}
          {userInfo &&
            userTabs.map((tab, index) => {
              return (
                <li onClick={() => setSelectedTab(tab)} class="me-2">
                  <a
                    href="#"
                    aria-current="page"
                    class={`inline-block px-2 text-gray-500 text-lg rounded ${
                      tab == selectedTab ? "bg-fuchsia-400 text-slate-950" : ""
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
        {selectedTab == tabs[0] && <LatestPlayers players={players} />}
        {selectedTab == tabs[1] && (
          <LatestPlayers players={top_rated_players} />
        )}
        {selectedTab == tabs[2] && <AllPromos rarities={all_promos} />}
        {selectedTab == userTabs[0] && (
          <LatestPlayers players={favouritePlayers} />
        )}
      </div>
    </div>
  );
};

export default HomePage;

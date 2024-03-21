import React, { useState } from "react";
import LatestPlayers from "./hometabs/latestPlayers";
import { fetchLatestPlayers } from "../api/apiService";
import { useQuery } from "@tanstack/react-query";

const tabs = ["Latest Players"];

const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState("Latest Players");

  const { data: players = [], isLoading } = useQuery({
    queryKey: ["fetchLatestPlayers"],
    queryFn: fetchLatestPlayers,
    cacheTime: Infinity,
    staleTime: Infinity,
  });
  return (
    <div className="bg-slate-950 mt-8">
      <div className="flex justify-center mb-4">
        <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 ">
          {tabs.map((tab) => {
            return (
              <li class="me-2">
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
        <LatestPlayers players={players} />
      </div>
    </div>
  );
};

export default HomePage;

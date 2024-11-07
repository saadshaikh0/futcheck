import React, { useEffect, useRef, useState } from "react";
import { fetchAllPlayers } from "../api/apiService";
import { useQuery } from "@tanstack/react-query";
import PlayerCard from "./common/PlayerCard";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, setIsClub } from "../redux/allPlayerSlice";
import { useHandleResize } from "./utils/hooks";
import { tabs } from "./filterPopups/playerFilters"; // <-- Import the tabs here

const AllPlayers = () => {
  const filters = useSelector((state) => state.allPlayers.filters);
  const isClub = useSelector((state) => state.allPlayers.isClub);
  const userInfo = useSelector((state) => state.app.userInfo);
  const isMobile = useHandleResize();
  const [allPlayers, setAllPlayers] = useState([]);

  const {
    data = { players: [], total_pages: 0 },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["fetchAllPlayers", filters, isClub],
    queryFn: () => fetchAllPlayers(filters, isClub),
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [filters, isClub]);

  return (
    <div className="relative w-full md:w-4/5 flex flex-col mx-auto mt-5 md:mt-0 px-5 h-[calc(90vh)] md:h-[calc(100vh-4rem)]">
      <div className="mb-1">
        <h2 className="text-white text-xl md:text-3xl font-medium">EAFC 25 Players Database</h2>
        <p className="text-slate-400 text-md md:text-lg">
          Browse through Eafc 25 players catalog and filter by rating, position, team etc
        </p>
      </div>
      <div className="flex flex-col overflow-auto md:grid grid-cols-[2fr_7fr] ">
        {/* Tabs Section */}
        <div className="hidden md:block overflow-auto">
          <div className="text-white min-h-full flex flex-col gap-3 bg-slate-800 mb-2 px-4 py-2 rounded">
            {tabs.map((tab) => (
              <div key={tab.name} className={tab.class}>
                {tab.name && (
                  <span className="text-white pl-1">{tab.name}</span>
                )}
                <span>{tab.component}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Rest of the content */}
      </div>
    </div>
  );
};
export default AllPlayers;

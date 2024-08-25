import React, { useState } from "react";
import PlayerCarousel from "./playerCarousel";
import PlayerStatsGraph from "./playerStatsGraph";
import PlayerStatCard from "./playerStatCard";
import InfoCard from "./InfoCard";
import PlaystyleCard from "../PlayerViewCards/PlaystyleCard";
import PriceCard from "./priceCard";
import StatsCard from "../PlayerViewCards/StatsCard";
import PlayerPriceGraph from "./playerPriceGraph";
import SalesCard from "./SalesCard";
import { useQuery } from "@tanstack/react-query";
import { fetchVersions } from "../../api/apiService";
import { useSelector } from "react-redux";

const PlayerDashboard = () => {
  const player = useSelector((state) => state.player.details);
  const userInfo = useSelector((state) => state.app.userInfo);
  const { data: playerVersions = [] } = useQuery({
    queryKey: ["fetchVersions", player.base_id, player.id],
    queryFn: () => fetchVersions(player.base_id, player.id),
    cacheTime: 1000 * 60 * 100,
    staleTime: Infinity,
  });

  const [playerDetails, setPlayerDetails] = useState(player ?? []);

  const onPlayerChange = (player) => {
    setPlayerDetails(player);
  };
  return (
    <div className=" h-full md:min-h-[90vh] bg-gray-950">
      <div className="w-[90%] md:min-h-[90vh] text-center text-white mx-auto pt-3">
        <div className="grid grid-cols-[1fr_2fr_1fr] gap-5 h-full">
          <div className="flex flex-col gap-4">
            <div className="bg-gray-900 rounded-md">
              <PlaystyleCard
                playstyles={playerDetails.playstyles}
                iconPlaystyles={playerDetails.playstyle_plus}
              />
            </div>
            <div className="bg-gray-900 rounded-md flex-grow">
              <PlayerStatCard player={playerDetails} />
            </div>
          </div>
          <div className="flex flex-col h-full ">
            <PlayerCarousel
              player={player}
              versions={playerVersions}
              onPlayerChange={onPlayerChange}
            />
            <div className="bg-gray-900 rounded-md">
              <PlayerPriceGraph id={playerDetails.id} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="bg-gray-900 rounded-md">
              <h2 className="font-bold pt-2">Stats Graph</h2>
              <PlayerStatsGraph player={playerDetails} />
            </div>
            <div className="bg-green-700 rounded-md">
              <PriceCard player={playerDetails} />
            </div>
            <div className="bg-gray-900 rounded-md pb-3">
              <SalesCard player={playerDetails} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlayerDashboard;

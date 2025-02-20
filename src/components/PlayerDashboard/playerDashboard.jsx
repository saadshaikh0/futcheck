import React, { useEffect, useMemo, useState } from "react";
import PlayerCarousel from "./playerCarousel";
import PlayerStatsGraph from "./playerStatsGraph";
import PlayerStatCard from "./playerStatCard";
import InfoCard from "./InfoCard";
import PlaystyleCard from "../PlayerViewCards/PlaystyleCard";
import PriceCard from "./priceCard";
import StatsCard from "../PlayerViewCards/StatsCard";
import CLUB_IMAGE from "../../assets/726adb2420c6698e95b64a931250b0e63ac18633.png";

import PlayerPriceGraph from "./playerPriceGraph";
import SalesCard from "./SalesCard";
import { useQuery } from "@tanstack/react-query";
import { fetchPlayerPriceHistory, fetchVersions } from "../../api/apiService";
import { useSelector } from "react-redux";
import RolesCard from "./rolesCard";
import { useHandleResize } from "../utils/hooks";

const PlayerDashboard = () => {
  const player = useSelector((state) => state.player.details);
  const userInfo = useSelector((state) => state.app.userInfo);
  const isMobile = useHandleResize();
  const { data: playerVersions = [] } = useQuery({
    queryKey: ["fetchVersions", player.base_id, player.id],
    queryFn: () => fetchVersions(player.base_id, player.id),
    cacheTime: 1000 * 60 * 100,
    staleTime: Infinity,
  });

  const [playerDetails, setPlayerDetails] = useState(player ?? []);
  const { data: price_history_data = [], isLoading: isPriceHistoryLoading } =
    useQuery({
      queryKey: ["fetchPlayerPriceHistory", playerDetails.id],
      queryFn: () => fetchPlayerPriceHistory(playerDetails.id),
      cacheTime: 1000 * 60 * 100,
      staleTime: Infinity,
    });
  useEffect(() => {
    setPlayerDetails(player);
  }, [player.id]);
  const { priceChange, percentageChange } = useMemo(() => {
    if (price_history_data.length >= 2) {
      // Extract the last two prices
      const lastPrice = price_history_data[price_history_data.length - 1].price;
      const previousPrice =
        price_history_data[price_history_data.length - 2].price;

      // Calculate the difference
      const change = lastPrice - previousPrice;

      // Calculate the percentage change
      const percentage = ((change / previousPrice) * 100).toFixed(2);

      return {
        priceChange: change,
        percentageChange: percentage,
      };
    }

    return {
      priceChange: null,
      percentageChange: null,
    };
  }, [price_history_data]);
  const onPlayerChange = (player) => {
    setPlayerDetails(player);
  };
  return (
    <div
      style={{
        background: `url(${CLUB_IMAGE}) `,
        backgroundSize: isMobile ? "220%" : "cover", // Adjust zoom level on mobile
        backgroundPosition: isMobile ? "top center" : "center center", // Adjust position
        backgroundRepeat: "no-repeat",
      }}
      className="relative min-h-[calc(100vh-4rem)] "
    >
      <div className="absolute inset-0 bg-[#1E0B20] h-full opacity-60 md:opacity-65"></div>

      <div className="w-4/5 relative text-center text-white mx-auto pt-3">
        {/* Mobile Version */}
        <div
          // key={`mobile_${player.id}`}
          className="md:hidden flex flex-col gap-5"
        >
          <PlayerCarousel
            player={player}
            versions={playerVersions}
            onPlayerChange={onPlayerChange}
          />
          <div className="rounded-md">
            <RolesCard
              plusplusroles={player.plusplusroles}
              plusroles={player.plusroles}
            />
          </div>
          <div className="rounded-md">
            <PriceCard
              player={playerDetails}
              priceChange={priceChange}
              percentageChange={percentageChange}
            />
          </div>
          <div
            style={{
              background:
                "linear-gradient(180deg, rgba(34, 14, 63, 0.7) 0%, rgba(66, 19, 136, 0.72) 100%)",
            }}
            className="bg-charcoal rounded-md"
          >
            <PlaystyleCard
              playstyles={playerDetails.playstyles}
              iconPlaystyles={playerDetails.playstyle_plus}
            />
          </div>
          <div
            style={{
              background:
                "linear-gradient(180deg, rgba(34, 14, 63, 0.7) 0%, rgba(66, 19, 136, 0.72) 100%)",
            }}
            className="bg-charcoal rounded-md flex-grow"
          >
            <PlayerStatCard player={playerDetails} />
          </div>
          <div
            style={{
              background:
                "linear-gradient(180deg, rgba(34, 14, 63, 0.7) 0%, rgba(66, 19, 136, 0.72) 100%)",
            }}
            className="bg-charcoal rounded-md flex-grow"
          >
            <PlayerPriceGraph
              data={price_history_data}
              Loading={isPriceHistoryLoading}
              isSbc={playerDetails.sbcsetid}
            />
          </div>
          <div
            style={{
              background:
                "linear-gradient(180deg, rgba(34, 14, 63, 0.7) 0%, rgba(66, 19, 136, 0.72) 100%)",
            }}
            className="bg-charcoal rounded-md pb-3 flex-grow"
          >
            <SalesCard
              data={price_history_data}
              isLoading={isPriceHistoryLoading}
              isSbc={playerDetails.sbcsetid}
            />
          </div>
        </div>
        {/* Desktop Version */}
        <div
          key={player.id}
          className="hidden md:grid grid-cols-[1fr_2fr_1fr] gap-5 h-full"
        >
          <div className="flex flex-col gap-4">
            <div
              style={{
                background:
                  "linear-gradient(180deg, rgba(34, 14, 63, 0.7) 0%, rgba(66, 19, 136, 0.72) 100%)",
              }}
              className="bg-charcoal rounded-md"
            >
              <PlaystyleCard
                playstyles={playerDetails.playstyles}
                iconPlaystyles={playerDetails.playstyle_plus}
              />
            </div>
            <div
              style={{
                background:
                  "linear-gradient(180deg, rgba(34, 14, 63, 0.7) 0%, rgba(66, 19, 136, 0.72) 100%)",
              }}
              className="bg-charcoal rounded-md flex-grow"
            >
              <PlayerStatCard player={playerDetails} />
            </div>
          </div>
          <div className="flex flex-col h-full gap-4">
            <PlayerCarousel
              player={player}
              versions={playerVersions}
              onPlayerChange={onPlayerChange}
            />
            <div
              style={{
                background:
                  "linear-gradient(180deg, rgba(34, 14, 63, 0.7) 0%, rgba(66, 19, 136, 0.72) 100%)",
              }}
              className="bg-charcoal rounded-md flex-grow"
            >
              <PlayerPriceGraph
                data={price_history_data}
                isLoading={isPriceHistoryLoading}
                isSbc={playerDetails.sbcsetid}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 h-full">
            <div className="flex flex-col gap-2 h-[42vh]">
              <div
                style={{
                  background:
                    "linear-gradient(180deg, rgba(34, 14, 63, 0.7) 0%, rgba(66, 19, 136, 0.72) 100%)",
                }}
                className="bg-charcoal rounded-md pb-2"
              >
                <RolesCard
                  plusplusroles={player.plusplusroles}
                  plusroles={player.plusroles}
                />
                {/* <PlayerStatsGraph player={playerDetails} /> */}
              </div>
              <div className="rounded-md h-full">
                <PriceCard
                  player={playerDetails}
                  priceChange={priceChange}
                  percentageChange={percentageChange}
                />
              </div>
            </div>
            <div
              style={{
                background:
                  "linear-gradient(180deg, rgba(34, 14, 63, 0.7) 0%, rgba(66, 19, 136, 0.72) 100%)",
              }}
              className="bg-charcoal rounded-md pb-3 flex-grow"
            >
              <SalesCard
                data={price_history_data}
                isLoading={isPriceHistoryLoading}
                isSbc={playerDetails.sbcsetid}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlayerDashboard;

// FodderTab.jsx

import React, { useState } from "react";
import FodderCard from "./FodderCard";
import PlayerPriceGraph from "../PlayerDashboard/playerPriceGraph";
import classNames from "classnames";
import PlayerCard from "../common/PlayerCard";
import { useHandleResize } from "../utils/hooks";

const FodderTab = ({ marketData }) => {
  const [selectedTrend, setSelectedTrend] = useState(null);
  const isMobile = useHandleResize();
  const handleTrendClick = (trend) => {
    setSelectedTrend(trend);
  };

  return (
    <div className="grid h-full overflow-auto grid-cols-1 md:grid-cols-[1fr_3fr] gap-5 lg:gap-20">
      {/* Left side with vertically stacked cards */}
      <div className="col-span-1 overflow-auto">
        {marketData.map((trend) => (
          <FodderCard
            key={trend.name}
            trend={trend}
            isSelected={selectedTrend?.name === trend.name}
            onClick={() => handleTrendClick(trend)}
          />
        ))}
      </div>
      {/* Right side with chart and top cheapest players */}
      {selectedTrend ? (
        <div className="flex flex-col lg:grid lg:grid-row-[2fr_1fr]  gap-4 overflow-y-auto">
          {/* Chart component */}
          <div className=" bg-gray-800 p-4 rounded">
            <PlayerPriceGraph
              data={selectedTrend.price_history}
              Loading={false}
            />
          </div>
          {/* Top cheapest players */}
          <div className=" bg-gray-800 lg:p-4 rounded ">
            <div className="flex gap-2 justify-between overflow-x-auto">
              {selectedTrend.top_players.map((player) => {
                console.log(player);
                return (
                  <div key={player?.id} className="mb-2 w-[60vw] lg:w-44">
                    <PlayerCard
                      player={player}
                      isMini={isMobile}
                      showPrice={isMobile}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="col-span-1 md:col-span-2 flex items-center justify-center">
          <div className="text-gray-400">Select a group to view details</div>
        </div>
      )}
    </div>
  );
};

export default FodderTab;

// FodderTab.jsx

import React, { useState } from "react";
import FodderCard from "./FodderCard";
import PlayerPriceGraph from "../PlayerDashboard/playerPriceGraph";
import classNames from "classnames";
import PlayerCard from "../common/PlayerCard";

const FodderTab = ({ marketData }) => {
  const [selectedTrend, setSelectedTrend] = useState(null);

  const handleTrendClick = (trend) => {
    setSelectedTrend(trend);
  };

  return (
    <div className="grid h-full overflow-auto grid-cols-1 md:grid-cols-[1fr_3fr] gap-20">
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
        <div className=" grid grid-row-[2fr_1fr] w-full gap-4 overflow-auto">
          {/* Chart component */}
          <div className=" bg-gray-800 p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">
              {selectedTrend.name} Price History
            </h2>
            <PlayerPriceGraph
              data={selectedTrend.price_history}
              Loading={false}
            />
          </div>
          {/* Top cheapest players */}
          <div className=" bg-gray-800 p-4 rounded ">
            <div className="grid grid-cols-5">
              {selectedTrend.top_players.map((player) => {
                console.log(player);
                return (
                  <div key={player?.id} className="mb-2 w-44">
                    <PlayerCard player={player} isMini={false} />
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

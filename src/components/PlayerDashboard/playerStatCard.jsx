import React, { useState } from "react";
import StatsCard from "../PlayerViewCards/StatsCard";
import InfoCard from "./InfoCard";
import classNames from "classnames";

const PlayerStatCard = ({ player }) => {
  const [selectedTab, setSelectedTab] = useState("stats");

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2">
        <div
          className={classNames(
            "font-bold cursor-pointer",
            selectedTab == "stats" ? "bg-gray-600" : ""
          )}
          onClick={() => setSelectedTab("stats")}
        >
          Ingame Stats
        </div>
        <div
          className={classNames(
            "font-bold cursor-pointer",
            selectedTab == "info" ? "bg-gray-600" : ""
          )}
          onClick={() => setSelectedTab("info")}
        >
          Info
        </div>
      </div>
      <div className="text-sm md:text-base scale-125:text-sm ">
        {selectedTab == "stats" && (
          <StatsCard stats={player.stats} attributes={player.attributes} />
        )}
        {selectedTab == "info" && <InfoCard player={player} />}
      </div>
    </div>
  );
};

export default PlayerStatCard;

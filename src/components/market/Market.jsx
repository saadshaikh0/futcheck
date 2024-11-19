import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { fetchMarketTrends } from "../../api/apiService";
import PlayerPriceGraph from "../PlayerDashboard/playerPriceGraph";
import classNames from "classnames";

const Market = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetchMarketTrends"],
    queryFn: fetchMarketTrends,
  });
  const [selectedTrend, setSelectedTrend] = useState(null);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading market trends</div>;
  const handleTrendClick = (trend) => {
    setSelectedTrend(trend);
  };

  return (
    <div className="text-white grid grid-cols-3 gap-4">
      <div className="col-span-1">
        <h1>Market Trends</h1>
        <ul>
          {data.map((trend, index) => (
            <li
              key={index}
              onClick={() => handleTrendClick(trend)}
              className={classNames(
                "cursor-pointer hover:underline",
                selectedTrend?.name === trend.name ? "text-blue-500" : ""
              )}
            >
              {trend.name} {trend.percentage_change}
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-2">
        {selectedTrend ? (
          <PlayerPriceGraph
            data={selectedTrend.price_history}
            Loading={false}
          />
        ) : (
          <div>Select a trend to view the chart</div>
        )}
      </div>
    </div>
  );
};
export default Market;

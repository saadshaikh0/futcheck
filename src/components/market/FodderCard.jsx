// FodderCard.jsx

import React from "react";
import classNames from "classnames";

const FodderCard = ({ trend, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={classNames(
        "cursor-pointer p-4 mb-2 rounded bg-gray-800 hover:bg-gray-700",
        isSelected ? "border-2 border-blue-500" : "border border-gray-700"
      )}
    >
      <h2 className="text-lg font-bold mb-1">{trend.name}</h2>
      <div className="flex justify-between items-center">
        <div>
          Trend:
          <span
            className={classNames(
              "ml-1 font-semibold",
              trend.percentage_change < 0 ? "text-red-500" : "text-green-500"
            )}
          >
            {trend.percentage_change > 0 ? "+" : ""}
            {trend.percentage_change}%
          </span>
        </div>
        <div>
          Avg Price:
          <span className="ml-1 font-semibold">
            {trend.avg_price?.toLocaleString()} coins
          </span>
        </div>
      </div>
    </div>
  );
};

export default FodderCard;

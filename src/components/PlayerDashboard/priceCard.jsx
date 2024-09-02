import React from "react";
import CoinsImg from "../../assets/coins.png";
import { formatValue, timeAgo } from "../utils/utils";
import classNames from "classnames";

const PriceCard = ({ player, priceChange, percentageChange }) => {
  const isNegative = priceChange < 0;
  return (
    <div
      className={classNames(
        "text-sm md:text-base flex-col   px-4 text-white items-center justify-center py-2",
        isNegative ? "bg-red-700" : "bg-green-700"
      )}
    >
      <h2 className="font-bold  ">Price Trend</h2>
      <div className="flex justify-between">
        <div className="text-green-200 font-medium">Platform</div>
        <div className="flex gap-1 items-center">PS / XBOX</div>
      </div>
      <div className="flex justify-between">
        <div className="text-green-200 font-medium">Lowest BIN</div>
        <div className="flex gap-1 items-center">
          <img src={CoinsImg} className="w-4 h-4" />{" "}
          {player.latest_price?.toLocaleString("en-US")}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-green-200 font-medium">Performance</div>
        <div>
          {!isNegative ? "+" : ""} {percentageChange}% ({" "}
          {!isNegative ? "+" : ""}
          {formatValue(parseInt(priceChange))})
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-green-200 font-medium">Last Updated</div>
        <div>{timeAgo(player.last_updated)}</div>
      </div>
    </div>
  );
};

export default PriceCard;

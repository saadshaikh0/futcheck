import React from "react";
import CoinsImg from "../../assets/coins.png";
import { formatPrice, timeAgo } from "../utils/utils";
import classNames from "classnames";

const PriceCard = ({ player, priceChange, percentageChange }) => {
  const isNegative = priceChange < 0;
  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, rgba(34, 14, 63, 0.7) 0%, rgba(66, 19, 136, 0.72) 100%)",
      }}
      className={classNames(
        "text-sm md:text-base flex-col rounded-md  h-full  px-4 text-white items-center justify-center bg-transparent py-2"

        // priceChange < 0
        //   ? "bg-red-700"
        //   : priceChange === 0
        //   ? "bg-[#151515]"
        //   : "bg-green-700"
      )}
    >
      <h2 className="font-bold pb-4 ">Price Trend</h2>
      <div className="flex justify-between">
        <div className="text-white font-medium">Platform</div>
        <div className="flex gap-1 items-center">PS / XBOX</div>
      </div>
      <div className="flex justify-between">
        <div className="text-white font-medium">Lowest BIN</div>
        <div className="flex gap-1 items-center">
          {player.latest_price === 0 ? (
            <span className="text-red-500 font-bold">EXTINCT</span>
          ) : (
            <>
              <img src={CoinsImg} className="w-4 h-4" alt="" />
              {player.latest_price?.toLocaleString("en-US")}
            </>
          )}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-white font-medium">Performance</div>
        <div>
          {!isNegative ? "+" : ""} {percentageChange}% ({" "}
          {!isNegative ? "+" : ""}
          {formatPrice(parseInt(priceChange))})
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-white font-medium">Last Updated</div>
        <div>{timeAgo(player.last_updated, true)}</div>
      </div>
    </div>
  );
};

export default PriceCard;

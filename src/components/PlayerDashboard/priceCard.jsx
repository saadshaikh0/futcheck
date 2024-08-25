import React from "react";
import CoinsImg from "../../assets/coins.png";

const PriceCard = ({ player }) => {
  return (
    <div className="flex-col px-4 text-white items-center justify-center py-2">
      <h2 className="font-bold  ">Price Trend</h2>
      <div className="flex justify-between">
        <div className="text-red-200 font-medium">Platform</div>
        <div className="flex gap-1 items-center">PS / XBOX</div>
      </div>
      <div className="flex justify-between">
        <div className="text-red-200 font-medium">Lowest BIN</div>
        <div className="flex gap-1 items-center">
          <img src={CoinsImg} className="w-4 h-4" />{" "}
          {player.latest_price?.toLocaleString("en-US")}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-red-200 font-medium">Performance</div>
        <div>1.05% (+89K)</div>
      </div>
      <div className="flex justify-between">
        <div className="text-red-200 font-medium">Last Updated</div>
        <div>Updated 5 min ago</div>
      </div>
    </div>
  );
};

export default PriceCard;

import React from "react";
import CoinsImg from "../../assets/coins.png";

const PriceCard = ({ value, updated }) => {
  return (
    <div className="flex-col px-4 text-white items-center justify-center py-2">
      <h2 className="font-bold  mb-2">Price Trend</h2>
      <div className="flex justify-between">
        <div className="text-gray-500 font-medium">Platform</div>
        <div className="flex gap-1 items-center">PS / XBOX</div>
      </div>
      <div className="flex justify-between">
        <div className="text-gray-500 font-medium">Lowest BIN</div>
        <div className="flex gap-1 items-center">
          <img src={CoinsImg} className="w-4 h-4" /> {value}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-gray-500 font-medium">Last Updated</div>
        <div>{updated}</div>
      </div>
    </div>
  );
};
export default PriceCard;

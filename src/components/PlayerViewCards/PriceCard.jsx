import React from "react";
import CoinsImg from "../../assets/coins.png";

const PriceCard = ({ value, updated, isLoading }) => {
  if (isLoading) {
    return (
      <div className="animate-pulse h-full w-full px-4 py-2">
        <h3 class="h-4 bg-gray-200 rounded-full w-2/5 dark:bg-gray-700"></h3>

        <ul class="mt-5 space-y-2">
          <li class="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700"></li>
          <li class="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700"></li>
          <li class="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700"></li>
        </ul>
      </div>
    );
  }
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

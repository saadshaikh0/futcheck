import React from "react";
import CoinsImg from "../assets/coins.png";

const PlayerPriceBox = ({ Img, name, price_data, url }) => {
  const { value, updated, min, max, prp } = price_data;
  return (
    <div class="rounded-lg bg-slate-800 flex flex-col gap-3  text-white py-5 px-7 relative  my-auto">
      <div className="flex justify-center items-center">
        <img src={Img} width={40} />
      </div>
      <p className="text-center text-2xl font-bold flex justify-center items-center gap-2">
        {value} <img src={CoinsImg} className="mt-1" width={24} />
      </p>
      <p className="text-center">Updated: {updated}</p>
      <div
        class="flex w-full h-4 rounded-full bg-gray-200  overflow-hidden dark:bg-gray-700"
        role="progressbar"
        aria-valuenow="25"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          class="flex flex-col justify-center  overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500"
          style={{ width: `${prp}%` }}
        ></div>
      </div>
      <div class="grid grid-cols-2">
        <span>PR: {min}</span>
        <span class="text-right">{max}</span>
      </div>
      <button
        type="button"
        class="w-full py-1.5 px-2 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-600 text-white hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        onClick={() => window.open(url, "_blank")}
      >
        View on {name}
      </button>
    </div>
  );
};
export default PlayerPriceBox;

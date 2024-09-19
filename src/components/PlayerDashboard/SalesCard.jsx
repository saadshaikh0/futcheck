import React, { useState } from "react";
import CoinsImg from "../../assets/coins.png";
import { ClockIcon, LockClosedIcon } from "@heroicons/react/20/solid";
import VolatilityChart from "./VolatilityChart";
import { calculateMomentum, getBestWindowToBuyAndSell } from "./dashboardUtils";
import PlayerPriceGraph from "./playerPriceGraph";
import AvgPriceGraph from "./avgPriceGraph";

const calculateCV = (stdDev, meanPrice) => {
  return stdDev / meanPrice || 0;
};

const calculateInsights = (data) => {
  if (!data) {
    return;
  }
  const calculatedMomentum = calculateMomentum(data);
  const { bestBuyWindow, bestSellWindow, minAvgPrice, maxAvgPrice } =
    getBestWindowToBuyAndSell(data);
  const hourlyPrices = Array(24)
    .fill()
    .map(() => []);
  let allPrices = [];

  data.forEach((record) => {
    const date = new Date(record.time);
    const hour = date.getHours();
    const price = Number(record.price);
    hourlyPrices[hour].push(price);
    allPrices.push(price);
  });

  const removeOutliers = (prices) => {
    if (prices.length < 4) return prices; // Not enough data to calculate IQR

    const sortedPrices = prices.slice().sort((a, b) => a - b);
    const q1 = sortedPrices[Math.floor(sortedPrices.length / 4)];
    const q3 = sortedPrices[Math.ceil(sortedPrices.length * (3 / 4)) - 1];
    const iqr = q3 - q1;

    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;

    return prices.filter((price) => price >= lowerBound && price <= upperBound);
  };

  const averagePrices = hourlyPrices.map((prices) => {
    const filteredPrices = removeOutliers(prices);
    const sum = filteredPrices.reduce((acc, price) => acc + price, 0);
    return filteredPrices.length > 0 ? sum / filteredPrices.length : null;
  });

  // Best time to buy and sell
  const bestBuyHour = averagePrices.indexOf(
    Math.min(...averagePrices.filter((price) => price !== null))
  );
  const bestSellHour = averagePrices.indexOf(
    Math.max(...averagePrices.filter((price) => price !== null))
  );

  // Get the minimum price at the bestBuyHour and maximum price at the bestSellHour
  const bestBuyPrice =
    bestBuyHour !== -1 ? Math.min(...hourlyPrices[bestBuyHour]) : null;

  const bestSellPrice =
    bestSellHour !== -1 ? Math.max(...hourlyPrices[bestSellHour]) : null;

  // Mean price
  const meanPrice =
    allPrices.reduce((acc, price) => acc + price, 0) / allPrices.length;

  // Standard deviation and variance
  const variance =
    allPrices.reduce((acc, price) => acc + Math.pow(price - meanPrice, 2), 0) /
    allPrices.length;
  const standardDeviation = Math.sqrt(variance);

  // Coefficient of Variation (CV)
  const cv = calculateCV(standardDeviation, meanPrice);

  // Historical high and low
  const allTimeHigh = Math.max(...allPrices);
  const allTimeLow = Math.min(...allPrices);

  return {
    bestBuyWindow,
    bestSellWindow,
    minAvgPrice,
    maxAvgPrice,
    meanPrice,
    standardDeviation,
    variance,
    cv,

    calculatedMomentum,
    allTimeHigh,
    allTimeLow,
    averagePrices,
  };
};
const formatHour = (hour) => {
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour}:00 ${period}`;
};
// const SalesRow = () => {
//   return (
//     <tr className=" border-b border-gray-500 h-12">
//       <td className="text-left text-gray-500">1m</td>
//       <td className="text-right font-bold">
//         <div className="flex items-center justify-end">
//           <span className="mr-1">
//             <img className="w-4 h-4" src={CoinsImg} />
//           </span>
//           <span>140,000</span>
//         </div>
//       </td>
//     </tr>
//   );
// };

// const SalesTable = () => {
//   return (
//     <table className=" data-table data-table--small data-table--scrollable  w-full">
//       <thead>
//         <tr className="text-gray-500 border-b-2 font-medium border-gray-500">
//           <th className="text-left pl-4">Time Sold</th>
//           <th className="text-right pr-4">Price</th>
//         </tr>
//       </thead>
//       <tbody>
//         <SalesRow />
//         <SalesRow />
//         <SalesRow />
//         <SalesRow />
//         <SalesRow />
//         <SalesRow />
//         <SalesRow />
//         <SalesRow />
//       </tbody>
//     </table>
//   );
// };

const SalesCard = ({ data }) => {
  const now = new Date();
  // const lastDaysData = data.filter((record) => {
  //   const recordDate = new Date(record.time);
  //   const diffTime = Math.abs(now - recordDate);
  //   const diffDays = diffTime / (1000 * 60 * 60 * 24);
  //   return diffDays <= 7;
  // });
  const insights = calculateInsights(data);
  return (
    <div className="hidden h-full md:flex justify-center items-center flex-col">
      <div className="flex items-center gap-2 text-2xl">
        <LockClosedIcon className="w-6 h-6 text-white" /> Insights not available
        right now
      </div>
    </div>
  );

  return (
    <div className="h-[40vh] scale-125:md:h-[50vh] ">
      <div className="font-bold p-2">Insights</div>

      <div className="no-scrollbar  py-2 px-5 flex-grow h-[60%]">
        <div className="flex flex-col gap-1 h-full ">
          {/* <div className="flex justify-between">
            <div className="text-gray-400 font-medium">Best Hour to Buy</div>
            <div className="flex gap-1 items-center">
              <ClockIcon className="w-4 h-4" /> {insights.bestBuyWindow}
              <span className="flex gap-1 items-center text-gray-400">
                {" "}
                (<img src={CoinsImg} className="w-3 h-3" />
                {insights.minAvgPrice?.toLocaleString("en-us")})
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-gray-400 font-medium">Best Hour to Sell</div>
            <div className="flex gap-1 items-center">
              <ClockIcon className="w-4 h-4" /> {insights.bestSellWindow}
              <span className="flex gap-1 items-center text-gray-400">
                {" "}
                (<img src={CoinsImg} className="w-3 h-3" />
                {insights.maxAvgPrice?.toLocaleString("en-us")})
              </span>
            </div>
          </div> */}

          <div className="flex justify-between">
            <div className="text-gray-300 font-medium">
              All Time Low / High{" "}
            </div>
            <div className="flex">
              <div className="flex  items-center">
                <img src={CoinsImg} className="w-4 h-4" />{" "}
                {insights.allTimeLow?.toLocaleString("en-us")}
              </div>
              <span className="font-bold px-1">-</span>
              <div className="flex  items-center">
                <img src={CoinsImg} className="w-4 h-4" />{" "}
                {insights.allTimeHigh?.toLocaleString("en-us")}
              </div>
            </div>
          </div>
          <div className="flex justify-between text-white">
            <span className="text-gray-300 "> Momentum</span>{" "}
            <span>{insights.calculatedMomentum}</span>
          </div>
          <div className="my-4">Last 7 days Average Hourly Price</div>
          {/* <p>cv : {insights.cv}</p> */}
          {/* <VolatilityChart cv={insights.cv * 100} /> */}

          <AvgPriceGraph data={insights.averagePrices} />
        </div>
      </div>
    </div>
  );
};

export default SalesCard;

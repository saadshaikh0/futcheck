import React, { useState } from "react";
import CoinsImg from "../../assets/coins.png";

const SalesRow = () => {
  return (
    <tr className=" border-b border-gray-500 h-12">
      <td className="text-left text-gray-500">1m</td>
      <td className="text-right font-bold">
        <div className="flex items-center justify-end">
          <span className="mr-1">
            <img className="w-4 h-4" src={CoinsImg} />
          </span>
          <span>140,000</span>
        </div>
      </td>
    </tr>
  );
};

const SalesTable = () => {
  return (
    <table className=" data-table data-table--small data-table--scrollable  w-full">
      <thead>
        <tr className="text-gray-500 border-b-2 font-medium border-gray-500">
          <th className="text-left pl-4">Time Sold</th>
          <th className="text-right pr-4">Price</th>
        </tr>
      </thead>
      <tbody>
        <SalesRow />
        <SalesRow />
        <SalesRow />
        <SalesRow />
        <SalesRow />
        <SalesRow />
        <SalesRow />
        <SalesRow />
      </tbody>
    </table>
  );
};

const SalesCard = () => {
  return (
    <div>
      <div className="font-bold p-2">Latest Sales</div>

      <div className="overflow-auto no-scrollbar h-[37vh] py-2 px-5">
        <SalesTable />
      </div>
    </div>
  );
};

export default SalesCard;

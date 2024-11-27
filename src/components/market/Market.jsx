// Market.jsx

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMarketTrends } from "../../api/apiService";
import classNames from "classnames";

import FodderTab from "./FodderTab";
import InvestmentsTab from "./InvestmentsTab";
import IconsTab from "./IconsTab";

const tabs = ["Fodder", "Investments", "Icons"];

const Market = () => {
  const {
    data: marketData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["fetchMarketTrends"],
    queryFn: fetchMarketTrends,
  });

  const [selectedTab, setSelectedTab] = useState("Fodder");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading market trends</div>;

  return (
    <div className="text-white md:h-[calc(100vh-4rem)] p-4 w-4/5 mx-auto">
      <div className="flex flex-col h-full ">
        <h1 className="text-2xl font-bold text-center mb-4">Market Trends</h1>

        {/* Tabs */}
        <div className="flex justify-center mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={classNames(
                "px-4 py-2 mx-2 rounded",
                selectedTab === tab
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-gray-300"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content based on selected tab */}
        {selectedTab === "Fodder" && <FodderTab marketData={marketData} />}
        {selectedTab === "Investments" && <InvestmentsTab />}
        {selectedTab === "Icons" && <IconsTab />}
      </div>
    </div>
  );
};

export default Market;

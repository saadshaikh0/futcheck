// TabsHeader.jsx

import React from "react";

const TabsHeader = ({ tabs, selectedTab, handleTabChange }) => {
  return (
    <div
      className="text-xl md:w-4/5 mx-auto md:text-4xl text-center font-bold pt-10 z-100 grid grid-cols-3"
      style={{ color: "white" }}
    >
      {tabs.map((tab) => (
        <span
          key={tab}
          onClick={() => handleTabChange(tab)}
          className={`cursor-pointer ${
            selectedTab === tab ? "opacity-100" : "opacity-50"
          }`}
        >
          {tab}
        </span>
      ))}
    </div>
  );
};

export default TabsHeader;

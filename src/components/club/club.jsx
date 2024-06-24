import React from "react";
import ClubSummary from "./clubSumary";
const Club = () => {
  return (
    <div className="w-4/5 mx-auto mt-5">
      <div className="flex flex-col gap-2">
        <div className="mb-4 pl-2">
          <h1 className="text-white text-3xl font-bold">Club Overview</h1>
        </div>
        <ClubSummary />
      </div>
    </div>
  );
};

export default Club;

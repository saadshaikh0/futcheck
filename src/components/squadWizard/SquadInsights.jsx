import React from "react";
import { useSelector } from "react-redux";

const SquadInsights = () => {
  const chemistry = useSelector((state) => state.squadWizard.chemistry);
  const rating = useSelector((state) => state.squadWizard.rating);
  return (
    <div className="flex flex-col gap-8 bg-charcoal p-5 pt-2 text-center">
      <h2 className="text-xl font-bold">Squad Insights</h2>
      <div className="flex flex-col gap-2 justify-between">
        <div className="grid grid-cols-2 text-left gap-2">
          <div> Team Chemistry </div>
          <div> {chemistry?.totalChemistry || 0}/33 </div>
        </div>
        <div className="grid grid-cols-2 text-left gap-2">
          <div>Team Rating </div>
          <div> {rating} </div>
        </div>
      </div>
    </div>
  );
};

export default SquadInsights;

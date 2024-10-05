import React from "react";
import { calculateChemistry, calculateRating } from "./squadUtils";
import { useSelector } from "react-redux";
import { SQUAD_WIZARD_FORMATIONS } from "../utils/formations";

const SquadInsights = () => {
  const formation = useSelector((state) => state.squadWizard.formation);
  const squadPositions = SQUAD_WIZARD_FORMATIONS[formation] || [];
  const players = useSelector((state) => state.squadWizard.players);
  const chemistry = calculateChemistry(players, squadPositions);
  const rating = calculateRating(players, squadPositions);
  return (
    <div className="flex flex-col gap-8 bg-gray-900 p-5 pt-2 text-center">
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

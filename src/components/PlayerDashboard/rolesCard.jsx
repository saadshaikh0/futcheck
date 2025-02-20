import React from "react";
import { roleMapping } from "../utils/constants";

const RolesCard = ({ plusplusroles, plusroles }) => {
  return (
    <div className="flex flex-col justify-center max-h-48 overflow-x-hidden overflow-y-auto scrollbar-thin py-2 ">
      {plusplusroles?.map((role, index) => (
        <div
          key={index}
          className="bg-transparent flex gap-1 items-center  transform transition-transform ml-2 hover:scale-105"
        >
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-white">
              {roleMapping[role]?.positionName}
            </span>
            <span className="text-xl font-extrabold text-gray-400 tracking-widest">
              |
            </span>

            <span className="text-lg font-semibold text-white">
              {roleMapping[role]?.cleanName}
            </span>
          </div>
          <span className="text-white text-lg font-bold">++</span>
        </div>
      ))}
      {plusroles?.map((role, index) => (
        <div
          key={index}
          className="bg-transparent flex gap-1 items-center  transform transition-transform ml-2 hover:scale-105"
        >
          <div className="flex  items-center gap-1">
            <span className="text-xs self-end pb-1 font-medium text-white">
              {roleMapping[role]?.positionName}
            </span>
            <span className="text-xl font-extrabold text-gray-400 tracking-widest">
              |
            </span>

            <span className="text-lg font-semibold text-white">
              {roleMapping[role]?.cleanName}
            </span>
          </div>
          <span className="text-white text-lg font-bold">+</span>
        </div>
      ))}
    </div>
  );
};

export default RolesCard;

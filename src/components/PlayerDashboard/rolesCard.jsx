import React from "react";
import { roleMapping } from "../utils/constants";

const RolesCard = ({ plusplusroles, plusroles }) => {
  return (
    <div className="flex justify-center flex-wrap gap-2 md:gap-4 px-4 py-4">
      {plusplusroles?.map((role, index) => (
        <div
          key={index}
          className="bg-gray-800 flex items-center gap-2 py-2 px-4 rounded-lg shadow-lg transform transition-transform hover:scale-105"
        >
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-white">
              {roleMapping[role]?.positionName}
            </span>
            <span className="text-sm text-gray-400">|</span>
            <span className="text-lg font-semibold text-white">
              {roleMapping[role]?.cleanName}
            </span>
          </div>
          <span className="text-green-500 text-lg font-bold">++</span>
        </div>
      ))}
      {plusroles?.map((role, index) => (
        <div
          key={index}
          className="bg-gray-800 flex items-center gap-2 py-2 px-4 rounded-lg shadow-lg transform transition-transform hover:scale-105"
        >
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-white">
              {roleMapping[role].positionName}
            </span>
            <span className="text-sm text-gray-400">|</span>
            <span className="text-lg font-semibold text-white">
              {roleMapping[role].cleanName}
            </span>
          </div>
          <span className="text-green-500 text-lg font-bold">+</span>
        </div>
      ))}
    </div>
  );
};

export default RolesCard;

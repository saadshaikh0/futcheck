import React from "react";
import { roleMapping } from "../utils/utils";

const RolesCard = ({ plusroles, plusplusroles }) => {
  if (!plusplusroles?.length && !plusroles?.length) {
    return <div className="md:py-20 text-xl">Player possess no roles.</div>;
  }
  return (
    <div className="md:h-[20vh] text-sm md:text-base	">
      <h2 className="hidden md:block font-bold pt-2">Roles</h2>

      <div className="md:pt-6">
        <div className="flex justify-center flex-wrap gap-2 md:gap-4 px-4">
          {plusplusroles?.map((role, index) => (
            <div
              key={index}
              className="bg-gray-800 flex gap-1 py-2 px-3 rounded-lg"
            >
              {roleMapping[role - 100]}
              <span className="text-green-500">++</span>
            </div>
          ))}
          {plusroles?.map((role, index) => (
            <div
              key={index}
              className="bg-gray-800 flex gap-1 py-2 px-3 rounded-lg"
            >
              {roleMapping[role]}
              <span className="text-green-500">+</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RolesCard;

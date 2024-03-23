import React from "react";

const AllPromos = ({ rarities }) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6">
      {rarities.map((rarity) => {
        const { name, guid } = rarity;
        return (
          <div className="flex flex-col justify-center items-center">
            <img src={guid} width={120} height={80} />
            <p className="text-white capitalize text-center whitespace-nowrap overflow-hidden overflow-ellipsis w-full ">
              {name}
            </p>
          </div>
        );
      })}
    </div>
  );
};
export default AllPromos;

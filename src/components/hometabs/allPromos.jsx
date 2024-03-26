import React from "react";

const PROMOS_TO_HIDE = [
  "standard",
  "legendary",
  "select",
  "premium",
  "ultimate",
  "vintage",
];
const AllPromos = ({ rarities }) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6">
      {rarities
        .filter(
          (rarity) =>
            !(
              PROMOS_TO_HIDE.includes(rarity.name.toLowerCase()) ||
              rarity.name.toLowerCase().includes("evo")
            )
        )
        .map((rarity) => {
          const { name, guid } = rarity;
          return (
            <div className="flex flex-col justify-center items-center cursor-pointer">
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

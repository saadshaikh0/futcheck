import { ChevronDoubleRightIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import React from "react";

const IN_GAME_STATS = {
  pace: [
    ["Acceleration", 0],
    ["Sprint Speed", 1],
  ],
  shooting: [
    ["Positioning", 11],
    ["Finishing", 16],
    ["Shot Power", 22],
    ["Long Shots", 23],
    ["Volleys", 26],
    ["Penalties", 28],
  ],
  passing: [
    ["Vision", 12],
    ["Crossing", 14],
    ["FK. Accuracy", 17],
    ["Short Passing", 20],
    ["Long Passing", 19],
    ["Curve", 27],
  ],
  dribbling: [
    ["Agility", 2],
    ["Balance", 3],
    ["Reactions", 7],
    ["Ball Control", 13],
    ["Dribbling", 15],
    ["Composure", 9],
  ],
  defending: [
    ["Interceptions", 10],
    ["Heading Accuracy", 18],
    ["Def. Awareness", 21],
    ["Standing Tackle", 24],
    ["Sliding Tackle", 25],
  ],
  physicality: [
    ["Jumping", 4],
    ["Stamina", 5],
    ["Strength", 6],
    ["Aggression", 8],
  ],
};

const getTextColorClass = (value) => {
  if (value > 75) {
    return "text-green-500";
  } else if (value > 40) {
    return "text-yellow-500";
  } else {
    return "text-red-500";
  }
};

const getBackgroundColorClass = (value) => {
  if (value > 75) {
    return "bg-green-500";
  } else if (value > 40) {
    return "bg-yellow-500";
  } else {
    return "bg-red-500";
  }
};

const DiamondSvg = ({ isFill }) => {
  return (
    <div className="w-[0.75rem] h-[0.50rem]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 125"
        x="0px"
        y="0px"
        className={isFill ? "fill-blue-400" : "fill-gray-500"}
      >
        <path d="M16.65,49.87c7.39-4.19,33.35-40.17,33.35-40.17,0,0,25.96,35.98,33.35,40.17l-33.35,40.44L16.65,49.87Z" />
      </svg>
    </div>
  );
};
const ChemistryPoints = ({ fillArr }) => {
  return (
    <div className="  cursor-pointer relative">
      <div className=" h-8 w-8 bg-gray-700 top-0 left-0 z-10  rounded-full shadow-lg"></div>

      <div className=" absolute top-[5px] left-[4px]  ">
        <div className="flex flex-col justify-center items-center">
          <DiamondSvg isFill={fillArr[1]} />
          <div className="flex">
            <DiamondSvg isFill={fillArr[0]} />
            <DiamondSvg isFill={fillArr[2]} />
          </div>
        </div>
      </div>
    </div>
  );
};

const AttributeCard = ({ group_name, value, stats }) => {
  return (
    <div>
      <div className="flex justify-between">
        <span className="capitalize">{group_name}</span>
        <span
          className={classNames(
            "text-white px-1 rounded-md",
            getBackgroundColorClass(value)
          )}
        >
          {value}
        </span>
      </div>
      <div class="w-full py-2">
        <div
          class="bg-fuchsia-600 h-1.5 rounded-full"
          style={{ width: `${value}%` }}
        ></div>
      </div>
      {IN_GAME_STATS[group_name].map((attr) => {
        return (
          <div className="flex justify-between pr-2">
            <span>{attr[0]}</span>
            <span className={classNames(getTextColorClass(stats?.[attr[1]]))}>
              {stats?.[attr[1]]}
            </span>
          </div>
        );
      })}
      {/* {group_name == "pace" && (
        <div className="flex flex-col pt-5 text-center">
          <div className="font-bold bg-gray-600">AcceleRATE</div>
          <div className="bg-black font-medium">Mostly Explosive</div>
        </div>
      )} */}
    </div>
  );
};

const StatsCard = ({ stats, attributes }) => {
  return (
    <div className="text-white px-4 ">
      <h2 className="text-md py-3 justify-center font-bold flex items-center gap-3">
        {/* Apply Chemistry{" "}
        <div className="rounded-full cursor-pointer bg-gray-700">
          {" "}
          <ChevronDoubleRightIcon className="w-6 h-6 " />
        </div> */}
      </h2>

      <div className="grid grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr] gap-3 lg:gap-5">
        {Object.keys(IN_GAME_STATS).map((stat, index) => (
          <AttributeCard
            stats={stats}
            value={attributes[index]}
            group_name={stat}
          />
        ))}
      </div>
    </div>
  );
};
export default StatsCard;

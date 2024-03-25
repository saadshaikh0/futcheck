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
    ["Balance", 3],
    ["Reactions", 7],
    ["Ball Control", 13],
    ["Dribbling", 14],
    ["Composure", 9],
  ],
  defending: [
    ["Interceptions", 10],
    ["Heading Accuracy", 18],
    ["Def. Awareness", 5],
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
            <span className={classNames(getTextColorClass(stats[attr[1]]))}>
              {stats[attr[1]]}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const StatsCard = ({ stats, attributes }) => {
  return (
    <div className="text-white p-4">
      {/* <h1 className="font-bold mb-2">In Game Stats</h1> */}
      <div className="grid grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr] gap-3 lg:gap-5">
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

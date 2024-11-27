import {
  ChevronDoubleDownIcon,
  ChevronDoubleRightIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/20/solid";
import classNames from "classnames";
import React, { useEffect } from "react";
import { Popover } from "@headlessui/react";
import {
  IN_GAME_STATS,
  ChemStyles,
  GKChemStyles,
  CHEMISTRY_STYLE_BONUSES,
  STAT_INDEX_MAP,
} from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedChemistryPoints,
  setSelectedChemStyle,
} from "../../redux/playerSlice";
import { useHandleResize } from "../utils/hooks"; // Adjust the path as necessary
export function applyChemStyle(statsArray, chemStyle, selectedChemistryPoints) {
  const styleBonuses = CHEMISTRY_STYLE_BONUSES[chemStyle];

  // Check if the chemistry style exists
  if (!styleBonuses) {
    console.log("Invalid chemistry style");
    return statsArray;
  }

  // Create a copy of the stats array to avoid mutating the original array
  const modifiedStatsArray = [...statsArray];

  // Define chemistry multiplier based on selected chemistry points
  const chemistryMultiplier =
    selectedChemistryPoints === 3 ? 4 : selectedChemistryPoints === 2 ? 2 : 1;

  // Loop through the stat names in the chemistry style bonuses and apply them
  for (const stat in styleBonuses) {
    const index = STAT_INDEX_MAP[stat];
    if (index !== undefined) {
      modifiedStatsArray[index] += styleBonuses[stat] * chemistryMultiplier; // Apply the bonus with chemistry multiplier
    }
  }

  return modifiedStatsArray;
}
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
    return "bg-green-600";
  } else if (value > 40) {
    return "bg-yellow-600";
  } else {
    return "bg-red-600";
  }
};

const DiamondSvg = ({ isFill, isSelected }) => {
  return (
    <div className="w-[0.50rem] h-[0.30rem] lg:w-[0.75rem] lg:h-[0.50rem]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 125"
        x="0px"
        y="0px"
        className={
          isFill
            ? isSelected
              ? "fill-purple-500"
              : "fill-blue-400"
            : "fill-gray-500"
        }
      >
        <path d="M16.65,49.87c7.39-4.19,33.35-40.17,33.35-40.17,0,0,25.96,35.98,33.35,40.17l-33.35,40.44L16.65,49.87Z" />
      </svg>
    </div>
  );
};
export const ChemistryPoints = ({
  points,
  onSelectChemistryPoints = () => {},
  isSelected = false,
}) => {
  return (
    <div onClick={onSelectChemistryPoints} className="cursor-pointer relative">
      <div
        className={classNames(
          "h-4 w-4 lg:h-8 lg:w-8 bg-[#151515] top-0 left-0 z-10 rounded-full shadow-lg"
        )}
      ></div>

      <div className="absolute top-[0.1rem]  lg:top-[5px] lg:left-[4px]">
        <div className="flex flex-col justify-center items-center">
          <DiamondSvg isFill={points >= 2} isSelected={isSelected} />
          <div className="flex">
            <DiamondSvg isFill={points >= 1} isSelected={isSelected} />
            <DiamondSvg isFill={points >= 3} isSelected={isSelected} />
          </div>
        </div>
      </div>
    </div>
  );
};

const AttributeCard = ({ group_name, value, stats, chemStats }) => {
  const groupStats = IN_GAME_STATS[group_name];
  const modifiedTotal = groupStats.reduce((sum, attr) => {
    const modifiedValue = Math.min(99, chemStats?.[attr[1]]) || 0; // Chemistry-modified value (use 0 if undefined)
    const weight = attr[2] || 1; // Use the weight of the attribute, default to 1 if not provided
    return sum + modifiedValue * weight; // Multiply value by its weight
  }, 0);

  // Calculate the weighted average of the group by dividing the total by the sum of weights
  const totalWeights = groupStats.reduce(
    (total, attr) => total + (attr[2] || 1),
    0
  ); // Sum of all weights

  const modifiedGroupValue = Math.round(modifiedTotal / totalWeights);

  const faceDiff = modifiedGroupValue - value;
  return (
    <div>
      <div className="flex justify-between">
        <span className="uppercase font-thin">{group_name}</span>
        <div className="flex items-center gap-2">
          {faceDiff > 0 && <span className="text-green-500">+{faceDiff}</span>}
          <span
            className={classNames(
              "text-white px-1 rounded-md",
              getBackgroundColorClass(modifiedGroupValue)
            )}
          >
            {modifiedGroupValue}
          </span>
        </div>
      </div>
      <div class="w-full py-2">
        <div
          class="bg-fuchsia-600 h-1.5 rounded-full"
          style={{ width: `${value}%` }}
        ></div>
      </div>
      {IN_GAME_STATS[group_name].map((attr) => {
        const originalValue = stats?.[attr[1]];
        const modifiedValue = chemStats?.[attr[1]];
        let diff = modifiedValue - originalValue;

        // Ensure that the modified value doesn't exceed 99
        const maxAllowedValue = 99;
        const adjustedValue = Math.min(maxAllowedValue, originalValue + diff);

        // Adjust the difference so that it matches the capped value
        diff = adjustedValue - originalValue;

        return (
          <div className="flex justify-between pr-2">
            <span>{attr[0]}</span>
            <div className="gap-2 flex items-center">
              {diff > 0 && (
                <span className="text-green-500 text-sm">+{diff}</span>
              )}
              <span className={classNames(getTextColorClass(adjustedValue))}>
                {adjustedValue}
              </span>
            </div>
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

const ChemStyleSection = ({
  selectedChemStyle,
  onSelect,
  onSelectChemistryPoints,
  selectedChemistryPoints,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center gap-4">
        <ChemistryPoints
          onSelectChemistryPoints={() => onSelectChemistryPoints(1)}
          isSelected={selectedChemistryPoints === 1}
          points={1}
        />
        <ChemistryPoints
          onSelectChemistryPoints={() => onSelectChemistryPoints(2)}
          isSelected={selectedChemistryPoints === 2}
          points={2}
        />
        <ChemistryPoints
          onSelectChemistryPoints={() => onSelectChemistryPoints(3)}
          isSelected={selectedChemistryPoints === 3}
          points={3}
        />
      </div>
      <div className="grid grid-cols-3 text-xs md:text-sm gap-2">
        {ChemStyles.map((style) => {
          return (
            <div
              className={classNames(
                " font-medium text-center rounded-md p-2 cursor-pointer",
                selectedChemStyle === style.toLowerCase()
                  ? "bg-purple-500"
                  : "bg-[#151515]"
              )}
              onClick={() =>
                onSelect(
                  style.toLowerCase() === selectedChemStyle
                    ? null
                    : style.toLowerCase()
                )
              } // Select the chem style
            >
              {style}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const StatsCard = ({ stats, attributes }) => {
  const selectedChemStyle = useSelector(
    (state) => state.player.selectedChemStyle
  );
  const selectedChemistryPoints = useSelector(
    (state) => state.player.selectedChemistryPoints
  );
  const modifiedStats = selectedChemStyle
    ? applyChemStyle([...stats], selectedChemStyle, selectedChemistryPoints)
    : stats;

  const dispatch = useDispatch();
  const isMobile = useHandleResize();

  useEffect(() => {
    return () => {
      dispatch(setSelectedChemStyle(null));
      dispatch(setSelectedChemistryPoints(3));
    };
  }, []);
  return (
    <div className="text-white px-4 ">
      <h2 className="text-md py-3 justify-center  md:justify-end font-bold flex items-center gap-3">
        Apply Chemistry{" "}
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`rounded-full cursor-pointer bg-gray-700 focus:outline-none transition-transform ${
                  (open ? "rotate-180" : "",
                  selectedChemStyle ? "bg-purple-500" : "")
                }`}
              >
                {isMobile ? (
                  <ChevronDoubleUpIcon className="w-6 h-6" />
                ) : (
                  <ChevronDoubleRightIcon className="w-6 h-6" />
                )}
              </Popover.Button>

              <Popover.Panel
                style={
                  isMobile
                    ? {
                        left: "50%", // Center horizontally
                        transform: "translateX(-70%)", // Ensure it's centered relative to its width
                        bottom: "100%", // Position it above the button, adjust as needed for spacing
                        marginBottom: "10px", // Optional margin for more spacing
                        position: "absolute",
                      }
                    : { left: "110%", top: "0", marginLeft: "15px" }
                }
                className="absolute z-10 mt-2 w-[80vw]  md:w-[15vw]  bg-[#2A2A2A] p-4 rounded-lg shadow-lg"
              >
                <ChemStyleSection
                  selectedChemistryPoints={selectedChemistryPoints}
                  onSelectChemistryPoints={(val) =>
                    dispatch(setSelectedChemistryPoints(val))
                  }
                  selectedChemStyle={selectedChemStyle}
                  onSelect={(val) => dispatch(setSelectedChemStyle(val))}
                />
              </Popover.Panel>
            </>
          )}
        </Popover>
      </h2>
      {/* <ChemStyleSection /> */}

      <div className="grid grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr]  gap-3 lg:gap-5">
        {Object.keys(IN_GAME_STATS).map((stat, index) => (
          <AttributeCard
            stats={stats}
            value={attributes[index]}
            group_name={stat}
            chemStats={modifiedStats}
          />
        ))}
      </div>
    </div>
  );
};
export default StatsCard;

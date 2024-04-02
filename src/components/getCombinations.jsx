import React, { useRef, useState } from "react";
import { fetch_combinations } from "../api/apiService";
import DualRangeSlider from "./common/RangeSlider";
import { convertString, useScrollToBottom } from "./utils/utils";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import ShowPlayers from "./getCombinationComponents/showPlayers";

const ListItem = ({ val, index }) => {
  const formattedResult = convertString(val);
  const [isShowPlayers, setIsShowPlayers] = useState(false);

  return (
    <div className="bg-slate-800 w-full md:w-56 text-white p-4 pt-2 h-42 rounded-md flex flex-col gap-2 text-center">
      <p className="font-medium">Solution {index + 1}</p>
      <hr className="w-full " />
      <div className="grid grid-cols-3 gap-2">
        {formattedResult.map(([rating, count]) => {
          return (
            <div className="bg-fuchsia-400 text-white font-bold py-3 rounded-md">
              {rating}x{count}
            </div>
          );
        })}
      </div>
      <div className="mt-auto flex justify-center text-sm ">
        <button
          onClick={() => setIsShowPlayers(!isShowPlayers)}
          className="bg-slate-950 flex text-white p-1 px-2 rounded-md mt-1"
        >
          {!isShowPlayers ? (
            <>
              {" "}
              Show Players <ChevronDownIcon className="w-6 h-6 text-white" />
            </>
          ) : (
            <>
              Hide Players <ChevronUpIcon className="w-6 h-6 text-white" />
            </>
          )}
        </button>
      </div>
      {isShowPlayers ? (
        <ShowPlayers tabs={formattedResult.map(([rating]) => rating)} />
      ) : (
        ""
      )}
    </div>
  );
};

const Combinations = () => {
  const total_combinations = useRef();

  const [currentCombinations, setCurrentCombinations] = useState([]);
  const [squadRating, setSquadRating] = useState(70);
  const [minRating, setMinRating] = useState(67);
  const [maxRating, setMaxRating] = useState(73);

  const handleScrollToBottom = () => {
    if (currentCombinations.length < total_combinations.current?.length)
      setCurrentCombinations([
        ...currentCombinations,
        ...total_combinations.current?.slice(
          currentCombinations.length,
          currentCombinations.length + 21
        ),
      ]);
  };
  const scrollRef = useScrollToBottom(handleScrollToBottom);

  const handleGenerateCombination = async () => {
    let payload = {
      squad_rating: squadRating,
      available_ratings: Array.from(
        { length: maxRating - minRating + 1 },
        (_, index) => minRating + index
      ),
    };
    const response = await fetch_combinations(payload);

    let parsedResponse = JSON.parse(response);
    console.log(parsedResponse);
    total_combinations.current = parsedResponse;
    setCurrentCombinations(parsedResponse.slice(0, 21));
  };
  return (
    <div className="w-4/5 mx-auto mt-10">
      <div className="flex flex-col md:grid  md:grid-cols-[1fr_4fr] gap-5">
        <div className="text-white justify-between md:h-[80vh] bg-slate-900 rounded-lg px-4 py-6 flex flex-col">
          <div className="flex flex-col">
            {" "}
            <div className="grid grid-cols-[2fr_1fr]">
              <div className="font-thin">Squad Rating</div>
              <div className="relative">
                {" "}
                <input
                  className="w-full bg-slate-800 rounded-md pl-2"
                  type="range"
                  min={70}
                  max={99}
                  maxLength={2}
                  onChange={(e) => {
                    let rating = parseInt(e.target.value);

                    setSquadRating(rating);
                    setMinRating(Math.max(rating - 3, 0));
                    setMaxRating(Math.min(99, rating + 3));
                  }}
                />
                <div className="text-white absolute -top-[20px] left-1/2 -translate-x-1/2 ">
                  {" "}
                  {squadRating}
                </div>
              </div>
            </div>
            {squadRating ? (
              <>
                <p className="text-center font-medium py-3">Advanced Filters</p>
                <div className="flex flex-col font-thin">
                  <span>Available Ratings</span>
                  <DualRangeSlider
                    min={squadRating - 3}
                    max={squadRating + 3}
                    minPrice={minRating}
                    setMinPrice={setMinRating}
                    maxPrice={maxRating}
                    setMaxPrice={setMaxRating}
                  />
                </div>
              </>
            ) : (
              ""
            )}
            {/* <div className="flex flex-col font-thin">
              <span>Required Players</span>
            </div> */}
          </div>
          <div
            onClick={handleGenerateCombination}
            className="px-2 cursor-pointer bg-fuchsia-600 rounded-sm w-auto self-center"
          >
            Generate
          </div>
        </div>
        <div
          ref={scrollRef}
          className="flex flex-wrap content-start justify-center gap-3 scrollbar-thin  scrollbar-thumb-fuchsia-400 scrollbar-track-slate-900  overflow-y-auto md:max-h-[80vh]"
        >
          {currentCombinations.map((combo, i) => {
            return <ListItem val={combo} index={i} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Combinations;

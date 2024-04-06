import React, { useMemo, useRef, useState } from "react";
import { fetchRatingsPrices, fetch_combinations } from "../api/apiService";
import DualRangeSlider from "./common/RangeSlider";
import { convertString, useScrollToBottom } from "./utils/utils";
import ShowPlayers from "./getCombinationComponents/showPlayers";
import { useDebounce } from "@uidotdev/usehooks";
import classNames from "classnames";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import CoinsImg from "../assets/coins.png";
import CostInfo from "./getCombinationComponents/costInfo";

const ListItem = ({ val, index, filterText, price, ratings_price }) => {
  const formattedResult = convertString(val);
  const [isShowPlayers, setIsShowPlayers] = useState(false);

  return (
    <div className="bg-slate-800 w-full md:w-[32%]  text-white p-4 pt-2 h-42 rounded-md flex flex-col gap-2 text-center">
      {isShowPlayers ? (
        <ShowPlayers
          tabs={formattedResult.map(([rating, count]) => [rating, count])}
        />
      ) : (
        <>
          <div className="flex justify-between">
            <p className="font-medium">Solution {index + 1}</p>
            <p className="flex gap-1 items-center">
              <img src={CoinsImg} className="w-3 h-3" />
              <span className="font-medium flex gap-1 items-center">
                {" "}
                {price}{" "}
                <CostInfo
                  ratings_price={ratings_price}
                  result={formattedResult}
                  price={price}
                />
              </span>
            </p>
          </div>
          <hr className="w-full " />
          <div className="grid grid-cols-3 gap-2">
            {formattedResult.map(([rating, count]) => {
              let isPresent = filterText
                .toLowerCase()
                .includes(`${rating}x${count}`.toLowerCase());
              return (
                <div
                  className={classNames(
                    " text-white font-bold py-3 rounded-md",
                    isPresent ? "bg-blue-500" : "bg-fuchsia-400"
                  )}
                >
                  {rating}x{count}
                </div>
              );
            })}
          </div>
        </>
      )}
      <div className="mt-auto flex justify-center text-sm ">
        <button
          onClick={() => setIsShowPlayers(!isShowPlayers)}
          className="bg-purple-500 flex text-white font-medium p-1 px-2 rounded-md mt-1"
        >
          {!isShowPlayers ? <> Show Players</> : <>Hide Players</>}
        </button>
      </div>
    </div>
  );
};

const Combinations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [currentCombinations, setCurrentCombinations] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [squadRating, setSquadRating] = useState(70);
  const [minRating, setMinRating] = useState(67);
  const [maxRating, setMaxRating] = useState(73);
  const [loadIndex, setLoadIndex] = useState(20); // New state to manage loaded items

  const handleScrollToBottom = () => {
    setLoadIndex((prevIndex) => prevIndex + 20);
  };
  const scrollRef = useScrollToBottom(handleScrollToBottom);
  const debouncedSearchTerm = useDebounce(filterText, 1000);
  const { data: ratings_price = {} } = useQuery({
    queryKey: ["fetchRatingsPrices"],
    queryFn: fetchRatingsPrices,

    staleTime: 1000 * 60,
  });
  const calculatePrice = (combo) => {
    let cost = 0;
    combo.forEach((rating) => {
      cost += ratings_price[rating];
    });
    return cost;
  };
  const handleGenerateCombination = async () => {
    let payload = {
      squad_rating: squadRating,
      available_ratings: Array.from(
        { length: maxRating - minRating + 1 },
        (_, index) => minRating + index
      ),
    };
    setIsLoading(true);
    const response = await fetch_combinations(payload);
    setIsLoading(false);
    let parsedResponse = JSON.parse(response);
    parsedResponse = parsedResponse.map((val) => {
      let price = calculatePrice(val);
      return { array: val, price: price };
    });
    setCurrentCombinations(parsedResponse);
    setFilterText("");
  };
  const requiredCounts = debouncedSearchTerm.split(",").reduce((acc, cur) => {
    const [num, count] = cur.split("x");
    let parsedCount = parseInt(count, 10);
    if (!isNaN(parsedCount)) {
      acc[num] = parsedCount;
    }
    return acc;
  }, {});

  function arrayMatchesCriteria(array, criteria) {
    const counts = array.reduce((acc, cur) => {
      acc[cur] = (acc[cur] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(criteria).every(
      ([num, count]) => counts[num] === count
    );
  }

  const filteredArrays = useMemo(() => {
    const results =
      Object.keys(requiredCounts).length === 0
        ? currentCombinations
        : currentCombinations.filter(({ array }) =>
            arrayMatchesCriteria(array, requiredCounts)
          );
    return results.slice(0, loadIndex); // Only load up to loadIndex items
  }, [requiredCounts, loadIndex, currentCombinations]);

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content={`Find the perfect combination for your sbcs squad rating.`}
        />
      </Helmet>
      <div className="w-4/5 mx-auto mt-4">
        {/* Heading Section */}
        <div className="text-white text-left mb-5">
          <p className="text-2xl font-bold">Ultimate Squad Rating Combinator</p>
          <p className="text-lg font-thin">Tailor Your Perfect Combination</p>
        </div>
        <div className="flex flex-col md:grid  md:grid-cols-[1fr_4fr] gap-5">
          <div className="text-white justify-between md:h-[75vh] bg-slate-900 rounded-lg px-4 py-6 flex flex-col">
            <div className="flex flex-col">
              {" "}
              <div className="grid grid-rows-[1fr_1fr]">
                <div className="font-medium mb-5">Squad Rating</div>
                <div className="relative">
                  <input
                    className="w-full accent-fuchsia-400  rounded-md pl-2"
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
                  <div className="flex flex-col font-medium">
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
          <div className="flex flex-col h-full md:max-h-[75vh]">
            {isLoading ? (
              <div className="animate-pulse flex flex-col gap-5 h-full">
                <div className="md:pr-6">
                  {" "}
                  <div className=" w-full bg-slate-300 h-10 rounded-md "></div>
                </div>
                <div className=" h-full w-full flex flex-wrap gap-3  content-start">
                  {Array.from({ length: 9 }, (_, index) => index).map((i) => {
                    return (
                      <div className="w-full md:w-[32%] h-36 bg-slate-300">
                        <div></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <>
                <div className="mb-2">
                  {!isValid && (
                    <p className="text-red-500 text-sm -mt-6 mb-1 pl-2 ">
                      Please enter in the format {`{Rating}x{Count}`}, e.g:
                      84x4,87x6
                    </p>
                  )}
                  <input
                    value={filterText}
                    onChange={(e) => {
                      let value = e.target.value;
                      setFilterText(e.target.value);
                      const isValidFormat = /^(\d+x\d+,)*\d+x\d+$/;
                      setIsValid(isValidFormat.test(value) || value === "");
                    }}
                    placeholder="Required Players : 84x4,87x6"
                    className={classNames(
                      "w-full text-white mb-2 bg-slate-800 mx-1 rounded-lg py-2 px-4",
                      !isValid ? "border-2 border-red-500" : ""
                    )}
                  />
                </div>
                {filteredArrays.length ? (
                  <div
                    ref={scrollRef}
                    className="flex flex-wrap content-start  gap-3 scrollbar-thin  scrollbar-thumb-fuchsia-400 scrollbar-track-slate-900  overflow-y-auto h-full"
                  >
                    {filteredArrays
                      .sort((a, b) => a.price - b.price)
                      .map(({ array, price }, i) => {
                        return (
                          <ListItem
                            filterText={debouncedSearchTerm}
                            val={array}
                            index={i}
                            price={price}
                            ratings_price={ratings_price}
                          />
                        );
                      })}
                  </div>
                ) : (
                  <div className="bg-slate-900 h-full rounded-lg">
                    <p className="text-2xl text-white text-center mt-10">
                      {" "}
                      {filterText.length > 0
                        ? " No Solution Present"
                        : "Click Generate to show squad combinations"}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Combinations;

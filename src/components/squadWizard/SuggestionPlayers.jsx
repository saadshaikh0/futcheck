import React, { useState, useEffect } from "react";
import PlayerCard from "../common/PlayerCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPlayerSuggestions } from "../../api/apiService";
import { useDebounce } from "@uidotdev/usehooks";
import { useSelector } from "react-redux";
import { getFormationPositions } from "../utils/formations";
import { ChemistryPoints } from "../PlayerViewCards/StatsCard";
import { formatNumber, getChemistryPoints } from "./squadUtils";
import { convertFormation } from "../utils/utils";
import { useInView } from "react-intersection-observer";
import DynamicRangeSlider from "./DynamicRangeSlider"; // Import the custom slider component
import SuggestionCard from "./SuggestionCard";
import { useHandleResize } from "../utils/hooks";

const SuggestionPlayers = ({ handlePlayerSelect }) => {
  const [budgetInput, setBudgetInput] = useState(50000);
  const [focus, setFocus] = useState(0); // State for slider value
  const debouncedBudget = useDebounce(budgetInput, 1000) || 0;
  const debouncedFocus = useDebounce(focus, 1000) || 0;
  const players = useSelector((state) => state.squadWizard.players);
  const chemistry = useSelector((state) => state.squadWizard.chemistry);
  const [isEditing, setIsEditing] = useState(false);

  const handleBudgetChange = (event) => {
    setBudgetInput(Number(event.target.value));
  };

  const handleSliderChange = (event) => {
    setFocus(Number(event.target.value));
  };

  const formation = useSelector((state) => state.squadWizard.formation);
  const squadPositions = getFormationPositions(formation) || [];
  const selectedPositionIndex = useSelector(
    (state) => state.squadWizard.selectedPositionIndex
  );
  const selectedPositionValue =
    squadPositions[selectedPositionIndex]?.position || "ST";

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "fetchPlayerSuggestions",
      debouncedBudget,
      debouncedFocus,
      selectedPositionIndex,
      players,
      formation,
      chemistry.totalChemistry,
    ],
    queryFn: ({ pageParam = 1 }) =>
      fetchPlayerSuggestions(
        debouncedBudget || 10000,
        chemistry.totalChemistry || 0,
        selectedPositionIndex,
        players,
        formation,
        debouncedFocus,
        pageParam
      ),
    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage;
      if (page < total_pages) {
        return page + 1;
      } else {
        return undefined;
      }
    },
    enabled: !!selectedPositionValue,
  });

  const handleBlur = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);
  const isMobile = useHandleResize();
  return (
    <div className="w-full overflow-auto flex flex-col">
      <div className="mb-4 px-4 w-full">
        <div className="flex justify-between text-white mb-2">
          <span>Chemistry</span>
          <span>Quality</span>
        </div>
        <input
          type="range"
          min="-1"
          max="1"
          step="0.1"
          value={focus}
          onChange={handleSliderChange}
          className="w-full"
        />
      </div>
      <div className="mb-4 px-4 w-full">
        <label className="flex gap-2 text-white mb-2">
          Budget:{" "}
          {isEditing ? (
            <input
              type="number"
              value={parseInt(budgetInput)}
              onChange={handleBudgetChange}
              onBlur={handleBlur}
              min={0}
              max={15000000}
              className="w-full bg-transparent text-white mb-2 text-black"
              autoFocus
            />
          ) : (
            <span
              onClick={() => setIsEditing(true)}
              className="w-full bg-transparent text-white mb-2 cursor-pointer"
            >
              {formatNumber(parseInt(budgetInput))}
            </span>
          )}
        </label>
        <DynamicRangeSlider
          value={budgetInput}
          onChange={handleBudgetChange}
          max={15000000}
        />
      </div>
      {error && <p>Error loading suggestions: {error.message}</p>}
      <div
        className={`${
          isMobile ? "flex overflow-x-auto" : "grid grid-cols-1"
        }  overflow-auto scrollbar-none  gap-2 w-full`}
      >
        {isLoading ? (
          <p className=" text-center w-full">Loading suggested players...</p>
        ) : (
          <>
            {data?.pages.map((page, pageIndex) => (
              <React.Fragment key={pageIndex}>
                {page.suggestions.map((player, playerIndex) => {
                  const isLastPlayer =
                    pageIndex === data.pages.length - 1 &&
                    playerIndex === page.suggestions.length - 1;
                  return (
                    <div ref={isLastPlayer ? ref : null}>
                      <SuggestionCard
                        player={player}
                        handlePlayerSelect={handlePlayerSelect}
                        points={getChemistryPoints(
                          player,
                          selectedPositionIndex,
                          players,
                          squadPositions
                        )}
                      />
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
            {isFetchingNextPage && <p>Loading more players...</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default SuggestionPlayers;

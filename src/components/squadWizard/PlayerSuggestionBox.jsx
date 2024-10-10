// PlayerSuggestionBox.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlayerAtPosition } from "../../redux/squadWizardSlice";
import AllPlayers from "./AllPlayers";
import SuggestionPlayers from "./SuggestionPlayers";

const PlayerSuggestionBox = () => {
  const [activeTab, setActiveTab] = useState("all");
  const dispatch = useDispatch();
  const selectedPositionIndex = useSelector(
    (state) => state.squadWizard.selectedPositionIndex
  );

  const handlePlayerSelect = (player) => {
    if (selectedPositionIndex !== null) {
      dispatch(setPlayerAtPosition({ index: selectedPositionIndex, player }));
    }
  };

  return (
    <div className="flex max-h-full flex-col items-center  bg-charcoal rounded-lg shadow-lg">
      {/* Tabs */}
      <div className="tabs w-full flex mb-4">
        <button
          className={`tab flex-1 py-2 px-4 text-center ${
            activeTab === "all"
              ? "bg-white text-black"
              : "bg-gray-600 text-gray-300"
          }`}
          onClick={() => setActiveTab("all")}
        >
          All Players
        </button>
        <button
          className={`tab flex-1 py-2 px-4 text-center ${
            activeTab === "suggestions"
              ? "bg-white text-black"
              : "bg-gray-600 text-gray-300"
          }`}
          onClick={() => setActiveTab("suggestions")}
        >
          Suggestions
        </button>
      </div>
      <div className=" overflow-auto flex w-full  h-full">
        {activeTab === "all" && (
          <AllPlayers handlePlayerSelect={handlePlayerSelect} />
        )}

        {activeTab === "suggestions" && (
          <SuggestionPlayers handlePlayerSelect={handlePlayerSelect} />
        )}
      </div>
    </div>
  );
};

export default PlayerSuggestionBox;

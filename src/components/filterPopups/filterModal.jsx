import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import MobileVersionPopup from "./mobileFilterPopups/versionPopup";
import MobileRatingPopup from "./mobileFilterPopups/ratingPopup";
import MobileNationPopup from "./mobileFilterPopups/nationPopup";
import MobileLeaguePopup from "./mobileFilterPopups/leaguePopup";
import MobileTeamPopup from "./mobileFilterPopups/teamPopup";
import MobileSkillMovesPopup from "./mobileFilterPopups/skillMovesPopup";
import MobileWeakFootPopup from "./mobileFilterPopups/weakfootPopup";
import MobileWorkRatePopup from "./mobileFilterPopups/workRatePopup";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/allPlayerSlice";

const tabs = [
  { name: "Version", component: <MobileVersionPopup /> },
  { name: "Rating", component: <MobileRatingPopup /> },
  { name: "Nation", component: <MobileNationPopup /> },
  { name: "League", component: <MobileLeaguePopup /> },
  { name: "Team", component: <MobileTeamPopup /> },
  //   { name: "Playstyles", component: <PlaystylePopup /> },
  { name: "Skill Moves", component: <MobileSkillMovesPopup /> },
  { name: "Weak Foot", component: <MobileWeakFootPopup /> },
  { name: null, component: <MobileWorkRatePopup /> },
];

const FilterModal = ({ isModalOpen, setIsModalOpen }) => {
  const dispatch = useDispatch();
  const globalFilters = useSelector((state) => state.allPlayers.filters);

  const [filters, setMobileFilters] = useState({
    rarity: null,
    min_rating: null,
    max_rating: null,
    nation: null,
    leagueid: null,
    teamid: null,
    skillMoves: null,
    weakFoot: null,
    workRate: null,
  });

  useEffect(() => {
    setMobileFilters(globalFilters);
  }, [globalFilters]);
  // Update filters function
  const updateFilters = (filterName, value) => {
    setMobileFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  return (
    <Dialog
      className={
        "fixed top-[20%] left-1/2 -translate-x-1/2 bg-white w-[90%] mx-auto rounded"
      }
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    >
      <Dialog.Panel className={"flex flex-col"}>
        <div className="bg-slate-900 text-white">
          <div className="flex justify-between items-center p-2 px-4">
            <div className="text-xl text-white">Player Filters</div>
            <button
              type="button"
              class="button"
              aria-label="Close"
              data-close-modal=""
            >
              <XMarkIcon className="h-8 w-8 text-white font-bold" />
            </button>
          </div>
          <div>
            <div className="text-white h-[50vh] overflow-y-auto flex flex-col gap-3 bg-slate-800  mt-2 px-4 py-2 rounded">
              {tabs.map((tab) => {
                return (
                  <div>
                    {tab.name ? (
                      <span className="text-white pl-1">{tab.name}</span>
                    ) : (
                      ""
                    )}
                    {React.cloneElement(tab.component, {
                      filter: filters,
                      updateFilter: updateFilters,
                    })}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-2 my-2 gap-2">
            <button
              onClick={() => dispatch(setFilters(filters))}
              className="bg-fuchsia-400 text-white py-2"
            >
              Apply Filter
            </button>
            <button>Clear Filter</button>
          </div>
        </div>{" "}
      </Dialog.Panel>
    </Dialog>
  );
};
export default FilterModal;

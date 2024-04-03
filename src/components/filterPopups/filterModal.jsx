import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { ArrowPathIcon, XMarkIcon } from "@heroicons/react/20/solid";
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
  { name: "Version", value: "rarity", component: <MobileVersionPopup /> },
  {
    name: "Rating",
    value: ["min_rating", "max_rating"],
    component: <MobileRatingPopup />,
  },
  { name: "Nation", value: "nation", component: <MobileNationPopup /> },
  { name: "League", value: "leagueid", component: <MobileLeaguePopup /> },
  { name: "Team", value: "teamid", component: <MobileTeamPopup /> },
  //   { name: "Playstyles", component: <PlaystylePopup /> },
  {
    name: "Skill Moves",
    value: "skill_moves",
    component: <MobileSkillMovesPopup />,
  },
  { name: "Weak Foot", value: "weak_foot", component: <MobileWeakFootPopup /> },
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
        "fixed top-[20%] left-1/2 -translate-x-1/2 bg-white w-[90%] mx-auto rounded z-20"
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
              onClick={() => setIsModalOpen(false)}
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
                      <div className="flex gap-3 items-center">
                        <span className="text-white pl-1">{tab.name}</span>
                        <div
                          onClick={() => {
                            let tempFilters = { ...filters };
                            if (typeof tab.value == "object") {
                              tab.value.forEach(
                                (val) => (tempFilters[val] = null)
                              );
                            } else {
                              tempFilters[tab.value] = null;
                            }
                            setMobileFilters({ ...tempFilters });
                          }}
                        >
                          <ArrowPathIcon className="w-4 h-4 text-red-600" />
                        </div>
                      </div>
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
              onClick={() => {
                setIsModalOpen(false);
                dispatch(setFilters(filters));
              }}
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

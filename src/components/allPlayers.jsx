import React, { useEffect, useState } from "react";
import { fetchAllPlayers } from "../api/apiService";
import { useQuery } from "@tanstack/react-query";
import PlayerCard from "./common/PlayerCard";
import LeaguePopup from "./filterPopups/leaguePopup";
import NationPopup from "./filterPopups/nationPopup";
import PlaystylePopup from "./filterPopups/playstylePopup";
import RatingPopup from "./filterPopups/ratingPopup";
import SkillMovesPopup from "./filterPopups/skillMovesPopup";
import TeamPopup from "./filterPopups/teamPopup";
import VersionPopup from "./filterPopups/versionPopup";
import WorkRatePopup from "./filterPopups/workRatePopup";
import WeakFootPopup from "./filterPopups/weakfootPopup";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../redux/allPlayerSlice";
import { FILTER_TEXT, WORK_RATE } from "./utils/constants";
import FilterModal from "./filterPopups/filterModal";
const tabs = [
  { name: "Version", component: <VersionPopup /> },
  { name: "Rating", component: <RatingPopup /> },
  { name: "Nation", component: <NationPopup /> },
  { name: "League", component: <LeaguePopup /> },
  { name: "Team", component: <TeamPopup /> },
  //   { name: "Playstyles", component: <PlaystylePopup /> },
  { name: "Skill Moves", component: <SkillMovesPopup /> },
  { name: "Weak Foot", component: <WeakFootPopup /> },
  { name: "Work Rate", component: <WorkRatePopup /> },
];

const AllPlayers = () => {
  const filters = useSelector((state) => state.allPlayers.filters);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const {
    data: players = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["fetchAllPlayers", filters],
    queryFn: () => fetchAllPlayers(filters),
    enabled: false,
  });

  const clearFilters = () => {
    dispatch(setFilters({ page: 1 }));
  };
  const filteredObject = Object.entries(filters).filter(
    ([key, value]) => !(["max_rating", "page"].includes(key) || !value)
  );
  useEffect(() => {
    refetch();
  }, [filters]);
  const getValues = (key, value) => {
    if (key == "page") {
      return value;
    } else if (["teamid", "leagueid", "nation", "rarity"].includes(key)) {
      return value.name;
    } else if (["skill_moves", "weak_foot"].includes(key)) {
      return `${value} ★`;
    } else if (["awr", "dwr"].includes(key)) {
      return WORK_RATE[value];
    } else if (key == "min_rating") {
      return `${value} - ${filters.max_rating}`;
    }
  };
  return (
    <div className="relative w-full md:w-4/5 mx-auto mt-10 px-5">
      <div>
        <h2 className="text-white text-xl  md:text-3xl font-medium">
          EAFC 24 Players Database
        </h2>
        <p className="text-slate-400 text-md md:text-lg">
          Browse through eafc 24 players catalog and filter by rating , position
          , team etc
        </p>
      </div>
      <div className="flex flex-col md:grid grid-cols-[1fr_5fr]">
        {filteredObject.length ? (
          <>
            {" "}
            <div>
              <div className="flex gap-2 justify-between mt-2">
                <button
                  onClick={clearFilters}
                  className="bg-slate-800 text-white p-2 px-3 rounded"
                >
                  Clear Filters
                </button>
              </div>
            </div>
            <div className="flex items-center ">
              {filteredObject.map(([key, value]) => {
                return (
                  <div className="text-white">
                    <div class="flex justify-center items-center m-1 px-2 py-1 rounded-sm bg-fuchsia-400 text-base text-white font-medium">
                      <div class="flex-initial max-w-full leading-none text-xs font-normal">
                        {FILTER_TEXT[key]}: {getValues(key, value)}
                      </div>
                      <span
                        onClick={() => {
                          if (key == "min_rating") {
                            dispatch(
                              setFilters({
                                ...filters,
                                min_rating: undefined,
                                max_rating: undefined,
                              })
                            );
                          } else {
                            dispatch(
                              setFilters({ ...filters, [key]: undefined })
                            );
                          }
                        }}
                      >
                        {" "}
                        <i class="fa fa-times ml-2 cursor-pointer"></i>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <></>
        )}

        <div className="hidden md:block">
          <div className="text-white h-full flex flex-col gap-3 bg-slate-800  mt-2 px-4 py-2 rounded">
            {tabs.map((tab) => {
              return (
                <div>
                  <span className="text-white pl-1">{tab.name}</span>
                  <span>{tab.component}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="md:mx-10 grid grid-cols-3 lg:grid-cols-6 gap-1 md:gap-4">
            {players.map((player) => (
              <PlayerCard player={player} />
            ))}
          </div>
        </div>
        <div></div>
        <div className="flex justify-center gap-4 mt-5">
          <button
            onClick={() => {
              let currentPage = filters?.page ?? 1;

              dispatch(
                setFilters({ ...filters, page: Math.max(currentPage - 1, 1) })
              );
            }}
            className="bg-fuchsia-400 text-white px-4 py-2 rounded-md"
          >
            Previous
          </button>
          <button
            onClick={() => {
              let currentPage = filters?.page ?? 1;
              dispatch(setFilters({ ...filters, page: currentPage + 1 }));
            }}
            className="bg-fuchsia-400 text-white px-4 py-2 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
      {/* FAB visible only on smaller screens */}
      <button
        className="fixed bottom-4 right-4 md:hidden z-50 bg-fuchsia-500 p-4 rounded shadow-lg"
        onClick={() => setModalOpen(true)}
      >
        Filter
      </button>
      <FilterModal isModalOpen={modalOpen} setIsModalOpen={setModalOpen} />
    </div>
  );
};
export default AllPlayers;

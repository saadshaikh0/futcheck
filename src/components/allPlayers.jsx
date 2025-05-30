// AllPlayers.jsx

import React, { useEffect, useRef, useState } from "react";
import { fetchAllPlayers } from "../api/apiService";
import { useQuery } from "@tanstack/react-query";
import PlayerCard from "./common/PlayerCard";
import CoinsImg from "../assets/coins.png";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, setIsClub } from "../redux/allPlayerSlice";
import { FILTER_TEXT, WORK_RATE } from "./utils/constants";
import FilterModal from "./filterPopups/filterModal";
import { useHandleResize } from "./utils/hooks";
import FilterTabs from "./filterPopups/FilterTabs";
import InfinitePlayerList from "./common/InfinitePlayerList";
import FUTCHECK_LOGO from "../assets/football logo 5.png";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { useDebounce } from "@uidotdev/usehooks";
import { Link } from "react-router-dom";

const AllPlayers = ({ isHome = false }) => {
  const filters = useSelector((state) => state.allPlayers.filters);
  const isClub = useSelector((state) => state.allPlayers.isClub);
  const userInfo = useSelector((state) => state.app.userInfo);
  const [searchText, setSearchText] = useState("");

  const isMobile = useHandleResize();
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const prevFiltersRef = useRef(filters);
  const [allPlayers, setAllPlayers] = useState([]);
  const debouncedSearchTerm = useDebounce(searchText, 400);

  const {
    data = { players: [], total_pages: 0 },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["fetchAllPlayers", filters, isClub],
    queryFn: () => fetchAllPlayers(filters, isClub),
    enabled: false,
  });

  const clearFilters = () => {
    dispatch(setFilters({ page: 1 }));
    setAllPlayers([]);
    setSearchText("");
  };
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchText(val);
  };

  useEffect(() => {
    const val = debouncedSearchTerm.toLocaleLowerCase();
    if (!val) {
      // If search is empty, reset filters completely
      clearFilters();
    } else {
      // Clear all filters and only pass 'name'
      dispatch(setFilters({ page: 1, name: val }));
      setAllPlayers([]);
    }
  }, [debouncedSearchTerm]);

  const filteredObject = Object.entries(filters).filter(
    ([key, value]) =>
      !(
        ["max_rating", "page"].includes(key) ||
        value == null ||
        value == undefined
      )
  );

  useEffect(() => {
    if (!isLoading && data.players.length) {
      setAllPlayers((prevPlayers) => {
        const existingPlayerIds = new Set(prevPlayers.map((p) => p.id));
        const newPlayers = data.players.filter(
          (player) => !existingPlayerIds.has(player.id)
        );
        return [...prevPlayers, ...newPlayers];
      });
    }
  }, [data.players]);

  useEffect(() => {
    const prevFilters = prevFiltersRef.current;

    const hasFilterChanged = Object.keys(filters).some((key) => {
      return key !== "page" && filters[key] !== prevFilters[key];
    });

    if (hasFilterChanged) {
      setAllPlayers([]);
    }

    prevFiltersRef.current = filters;
  }, [filters]);

  useEffect(() => {
    refetch();
  }, [filters, isClub]);

  useEffect(() => {
    return () => {
      clearFilters();
    };
  }, []);

  const currentPage = filters?.page ?? 1;
  const hasMore = currentPage < data.total_pages;

  const onLoadMore = () => {
    if (!isLoading && hasMore) {
      dispatch(setFilters({ ...filters, page: currentPage + 1 }));
    }
  };

  const getValues = (key, value) => {
    if (key === "page") {
      return value;
    } else if (["teamid", "leagueid", "nation", "rarity"].includes(key)) {
      return value.name;
    } else if (["skill_moves", "weak_foot"].includes(key)) {
      return `${value} ★`;
    } else if (["awr", "dwr"].includes(key)) {
      return WORK_RATE[value];
    } else if (key === "min_rating") {
      return `${value} - ${filters.max_rating}`;
    } else {
      return value;
    }
  };

  const renderPlayerCard = (player) => (
    <div
      style={{
        background:
          "linear-gradient(180deg, rgba(34, 14, 63, 0.7) 0%, rgba(66, 19, 136, 0.72) 100%)",
      }}
      className="h-full rounded-lg transform transition-transform duration-100 hover:scale-105"
    >
      <PlayerCard
        isDisabled={false}
        isMini={isMobile ? false : false}
        isAllPlayers={isMobile ? false : true}
        player={player}
      />
      <div className="flex justify-center text-white font-bold gap-1 items-center">
        <img src={CoinsImg} className="w-3 h-3" alt="coins" />
        {player?.latest_price?.toLocaleString("en-us")}
      </div>
    </div>
  );

  return (
    <div
      style={{
        background:
          "linear-gradient(0.41deg, rgba(0, 0, 0, 0.85) 4.22%, rgba(49, 10, 82, 0.58) 93.61%)",
      }}
      className="relative"
    >
      <div className="flex justify-center mt-16 md:mt-0 lg:pb-12">
        <Link className="block md:hidden" to={"/"}>
          <div className="text-white items-center absolute font-bold left-3 text-xl top-3 flex gap-2">
            <ArrowLeftIcon className="w-8 h-8" /> BACK
          </div>
        </Link>
        <div className="flex items-center flex-col">
          <div className="hidden md:block relative lg:w-[12vw] h-[12vh]">
            <img
              src={FUTCHECK_LOGO}
              alt="futcheck logo"
              className="absolute top-0 left-0  lg:w-[15vw] h-[15vh]"
            />
          </div>
          <div className="grow w-[90vw]  md:w-[60vw] relative">
            <div className="relative grow mr-3 md:mr-0">
              <MagnifyingGlassIcon className="absolute w-4 top-0 lg:w-10 h-10 lg:top-2.5 left-3 text-gray-400" />
              <input
                autoComplete="off"
                style={{
                  background: "rgba(114, 112, 112, 0.55)",
                  borderRadius: "33px",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  border: "none",
                  outline: "none",
                }}
                type={"text"}
                id="hs-inline-leading-pricing-select-label"
                name="inline-add-on"
                className="py-2 px-4 ps-16 pe-20 h-[40px] lg:h-[60px] font-medium block w-full shadow-sm rounded-lg text-lg lg:text-2xl focus:z-10 disabled:opacity-50 focus:border-none disabled:pointer-events-none text-gray-400 focus:ring-gray-600"
                placeholder="Search Players..."
                value={searchText}
                onChange={handleSearchChange}
              />
              <button
                className="text-xs lg:text-sm absolute flex items-center gap-2 right-0 bg-[#2E1843] w-[20vw]  md:w-[5vw] top-0 h-[40px] lg:h-[60px] text-white text-opacity-70 px-3 py-1 rounded-lg"
                style={{
                  borderRadius: "33px",
                }}
              >
                EAFC 25
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full md:w-4/5 flex flex-col mx-auto mt-5 md:mt-0 px-5 h-[calc(90vh)] md:h-[calc(100vh-4rem)]">
        {/* Filters */}
        {filteredObject.length ? (
          <div className="flex items-center">
            <button
              onClick={clearFilters}
              className="bg-slate-800 w-full md:w-auto my-3 md:my-0 text-white p-2 px-3 rounded"
            >
              Clear Filters
            </button>
            {filteredObject.map(([key, value]) => (
              <div key={key} className="text-white ml-2">
                <div className="flex justify-center items-center m-1 px-2 py-1 rounded-sm bg-fuchsia-400 text-base text-white font-medium">
                  <div className="flex-initial max-w-full leading-none text-xs font-normal">
                    {FILTER_TEXT[key]}: {getValues(key, value)}
                  </div>
                  <span
                    onClick={() => {
                      if (key === "min_rating") {
                        dispatch(
                          setFilters({
                            ...filters,
                            min_rating: undefined,
                            max_rating: undefined,
                            page: 1,
                          })
                        );
                      } else {
                        dispatch(
                          setFilters({
                            ...filters,
                            [key]: undefined,
                            page: 1,
                          })
                        );
                      }
                    }}
                  >
                    <i className="fa fa-times ml-2 cursor-pointer"></i>
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {/* Main Content */}
        <div className="flex flex-col overflow-auto md:grid grid-cols-[1fr_5fr] h-full">
          {/* Filter Tabs (Hidden on Mobile) */}
          <div className="hidden md:block">
            <FilterTabs isMobile={false} />
          </div>

          {/* Infinite Player List */}
          <InfinitePlayerList
            players={allPlayers}
            renderPlayerCard={renderPlayerCard}
            onLoadMore={onLoadMore}
            hasMore={hasMore}
            isLoading={isLoading}
            containerClassName="md:ml-4 rounded-lg pb-2 overflow-auto"
            loadingComponent={
              isLoading ? (
                <div className="flex justify-center my-4">
                  <div className="loader">Loading...</div>
                </div>
              ) : null
            }
            noMoreDataComponent={
              !hasMore ? (
                <div className="text-center text-white my-4">
                  No more players to load.
                </div>
              ) : null
            }
          />
        </div>

        {/* Filter Modal (For Mobile) */}
        {modalOpen ? null : (
          <button
            className="hidden fixed bottom-4 right-4 md:hidden z-50 bg-fuchsia-500 p-4 rounded shadow-lg"
            onClick={() => setModalOpen(true)}
          >
            Filter
          </button>
        )}
        <FilterModal
          setAllPlayers={setAllPlayers}
          isModalOpen={modalOpen}
          setIsModalOpen={setModalOpen}
        />
        {modalOpen ? (
          <div className="bg-black z-10 opacity-50 absolute top-0 left-0 h-full w-full"></div>
        ) : null}
      </div>
    </div>
  );
};

export default AllPlayers;

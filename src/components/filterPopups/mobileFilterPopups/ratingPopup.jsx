import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { setTempFilters } from "../../../redux/allPlayerSlice";

const MobileRatingPopup = () => {
  const { tempFilters: filters } = useSelector((state) => state.allPlayers);
  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-[2fr_2fr] gap-2 mt-1">
      <input
        className="bg-slate-700 h-8 text-white rounded-lg px-2"
        type="number"
        min={30}
        max={filters?.max_rating - 1}
        value={filters?.min_rating ?? 30}
        placeholder="30"
        onChange={(e) => {
          dispatch(
            setTempFilters({
              ...filters,
              min_rating: e.target.value,
              page: 1,
            })
          );
        }}
      />
      <input
        className="bg-slate-700 h-8 text-white rounded-lg px-2"
        type="number"
        min={30}
        max={99}
        value={filters?.max_rating ?? 99}
        placeholder="99"
        onChange={(e) => {
          dispatch(
            setTempFilters({
              ...filters,
              max_rating: e.target.value,
              page: 1,
            })
          );
        }}
      />
    </div>
  );
};

export default MobileRatingPopup;

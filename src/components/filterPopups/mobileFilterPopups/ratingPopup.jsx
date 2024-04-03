import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/20/solid";

const MobileRatingPopup = ({ filter, updateFilter }) => {
  return (
    <div className="grid grid-cols-[2fr_2fr] gap-2 mt-1">
      <input
        className="bg-slate-700 h-8 text-white rounded-lg px-2"
        type="number"
        min={30}
        max={filter?.max_rating - 1}
        value={filter?.min_rating ?? 30}
        placeholder="30"
        onChange={(e) => {
          updateFilter("min_rating", e.target.value);
        }}
      />
      <input
        className="bg-slate-700 h-8 text-white rounded-lg px-2"
        type="number"
        min={30}
        max={99}
        value={filter?.max_rating ?? 99}
        placeholder="99"
        onChange={(e) => {
          updateFilter("max_rating", e.target.value);
        }}
      />
    </div>
  );
};

export default MobileRatingPopup;

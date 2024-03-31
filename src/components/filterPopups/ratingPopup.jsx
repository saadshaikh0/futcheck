import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/allPlayerSlice";
import { useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/20/solid";

const RatingPopup = () => {
  const [minRating, setMinRating] = useState(30);
  const [maxRating, setMaxRating] = useState(99);
  const { filters } = useSelector((state) => state.allPlayers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (filters.max_rating !== maxRating) {
      setMaxRating(filters.max_rating ?? 99);
    }
    if (filters.min_rating !== minRating) {
      setMinRating(filters.min_rating ?? 30);
    }
  }, [filters.min_rating, filters.max_rating]);

  return (
    <div className="grid grid-cols-[2fr_2fr_1fr] gap-2 mt-1">
      <input
        className="bg-slate-700 text-white rounded-lg px-2"
        type="number"
        min={30}
        max={maxRating - 1}
        value={minRating}
        placeholder="30"
        onChange={(e) => {
          setMinRating(e.target.value);
        }}
      />
      <input
        className="bg-slate-700 text-white rounded-lg px-2"
        type="number"
        min={30}
        max={99}
        value={maxRating}
        placeholder="99"
        onChange={(e) => {
          setMaxRating(e.target.value);
        }}
      />
      <button
        onClick={() =>
          dispatch(
            setFilters({
              ...filters,
              min_rating: minRating,
              max_rating: maxRating,
              page: 1,
            })
          )
        }
      >
        <CheckIcon />
      </button>
    </div>
  );
};

export default RatingPopup;

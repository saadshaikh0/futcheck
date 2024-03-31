import classNames from "classnames";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/allPlayerSlice";

const WorkRatePopup = () => {
  const { filters } = useSelector((state) => state.allPlayers);
  const dispatch = useDispatch();
  return (
    <div className="w-full mt-2">
      <p className="text-center text-sm ">Defensive WR</p>
      <div className="flex text-white mt-2">
        <button
          onClick={() => {
            dispatch(setFilters({ ...filters, dwr: 0, page: 1 }));
          }}
          className={classNames(
            "px-3 py-2",
            filters.dwr == 0 ? "bg-fuchsia-400" : "bg-slate-900"
          )}
        >
          Low
        </button>
        <button
          onClick={() => {
            dispatch(setFilters({ ...filters, dwr: 1, page: 1 }));
          }}
          className={classNames(
            "px-3 py-2",
            filters.dwr == 1 ? "bg-fuchsia-400" : "bg-slate-900"
          )}
        >
          Medium
        </button>
        <button
          onClick={() => {
            dispatch(setFilters({ ...filters, dwr: 2, page: 1 }));
          }}
          className={classNames(
            "px-3 py-2",
            filters.dwr == 2 ? "bg-fuchsia-400" : "bg-slate-900"
          )}
        >
          High
        </button>
      </div>
      <p className="text-center text-sm mt-2">Attacking WR</p>
      <div className="flex text-white mt-2">
        <button
          onClick={() => {
            dispatch(setFilters({ ...filters, awr: 0, page: 1 }));
          }}
          className={classNames(
            "px-3 py-2",
            filters?.awr == 0 ? "bg-fuchsia-400" : "bg-slate-900"
          )}
        >
          Low
        </button>
        <button
          onClick={() => {
            dispatch(setFilters({ ...filters, awr: 1, page: 1 }));
          }}
          className={classNames(
            "px-3 py-2",
            filters?.awr == 1 ? "bg-fuchsia-400" : "bg-slate-900"
          )}
        >
          Medium
        </button>
        <button
          onClick={() => {
            dispatch(setFilters({ ...filters, awr: 2, page: 1 }));
          }}
          className={classNames(
            "px-3 py-2",
            filters?.awr == 2 ? "bg-fuchsia-400" : "bg-slate-900"
          )}
        >
          High
        </button>
      </div>
    </div>
  );
};

export default WorkRatePopup;

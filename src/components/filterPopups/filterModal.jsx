// FilterModal.jsx

import React from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import {
  applyTempFilters,
  clearTempFilters,
  setFilters,
} from "../../redux/allPlayerSlice";
import FilterTabs from "./FilterTabs";

const FilterModal = ({ isModalOpen, setIsModalOpen, setAllPlayers }) => {
  const dispatch = useDispatch();

  return (
    <Dialog
      className="fixed top-[20%] left-1/2 -translate-x-1/2 bg-white w-[90%] mx-auto rounded z-20"
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    >
      <Dialog.Panel className="flex flex-col">
        <div className="bg-slate-900 text-white">
          <div className="flex justify-between items-center p-2 px-4">
            <div className="text-xl text-white">Player Filters</div>
            <button
              type="button"
              className="button"
              aria-label="Close"
              data-close-modal=""
              onClick={() => setIsModalOpen(false)}
            >
              <XMarkIcon className="h-8 w-8 text-white font-bold" />
            </button>
          </div>
          <div className="text-white h-[50vh] overflow-y-auto flex flex-col gap-3 bg-slate-800 mt-2 px-4 py-2 rounded">
            <FilterTabs isMobile={true} />
          </div>
          <div className="grid grid-cols-2 my-2 gap-2">
            <button
              onClick={() => {
                setIsModalOpen(false);
                dispatch(applyTempFilters());
              }}
              className="bg-fuchsia-400 text-white py-2"
            >
              Apply Filter
            </button>
            <button
              onClick={() => {
                setAllPlayers([]);
                setIsModalOpen(false);
                dispatch(setFilters({ page: 1 }));
                dispatch(clearTempFilters());
              }}
              className="bg-gray-400 text-white py-2"
            >
              Clear Filter
            </button>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default FilterModal;

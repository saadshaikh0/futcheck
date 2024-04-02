import { Popover } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import React from "react";
import { Link } from "react-router-dom";
const MobileMenuPopover = () => {
  return (
    <div className="bg-slate-950 flex flex-col gap-4 p-5 px-8 w-[100vw] text-white">
      <Link to="/players">
        {" "}
        <p className="text-md font-bold">Players</p>
      </Link>
      <Link to="/fc_combinations/">
        <div className="text-white flex gap-1 items-center  font-bold">
          Rating <MagnifyingGlassIcon className="w-4 h-4 text-white" />
        </div>
      </Link>
    </div>
  );
};
export default MobileMenuPopover;

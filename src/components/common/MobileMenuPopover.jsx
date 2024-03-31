import { Popover } from "@headlessui/react";
import React from "react";
import { Link } from "react-router-dom";
const MobileMenuPopover = () => {
  return (
    <div className="bg-slate-950 flex flex-col p-5 px-8 w-[100vw] text-white">
      <Link to="/players">
        {" "}
        <p className="text-md font-bold">Players</p>
      </Link>
    </div>
  );
};
export default MobileMenuPopover;

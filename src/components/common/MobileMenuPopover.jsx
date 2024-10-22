import { AcademicCapIcon } from "@heroicons/react/20/solid";
import React from "react";
import { Link } from "react-router-dom";
const MobileMenuPopover = () => {
  return (
    <div className="bg-slate-950 flex flex-col gap-4 p-5 px-8 w-[100vw] text-white">
      <Link to="/players">
        {" "}
        <p className="text-md font-bold">Players</p>
      </Link>
      <Link to="/sbc/">
        <div className="text-white flex gap-1 items-center  font-bold">
          SBCs
        </div>
      </Link>
      <Link to="/squad_wizard/">
        <div className="text-white flex gap-2  font-bold">
          {" "}
          <div className="text-white flex gap-1 font-bold">Squad Wizard</div>
        </div>
      </Link>
      <Link to="/evolutions/">
        <div className="text-white flex gap-2  font-bold">
          {" "}
          <div className="text-white flex gap-1 font-bold">Evolutions</div>
        </div>
      </Link>
    </div>
  );
};
export default MobileMenuPopover;

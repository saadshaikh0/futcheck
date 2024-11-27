import React, { useState } from "react";
import { Popover } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { setFormation } from "../../redux/squadWizardSlice";
import { allFormations } from "../utils/formations";
import { convertFormation } from "../utils/utils";

const FormationButton = () => {
  const dispatch = useDispatch();
  const formation = useSelector((state) => state.squadWizard.formation);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFormationSelect = (formation, close) => {
    dispatch(setFormation(formation));
    close();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Popover className="absolute bottom-4 left-[5vw]">
      {({ open, close }) => (
        <>
          <Popover.Button className="text-white font-bold text-xl md:text-4xl bg-blue-500 hover:bg-blue-700 py-1 px-2 md:py-2 md:px-4 rounded">
            {convertFormation(formation)}
          </Popover.Button>

          <Popover.Panel className="absolute w-[30vw] md:w-full bottom-10 lg:bottom-20 md:bottom-16 max-h-[50vh] md:max-h-[20vh] overflow-auto scrollbar-thin lg:left-1/2 lg:transform lg:-translate-x-1/2 md:left-0 md:transform-none bg-black text-white rounded shadow-lg">
            <div className="p-2">
              <input
                type="text"
                placeholder="Search formations..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full p-2 mb-2 text-black rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div>
                {allFormations
                  .filter((formation) =>
                    formation
                      .toLowerCase()
                      .includes(searchTerm.replaceAll("-", "").toLowerCase())
                  )
                  .map((formation) => (
                    <div
                      key={formation}
                      onClick={() => handleFormationSelect(formation, close)}
                      className="px-2 py-1 md:px-4 md:py-2 hover:bg-gray-800 cursor-pointer"
                    >
                      {convertFormation(formation)}
                    </div>
                  ))}
              </div>
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

export default FormationButton;

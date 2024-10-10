import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlayerCardSlot from "./PlayerCardSlot";
import PlayerSuggestionBox from "./PlayerSuggestionBox";
import CoinsImg from "../../assets/coins.png";

import { setFormation } from "../../redux/squadWizardSlice";
import SolutionsPitch from "../../assets/updated-field.png";
import FOOTBALL_STADIUM_IMAGE from "../../assets/sbc_background_field.webp";

import SquadInsights from "./SquadInsights";
import { Popover } from "@headlessui/react";
import { allFormations } from "../utils/formations";
import { convertFormation } from "../utils/utils";

const SquadWizard = () => {
  const dispatch = useDispatch();
  const positions = useSelector((state) => state.squadWizard.positions);
  const players = useSelector((state) => state.squadWizard.players);
  const formation = useSelector((state) => state.squadWizard.formation);
  const squadPrice = useSelector((state) => state.squadWizard.squadPrice);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFormationSelect = (formation, close) => {
    dispatch(setFormation(formation));
    close();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    // Set the initial formation
    dispatch(setFormation("f442"));
  }, [dispatch]);

  return (
    <div
      style={{
        background: `url(${FOOTBALL_STADIUM_IMAGE}) `,
        backgroundAttachment: "fixed",
      }}
    >
      <div className={`absolute inset-0 bg-black  opacity-70`}></div>

      <div className="text-white md:h-[calc(100vh-4rem)] relative w-4/6 mx-auto flex gap-5 flex-col mt-4">
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-3xl font-medium">Welcome To Squad Wizard</h1>
          <p className="text-xl">
            Enhance your squad by using our AI powered player suggestion
            algorithm and ace the game.
          </p>
        </div>
        <div className="grid grid-cols-[1fr_2fr] gap-8 h-[90%] flex-grow pb-4">
          <div className="flex flex-col gap-4 rounded-md  overflow-auto">
            <SquadInsights />
            <div className=" flex-grow  overflow-auto">
              <PlayerSuggestionBox />
            </div>
          </div>
          <div
            className="w-full md:w-[100%] relative"
            style={{
              background: `url(${SolutionsPitch})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "bottom",
            }}
          >
            <div className="absolute  bottom-4 right-4 text-white">
              <div className="flex gap-2 items-center">
                <img src={CoinsImg} className="w-6 h-6" alt="coins" />

                <span className="text-3xl font-medium"> {squadPrice}</span>
              </div>
            </div>
            {positions.map((posObj, index) => (
              <PlayerCardSlot
                key={index}
                player={players[index]}
                left={posObj.left}
                top={posObj.top}
                transform={posObj.transform}
                position={posObj.position}
                index={index}
              />
            ))}

            <Popover className="absolute bottom-4 left-[5vw]">
              {({ open, close }) => (
                <>
                  <Popover.Button className="text-white font-bold text-4xl bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded ">
                    {convertFormation(formation)}
                  </Popover.Button>

                  <Popover.Panel className="absolute w-full bottom-16 max-h-[20vh] overflow-auto scrollbar-thin left-0 bg-black text-white rounded shadow-lg">
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
                              .includes(
                                searchTerm.replaceAll("-", "").toLowerCase()
                              )
                          )
                          .map((formation) => (
                            <div
                              key={formation}
                              onClick={() =>
                                handleFormationSelect(formation, close)
                              }
                              className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SquadWizard;

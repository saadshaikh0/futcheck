import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlayerCardSlot from "./PlayerCardSlot";
import PlayerSuggestionBox from "./PlayerSuggestionBox";

import { setFormation } from "../../redux/squadWizardSlice";
import SolutionsPitch from "../../assets/updated-field.png";
import SquadInsights from "./SquadInsights";
import { Popover } from "@headlessui/react";

const formations = ["4-3-3", "4-4-2", "3-5-2", "5-3-2"];
const SquadWizard = () => {
  const dispatch = useDispatch();
  const positions = useSelector((state) => state.squadWizard.positions);
  const players = useSelector((state) => state.squadWizard.players);
  const formation = useSelector((state) => state.squadWizard.formation);
  // const [selectedFormation, setSelectedFormation] = useState("4-3-3");

  const handleFormationSelect = (formation, close) => {
    dispatch(setFormation(formation));
    close();
  };
  useEffect(() => {
    // Set the initial formation
    dispatch(setFormation("4-4-2"));
  }, [dispatch]);

  return (
    <div className="text-white md:h-[calc(100vh-4rem)] w-4/6 mx-auto flex gap-5 flex-col mt-4">
      <div className="text-center flex flex-col gap-2">
        <h1 className="text-3xl">Welcome To Squad Wizard</h1>
        <p className="text-xl">
          Enhance your squad by using our AI powered player suggestion algorithm
          and ace the game.
        </p>
      </div>
      <div className="grid grid-cols-[1fr_2fr] gap-8 h-[90%] flex-grow pb-4">
        <div className="flex flex-col gap-4 rounded-md  overflow-auto">
          <SquadInsights />
          <div className="bg-gray-900 flex-grow overflow-auto">
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
                  {formation}
                </Popover.Button>

                <Popover.Panel className="absolute w-full bottom-16 left-0 bg-black text-white rounded shadow-lg">
                  {formations.map((formation) => (
                    <div
                      key={formation}
                      onClick={() => handleFormationSelect(formation, close)}
                      className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
                    >
                      {formation}
                    </div>
                  ))}
                </Popover.Panel>
              </>
            )}
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default SquadWizard;

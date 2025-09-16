import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlayerCardSlot from "./PlayerCardSlot";
import PlayerSuggestionBox from "./PlayerSuggestionBox";
import CoinsImg from "../../assets/coins.png";

import { setFormation } from "../../redux/squadWizardSlice";
import SolutionsPitch from "../../assets/updated-field.png";
import FOOTBALL_STADIUM_IMAGE from "../../assets/sbc_background_field.webp";

import SquadInsights from "./SquadInsights";

import FormationButton from "./FormationButton";
import playerCache from "../utils/playerCache";

const SquadWizard = () => {
  const dispatch = useDispatch();
  const positions = useSelector((state) => state.squadWizard.positions);
  const players = useSelector((state) => state.squadWizard.players);
  const squadPrice = useSelector((state) => state.squadWizard.squadPrice);
  const [playersReady, setPlayersReady] = useState(false);

  useEffect(() => {
    dispatch(setFormation("f442"));

    const initPlayers = async () => {
      try {
        await playerCache.ensurePlayersLoaded();
        setPlayersReady(true);
      } catch (error) {
        console.error("Failed to load player database:", error);
      }
    };

    initPlayers();
  }, [dispatch]);

  return (
    <div
      style={{
        background: `url(${FOOTBALL_STADIUM_IMAGE}) `,
        backgroundAttachment: "fixed",
      }}
    >
      <div className={`absolute inset-0 bg-black  opacity-70`}></div>
      {!playersReady && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="text-white text-2xl">Loading player database...</div>
        </div>
      )}
      <div className="text-white md:h-[calc(100vh-4rem)] relative w-5/6 mx-auto flex gap-5 flex-col mt-4">
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-3xl font-medium">Welcome To Squad Wizard</h1>
          <p className="text-xl">
            Enhance your squad by using our AI powered player suggestion
            algorithm and ace the game.
          </p>
        </div>
        <div className="grid grid-cols-[1fr_3fr_1fr] gap-8 h-[90%] flex-grow pb-4">
          <div className="flex flex-col gap-4 rounded-md  overflow-auto">
            <SquadInsights />
          </div>
          <div
            id="Pitch"
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

            <FormationButton />
          </div>
          <div className="flex flex-col gap-4 rounded-md  overflow-auto">
            <div className=" flex-grow  overflow-auto">
              <PlayerSuggestionBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SquadWizard;

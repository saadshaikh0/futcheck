import React from "react";
import { useSelector } from "react-redux";
import PlayerCardSlot from "./PlayerCardSlot";
import CoinsImg from "../../assets/coins.png";
import SolutionsPitch from "../../assets/updated-field.png";
import FormationButton from "./FormationButton";
import PlayerSuggestionBox from "./PlayerSuggestionBox";

const SquadWizardMobile = () => {
  const positions = useSelector((state) => state.squadWizard.positions);
  const players = useSelector((state) => state.squadWizard.players);
  const squadPrice = useSelector((state) => state.squadWizard.squadPrice);

  return (
    <div className="text-white">
      <div className="text-center flex flex-col gap-2 mt-5">
        <h1 className="text-xl font-medium">Welcome To Squad Wizard</h1>
        <p className="text-sm">
          Enhance your squad by using our AI powered player suggestion algorithm
          and ace the game.
        </p>
      </div>

      <div
        id="Pitch"
        className="relative w-full h-[70vh] "
        style={{
          background: `url(${SolutionsPitch})`,
          backgroundSize: "185% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
        }}
      >
        <div className="absolute bottom-4 right-4 text-white">
          <div className="flex gap-2 items-center">
            <img src={CoinsImg} className="w-4 h-4 lg:w-6 lg:h-6" alt="coins" />
            <span className="text-xl lg:text-3xl font-medium">
              {squadPrice}
            </span>
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
      <div className="bg-black p-4 w-4/5 mx-auto">
        <PlayerSuggestionBox />
      </div>
    </div>
  );
};

export default SquadWizardMobile;

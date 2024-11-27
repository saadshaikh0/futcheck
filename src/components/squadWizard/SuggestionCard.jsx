import React from "react";
import PlayerCard from "../common/PlayerCard";
import { ChemistryPoints } from "../PlayerViewCards/StatsCard";
import CoinsImg from "../../assets/coins.png";
import classNames from "classnames";
import { useSelector } from "react-redux";

const SuggestionCard = ({ player, points, handlePlayerSelect }) => {
  const squadPrice = useSelector((state) => state.squadWizard.squadPrice);
  const selectedPositionIndex = useSelector(
    (state) => state.squadWizard.selectedPositionIndex
  );
  const players = useSelector((state) => state.squadWizard.players);

  const currentPlayer = players[selectedPositionIndex];
  const currentPlayerPrice = currentPlayer ? currentPlayer.latest_price : 0;
  const newPlayerPrice = player.latest_price;
  const priceDifference = newPlayerPrice - currentPlayerPrice;

  return (
    <div
      className="flex flex-col lg:grid lg:grid-cols-[1fr_2fr] bg-gray-600 bg-opacity-40 px-4 mx-4 mb-2 rounded-md"
      onClick={() => handlePlayerSelect(player)}
      key={player.id}
    >
      <div className="relative w-24 lg:w-auto">
        <div className="bg-black bg-opacity-80 text-xs font-bold z-10 flex items-center gap-1 px-1 rounded-sm text-center w-[60%] justify-center  absolute top-2 left-1/2 -translate-x-1/2">
          <img src={CoinsImg} className="w-3 h-3" alt="coins" />

          {player.latest_price}
        </div>
        <PlayerCard player={player} isMini={false} isSuperMini={false} />
        <div className="absolute bottom-0 ">
          <ChemistryPoints points={points} />
        </div>
      </div>
      <div className="hidden lg:flex flex-grow text-center pt-1  flex-col  text-white rounded-md  bottom-1">
        <div className="text-xl font-medium">
          {player.c_name || player.name}
        </div>
        <div className=" pt-4 ">
          <div className="grid grid-cols-[2fr_1fr]">
            <span>Squad Chemistry</span>{" "}
            <div
              className={classNames(
                "flex gap-1 items-center",
                player.chemistry_diff > 0
                  ? "text-green-400"
                  : player.chemistry_diff < 0
                  ? "text-red-500"
                  : ""
              )}
            >
              <span>{player.chemistry}</span>
              <span className={classNames("text-sm")}>
                {player.chemistry_diff == 0
                  ? ""
                  : player.chemistry_diff > 0
                  ? `+${player.chemistry_diff}`
                  : player.chemistry_diff}{" "}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-[2fr_1fr] mt-2">
            <span>Squad Value</span>{" "}
            <div
              className={classNames(
                "flex gap-1 items-center",
                priceDifference > 0
                  ? "text-green-400"
                  : priceDifference < 0
                  ? "text-red-500"
                  : ""
              )}
            >
              <span className={classNames("text-sm")}>
                {priceDifference === 0
                  ? ""
                  : priceDifference > 0
                  ? `+${priceDifference}`
                  : priceDifference}{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionCard;

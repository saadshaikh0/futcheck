import React from "react";
import CardSlotImage from "../../assets/empty_card.png";
import PlayerCard from "../common/PlayerCard";
import { useDispatch, useSelector } from "react-redux";
import CoinsImg from "../../assets/coins.png";

import {
  removePlayerAtPosition,
  setSelectedPositionIndex,
  swapPlayersAtPositions,
} from "../../redux/squadWizardSlice";
import { XMarkIcon, ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../utils/constants";
import classNames from "classnames";
import { ChemistryPoints } from "../PlayerViewCards/StatsCard";

const PlayerCardSlot = ({ left, top, transform, player, index, position }) => {
  const dispatch = useDispatch();
  const selectedPositionIndex = useSelector(
    (state) => state.squadWizard.selectedPositionIndex
  );
  const { chemistryPoints } = useSelector(
    (state) => state.squadWizard.chemistry
  );
  const positions = useSelector((state) => state.squadWizard.positions);

  const handleClick = () => {
    dispatch(setSelectedPositionIndex(index));
  };
  const handleRemoveClick = (e) => {
    e.stopPropagation();
    dispatch(removePlayerAtPosition(index));
  };
  // Drag source setup
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.PLAYER_CARD,
    item: { index, player },
    canDrag: !!player, // Only draggable if a player is present
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Drop target setup
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.PLAYER_CARD,
    drop: (draggedItem) => {
      if (draggedItem.index !== index) {
        dispatch(
          swapPlayersAtPositions({
            fromIndex: draggedItem.index,
            toIndex: index,
          })
        );
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const currentPosition = positions[index]?.position;
  const canPlayPosition = player?.position?.includes(currentPosition);

  return (
    <div
      ref={(node) => drag(drop(node))}
      onClick={handleClick}
      className="player-card absolute"
      style={{
        left,
        top,
        transform,
        opacity: isDragging ? 0.5 : 1,
        border: isOver ? "2px dashed #00f" : "none",
        cursor: player ? "move" : "default",
      }}
    >
      {player ? (
        <div key={player.id} className="relative group  w-32 h-44">
          <PlayerCard player={player} isMini={false} isHover={false} />
          <div className="bg-black bg-opacity-80 text-xs font-bold z-10 flex items-center gap-1 px-1 rounded-sm text-center w-[60%] justify-center  absolute top-5 left-1/2 -translate-x-1/2">
            <img src={CoinsImg} className="w-3 h-3" alt="coins" />

            {player.latest_price}
          </div>
          <div className="absolute bottom-0">
            {canPlayPosition ? (
              <ChemistryPoints points={chemistryPoints[player.id] || 0} />
            ) : (
              <ExclamationCircleIcon className="w-8 h-8 text-yellow-500 bg-black rounded-full" />
            )}
          </div>
          <div className=" absolute top-2 z-50 -right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div
              onClick={handleRemoveClick}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-black hover:bg-red-600 transition-colors duration-300"
            >
              <XMarkIcon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ) : (
        <div
          className="w-44 h-44"
          style={{
            background: `url(${CardSlotImage})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
          }}
        ></div>
      )}
      <div
        className={classNames(
          "absolute -bottom-3 left-1/2 -translate-x-1/2 bg-black px-2 rounded-full",
          selectedPositionIndex === index ? "glow" : ""
        )}
      >
        {position}
      </div>
    </div>
  );
};

export default PlayerCardSlot;

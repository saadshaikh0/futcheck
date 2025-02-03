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
import { useHandleResize } from "../utils/hooks";
import { toggleLockAtPosition } from "../../redux/squadWizardSlice";

const PlayerCardSlot = ({ left, top, transform, player, index, position }) => {
  const dispatch = useDispatch();
  const isMobile = useHandleResize();
  const lockedPlayers = useSelector((state) => state.squadWizard.lockedPlayers);
  const isLocked = lockedPlayers.some((lock) => lock.positionIndex === index);

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
  const handleLockToggle = () => {
    dispatch(toggleLockAtPosition(index));
  };
  return (
    <div
      ref={(node) => drag(drop(node))}
      onClick={handleClick}
      className="player-card absolute text-white "
      style={{
        left,
        top,
        transform,
        opacity: isDragging ? 0.5 : 1,
        border: isOver
          ? "2px dashed #00f"
          : isLocked
          ? "2px solid blue"
          : "none",
        cursor: player ? "move" : "default",
        touchAction: "none", // <-- Add this
        userSelect: "none", // <-- Optionally add this
      }}
    >
      {player ? (
        <div
          key={player.id}
          className="relative group w-20 h-24  lg:w-32 lg:h-44"
        >
          <PlayerCard
            player={player}
            isMini={isMobile}
            isHover={false}
            showPrice={isMobile}
          />
          {!isMobile && (
            <div className="bg-black bg-opacity-80 text-[0.5rem] lg:text-xs font-bold z-10 flex items-center gap-1 px-1 rounded-sm text-center w-[60%] justify-center  absolute top-2 lg:top-5 left-1/2 -translate-x-1/2">
              <img src={CoinsImg} className="w-3 h-3" alt="coins" />

              {player?.latest_price}
            </div>
          )}
          <div className="absolute -bottom-1 -left-0 lg:bottom-0">
            {canPlayPosition ? (
              <ChemistryPoints points={chemistryPoints[player.id] || 0} />
            ) : (
              <ExclamationCircleIcon className="w-4 h-4 lg:w-8 lg:h-8 text-yellow-500 bg-black rounded-full" />
            )}
          </div>
          <div className=" flex flex-col absolute top-0 lg:top-2 z-50 -right-1 lg:-right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div
              onClick={handleRemoveClick}
              className="flex items-center justify-center w-4 h-4 lg:w-8 lg:h-8 rounded-full bg-black hover:bg-red-600 transition-colors duration-300"
            >
              <XMarkIcon className="w-6 h-6 text-white" />
            </div>
            <button
              onClick={handleLockToggle}
              className={`px-2 py-1 text-white rounded ${
                isLocked ? "bg-red-600" : "bg-green-600"
              }`}
            >
              {isLocked ? "Unlock" : "Lock"}
            </button>
          </div>
        </div>
      ) : (
        <div
          className="w-24 h-24 md:w-44 md:h-44"
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
          "absolute -bottom-5 text-xs md:text-lg lg:-bottom-3 left-1/2 -translate-x-1/2 bg-black px-2 rounded-full",
          selectedPositionIndex === index ? "glow" : ""
        )}
      >
        {position}
      </div>
    </div>
  );
};

export default PlayerCardSlot;

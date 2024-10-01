import React from "react";
import CardSlotImage from "../../assets/empty_card.png";
import PlayerCard from "../common/PlayerCard";
import { useDispatch } from "react-redux";
import {
  removePlayerAtPosition,
  setSelectedPositionIndex,
  swapPlayersAtPositions,
} from "../../redux/squadWizardSlice";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../utils/constants";
const PlayerCardSlot = ({ left, top, transform, player, index }) => {
  const dispatch = useDispatch();

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

  return (
    <div
      ref={(node) => drag(drop(node))}
      onClick={handleClick}
      className="player-card absolute w-32 h-44"
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
        <div key={player.id} className="relative group">
          <PlayerCard player={player} isMini={false} isHover={false} />
          <div className="bg-black absolute bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div onClick={handleRemoveClick}>
              {" "}
              <XMarkIcon className="w-4 h-4" />
            </div>
          </div>
        </div>
      ) : (
        <div
          className="w-full h-full"
          style={{
            background: `url(${CardSlotImage})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
          }}
        ></div>
      )}
    </div>
  );
};

export default PlayerCardSlot;

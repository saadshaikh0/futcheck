import React from "react";
import PositionCard from "./positionCard";
import { FORMATIONS_POSITIONS } from "../utils/formations";

// ["LW", "ST", "RW", "CM", "CM", "CM", "LB", "CB", "CB", "RB", "GK"];

const Formation = ({ squad, player_position_index }) => {
  const positions = FORMATIONS_POSITIONS["4-1-2-1-2a"];
  return (
    <div className="w-full h-full">
      <div className="flex w-full flex-wrap relative h-full">
        {squad.map((player, index) => {
          let left = positions[index][0];
          let bottom = positions[index][1];
          let playerIndex = squad.findIndex(
            (d) => d.id === player_position_index[index]
          );
          return (
            <div className="w-28  absolute " style={{ left, bottom }}>
              <PositionCard player={squad[playerIndex]} />
            </div>
          );
        })}
      </div>
      {/* <div className="flex flex-col items-center justify-around w-full h-[80vh]">
        <div className="flex flex-row items-center justify-evenly w-full ">
          <div className="w-32 h-40 ">
            <PositionCard
              player={
                squad[squad.findIndex((d) => d.id === player_position_index[0])]
              }
            />
          </div>
          <div className="w-32 h-40 ">
            <PositionCard
              player={
                squad[squad.findIndex((d) => d.id === player_position_index[1])]
              }
            />
          </div>
          <div className="w-32 h-40 ">
            <PositionCard
              player={
                squad[squad.findIndex((d) => d.id === player_position_index[2])]
              }
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-evenly w-full">
          <div className="w-32 h-40 ">
            <PositionCard
              player={
                squad[squad.findIndex((d) => d.id === player_position_index[3])]
              }
            />
          </div>
          <div className="w-32 h-40 ">
            <PositionCard
              player={
                squad[squad.findIndex((d) => d.id === player_position_index[4])]
              }
            />
          </div>
          <div className="w-32 h-40 ">
            <PositionCard
              player={
                squad[squad.findIndex((d) => d.id === player_position_index[5])]
              }
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-evenly w-full">
          <div className="w-32 h-40 ">
            <PositionCard
              player={
                squad[squad.findIndex((d) => d.id === player_position_index[6])]
              }
            />
          </div>
          <div className="w-32 h-40 ">
            <PositionCard
              player={
                squad[squad.findIndex((d) => d.id === player_position_index[7])]
              }
            />
          </div>
          <div className="w-32 h-40 ">
            <PositionCard
              player={
                squad[squad.findIndex((d) => d.id === player_position_index[8])]
              }
            />
          </div>
          <div className="w-32 h-40 ">
            <PositionCard
              player={
                squad[squad.findIndex((d) => d.id === player_position_index[9])]
              }
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-evenly w-full">
          <div className="w-32 h-40 ">
            <PositionCard
              player={
                squad[
                  squad.findIndex((d) => d.id === player_position_index[10])
                ]
              }
            />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Formation;

import React from "react";
import PositionCard from "./positionCard";

// ["LW", "ST", "RW", "CM", "CM", "CM", "LB", "CB", "CB", "RB", "GK"];

const Formation = ({ squad, player_position_index }) => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-center justify-around w-full h-[80vh]">
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
      </div>
    </div>
  );
};

export default Formation;

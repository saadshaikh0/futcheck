import React from "react";
import GameModes from "./games/GameModes";
const GamesWrapper = ({ children }) => {
  return (
    <div>
      {" "}
      <GameModes />
    </div>
  );
};

export default GamesWrapper;

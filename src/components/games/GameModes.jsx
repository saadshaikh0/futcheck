import React from "react";
import { Link } from "react-router-dom";

const gameModes = [
  {
    title: "Player Guesser",
    description: "Guess the player based on hints, stats or silhouette!",
    image: "/images/player-guesser.png",
    route: "/player-guesser",
  },
  {
    title: "Draft Battle",
    description:
      "Pick your squad and challenge others in a draft-style showdown!",
    image: "/images/draft-battle.png",
    route: "/draft-battle",
  },
  {
    title: "Stat Clash",
    description: "Battle using your cards with health bars, stats & strategy!",
    image: "/images/stat-clash.png",
    route: "/stat_clash",
  },
];

const GameModes = () => {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {gameModes.map((mode, index) => (
        <Link to={mode.route}>
          {" "}
          <div
            key={index}
            className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <img
              src={mode.image}
              alt={mode.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 bg-white">
              <h2 className="text-xl font-bold mb-2">{mode.title}</h2>
              <p className="text-sm text-gray-600">{mode.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GameModes;

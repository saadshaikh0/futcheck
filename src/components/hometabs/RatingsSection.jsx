// RatingsSection.jsx

import React, { useEffect, useState } from "react";
import { fetchAllPlayers } from "../../api/apiService";
import PlayerCard from "../common/PlayerCard";
import { useHandleResize } from "../utils/hooks";

const RatingsSection = () => {
  const ratings = [91, 90, 89, 88, 87, 86, 85, 84, 83].reverse(); // Adjust ratings as needed
  const [playersByRating, setPlayersByRating] = useState({});
  const isMobile = useHandleResize();
  useEffect(() => {
    ratings.forEach((rating) => {
      fetchAllPlayers({
        min_rating: rating,
        max_rating: rating,
        page: 1,
        page_size: 5,
        order_by: "latest_price",
        order_direction: "asc",
        exclude_extinct: true,
      }).then((data) => {
        setPlayersByRating((prev) => ({
          ...prev,
          [rating]: data.players.slice(0, 5), // Ensure only first 5 players
        }));
      });
    });
  }, []);

  return (
    <div className="lg:mt-10 mt-4 px-5 grid grid-cols-1 lg:grid-cols-3 gap-10 overflow-auto h-[80vh] lg:h-auto">
      {ratings.map((rating) => (
        <div key={rating} className="mb-8">
          <h2 className="text-white text-2xl font-bold mb-4">
            Top 5 Players with Rating {rating}
          </h2>
          <div className="flex flex-wrap md:flex-nowrap">
            {playersByRating[rating]?.map((player) => (
              <div key={player.id} className="w-[100px] md:w-auto relative">
                <div className="absolute top-1 z-10 left-1/2 -translate-x-1/2 px-2 font-bold rounded bg-black text-white text-xs p-1">
                  {player.latest_price}
                </div>
                <PlayerCard
                  player={player}
                  isMini={isMobile}
                  showPrice={isMobile}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RatingsSection;

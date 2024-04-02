import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlayerCard from "../common/PlayerCard";
import { setRatings } from "../../redux/allPlayerSlice";
import { fetchAllPlayers } from "../../api/apiService";

const ShowPlayers = ({ tabs }) => {
  const allRatings = useSelector((state) => state.allPlayers.ratings);
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(0);
  const fetchPlayersByRating = async (rating) => {
    if (!allRatings[rating]) {
      const response = await fetchAllPlayers({
        min_rating: rating,
        max_rating: rating,
        rarity: { id: 1 },
        page: 1,
      });
      console.log(response);
      dispatch(setRatings({ rating, players: response }));
    }
  };
  useEffect(() => {
    if (tabs) fetchPlayersByRating(tabs[0]);
  }, [tabs]);
  return (
    <div>
      <ul className="flex overflow-x-auto justify-center items-center text-center">
        {tabs.map((tab, index) => {
          return (
            <li
              onClick={() => {
                fetchPlayersByRating(tab);
                setSelectedTab(index);
              }}
              className="me-2"
            >
              <span
                className={classNames(
                  "inline-flex items-center justify-center p-1  cursor-pointer group",
                  index == selectedTab ? "text-fuchsia-400" : ""
                )}
              >
                {tab}
              </span>
            </li>
          );
        })}
      </ul>
      <div>
        {allRatings[tabs[selectedTab]] &&
          allRatings[tabs[selectedTab]].length && (
            <div className="grid grid-cols-2 max-h-44 scrollbar-thin  scrollbar-thumb-gray-400 scrollbar-track-slate-800 overflow-y-auto">
              {allRatings[tabs[selectedTab]].map((player) => (
                <PlayerCard player={player} />
              ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default ShowPlayers;

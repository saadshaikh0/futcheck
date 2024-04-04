import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlayerCard from "../common/PlayerCard";
import { setRatings } from "../../redux/allPlayerSlice";
import { fetchAllPlayers } from "../../api/apiService";
import PlayerRow from "./playerRow";

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
    if (tabs) fetchPlayersByRating(tabs[0][0]);
  }, [tabs]);
  return (
    <div>
      <ul className="flex overflow-x-auto  items-center text-center">
        {tabs.map((tab, index) => {
          return (
            <li
              onClick={() => {
                fetchPlayersByRating(tab[0]);
                setSelectedTab(index);
              }}
              className={classNames(
                "grow rounded-lg",
                index == selectedTab
                  ? "bg-fuchsia-400 text-white"
                  : "text-slate-400"
              )}
            >
              <span
                className={classNames(
                  "inline-flex items-center justify-center p-1  cursor-pointer group"
                )}
              >
                {tab[0]}({tab[1]})
              </span>
            </li>
          );
        })}
      </ul>
      <div>
        {allRatings[tabs[selectedTab][0]] &&
          allRatings[tabs[selectedTab][0]].length && (
            <div className="flex mt-2 flex-col no-scrollbar max-h-44 gap-3 scrollbar-thin  scrollbar-thumb-gray-400 scrollbar-track-slate-800 overflow-y-auto">
              {allRatings[tabs[selectedTab][0]].map((player) => (
                <PlayerRow player={player} />
              ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default ShowPlayers;

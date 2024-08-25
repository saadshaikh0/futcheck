import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setPlayer } from "../../redux/playerSlice";
import { buildPlayerUrl, fillZeros } from "../utils/utils";
import CoinsImg from "../../assets/coins.png";
const PlayerCard = ({ player }) => {
  const {
    rarity_url,
    guid,
    id,
    base_id,
    name,
    text_color,
    rating,
    position,
    c_name,
    nation_url,
    league_url,
    teamid,
    latest_price,
  } = player;
  const dispatch = useDispatch();
  const player_name = c_name != "None" ? c_name : name.split(" ").pop();
  const [validGuid, setValidGuid] = useState(!!guid);

  return (
    <Link to={`/player/${id}/${name?.replace(/\s+/g, "-")}`}>
      <div
        className="flex group hover:scale-150 hover:z-20 hover:relative flex-col w-full items-center"
        style={{ color: text_color }}
      >
        <div className="block relative ">
          <img src={rarity_url} />
          <img
            className={
              !validGuid || base_id == id
                ? "absolute top-[20%] left-[52%] w-[65%] h-1/2 -translate-x-1/2"
                : "absolute top-0 w-full h-full"
            }
            src={buildPlayerUrl(guid, id, base_id)}
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop in case backup image also fails
              e.target.src = buildPlayerUrl(guid, base_id, base_id);
              e.target.style.width = "65%";
              e.target.style.height = "50%";
              e.target.style.left = "52%";
              e.target.style.top = "20%";
              e.target.style.transform = "translate(-50%)";
              setValidGuid(false);
            }}
          />
          <div className="absolute bottom-[18%] w-full text-center  left-[50%] font-bold -translate-x-1/2 group-hover:opacity-0 text-small">
            {player_name ? player_name : ""}
          </div>
          <div className="absolute bottom-[18%] w-full text-center text-[0.7em] left-[50%] font-bold -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300">
            {c_name != "None" ? c_name : name}
          </div>

          <div class="absolute left-[23.8%] transform -translate-x-1/2 font-extrabold text-center top-[20.2%]">
            <div class="font-cruyff-condensed-numbers-bold text-[1em] leading-[0.91em]">
              {rating}
            </div>
            <div class="font-cruyff-condensed-medium leading-none text-[0.7em] -mt-[0.07em]">
              {position[0]}
            </div>
          </div>
          <div class="absolute flex justify-center items-center w-full gap-[0.4em] top-[80%]">
            <img
              src={nation_url}
              class="object-contain max-h-[0.7em] max-w-[1.7em]"
              alt="Nation"
            />
            <img
              src={league_url}
              class="object-contain max-h-[0.7em] max-w-[1.7em]"
              alt="League"
            />
            <img
              src={`https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/24B23FDE-7835-41C2-87A2-F453DFDB2E82/2024/fut/items/images/mobile/clubs/dark/${teamid}.png`}
              class="object-contain max-h-[0.7em] max-w-[1.7em]"
              alt="Club"
            />
          </div>
        </div>
        <div
          className={`flex items-center gap-1 font-bold bg-gray-900 text-white  px-2 rounded-lg py-1 -mt-3`}
        >
          <img className="w-4 h-4" src={CoinsImg} />
          {latest_price?.toLocaleString("en-US")}
        </div>
      </div>
    </Link>
  );
};

export default PlayerCard;

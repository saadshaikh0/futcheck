import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setPlayer } from "../../redux/playerSlice";
import { buildPlayerUrl, fillZeros } from "../utils/utils";

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
  } = player;
  const dispatch = useDispatch();
  const player_name = c_name != "None" ? c_name : name;
  const [validGuid, setValidGuid] = useState(!!guid);

  return (
    <Link
      to={`/player/${id}/${name?.replace(/\s+/g, "-")}`}
      onClick={() => {
        player["bg_color"] = fillZeros(player["bg_color"]);
        dispatch(setPlayer({ ...player }));
      }}
    >
      <div className="flex flex-col w-full" style={{ color: text_color }}>
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
          <div className="absolute bottom-[15%] left-[50%] font-bold -translate-x-1/2">
            {player_name ? player_name.split(" ")[0] : ""}
          </div>
          <div class="absolute left-[23.8%] transform -translate-x-1/2 font-extrabold text-center top-[20.2%]">
            <div class="font-cruyff-condensed-numbers-bold text-[1em] leading-[0.91em]">
              {rating}
            </div>
            <div class="font-cruyff-condensed-medium leading-none text-[0.7em] -mt-[0.07em]">
              {position[0]}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlayerCard;

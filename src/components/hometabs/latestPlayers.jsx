import react from "react";
import { buildPlayerUrl } from "../utils/utils";
import { useDispatch } from "react-redux";
import { setPlayer } from "../../redux/playerSlice";
const PlayerCard = ({ player }) => {
  const { rarity_url, guid, id, base_id, name, text_color, rating, position } =
    player;
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(setPlayer({ ...player }))}
      className="flex flex-col w-full"
      style={{ color: text_color }}
    >
      <div className="block relative ">
        <img src={rarity_url} />
        <img
          className="absolute top-0 w-full h-full"
          src={buildPlayerUrl(guid, id, base_id)}
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop in case backup image also fails
            e.target.src = buildPlayerUrl(guid, base_id, base_id);
            e.target.style.width = "65%";
            e.target.style.height = "50%";
            e.target.style.left = "50%";
            e.target.style.top = "13%";
            e.target.style.transform = "translate(-50%)";
          }}
        />
        <div className="absolute bottom-[15%] left-[50%] font-bold -translate-x-1/2">
          {name.split(" ")[0]}
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
  );
};

const LatestPlayers = ({ players }) => {
  return (
    <div>
      <div className="text-white grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10">
        {players.map((player) => (
          <div className="flex justify-center items-center">
            <PlayerCard player={player} />
          </div>
        ))}{" "}
      </div>
    </div>
  );
};
export default LatestPlayers;

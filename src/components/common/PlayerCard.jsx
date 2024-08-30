import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setPlayer } from "../../redux/playerSlice";
import { buildPlayerUrl, fillZeros } from "../utils/utils";
import CoinsImg from "../../assets/coins.png";
import { WORK_RATE } from "../utils/constants";
import { getTraitIcon } from "../utils/traitsvg";
import classNames from "classnames";
const PlayerCard = ({
  player,
  isMini = true,
  isDisabled = true,
  isHover = false,
}) => {
  const {
    id,
    base_id,
    name,
    rating,
    guid,
    rarity_url,
    rarity_id,
    futwiz_id,
    attributes,
    playstyle_plus,
    position,
    text_color,
    bg_color,
    nation_url,
    league_url,
    c_name,
    teamid,
    weak_foot,
    skill_moves,
    att_wr,
    def_wr,
    playstyles,
    stats,
    guid_no,
    levels,
    colors,
    latest_price,
    last_updated,
  } = player;
  const [validGuid, setValidGuid] = useState(!!guid);
  const player_name =
    c_name != "None" ? c_name : isMini ? name.split(" ").pop() : name;

  return (
    <Link
      onClick={(e) => isDisabled && e.preventDefault()}
      to={`/player/${id}/${name?.replace(/\s+/g, "-")}`}
    >
      <div
        className={classNames(
          isHover
            ? "flex group hover:scale-150 hover:z-20 hover:relative flex-col w-full items-center"
            : ""
        )}
        style={{ color: text_color }}
      >
        <div
          style={{
            color: text_color,
            "--fill-color": bg_color,
            "--text-color": text_color,
          }}
          className="block relative "
        >
          <img src={isMini ? rarity_url : rarity_url?.replace("_s_", "_e_")} />

          <img
            className={
              !validGuid || base_id == id
                ? isMini
                  ? "absolute top-[18%] left-[55%] !w-[65%] h-1/2 -translate-x-1/2"
                  : "absolute top-[15%] left-[58%] !w-[65%] h-1/2 -translate-x-1/2"
                : "absolute top-0 w-full h-full"
            }
            src={buildPlayerUrl(guid, id, base_id)}
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop in case backup image also fails
              e.target.src = buildPlayerUrl(guid, base_id, base_id);

              setValidGuid(false);
            }}
          />
          <div
            className={classNames(
              "font-bold leading-none  absolute left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[75.2%] whitespace-nowrap overflow-hidden text-overflow-ellipsis text-center",
              isMini ? "text-1em top-[75%] " : "text-[1.4em] top-[67%] "
            )}
          >
            {player_name}
          </div>
          {!isMini && (
            <div
              class={`flex flex-row absolute top-[72%] w-[68.8%] font-bold left-1/2 transform -translate-x-1/2 justify-between`}
            >
              <div class="relative">
                <div class="font-cruyff-condensed-medium text-[0.78em] leading-none mb-[0.2em] text-center">
                  PAC
                </div>
                <div class="font-cruyff-condensed-numbers-medium text-[1.2em] leading-none text-center relative">
                  {attributes[0]}
                </div>
              </div>
              <div class="relative">
                <div class="font-cruyff-condensed-medium text-[0.78em] leading-none mb-[0.2em] text-center">
                  SHO
                </div>
                <div class="font-cruyff-condensed-numbers-medium text-[1.2em] leading-none text-center relative">
                  {attributes[1]}
                </div>
              </div>
              <div class="relative">
                <div class="font-cruyff-condensed-medium text-[0.78em] leading-none mb-[0.2em] text-center">
                  PAS
                </div>
                <div class="font-cruyff-condensed-numbers-medium text-[1.2em] leading-none text-center relative">
                  {attributes[2]}
                </div>
              </div>
              <div class="relative">
                <div class="font-cruyff-condensed-medium text-[0.78em] leading-none mb-[0.2em] text-center">
                  DRI
                </div>
                <div class="font-cruyff-condensed-numbers-medium text-[1.2em] leading-none text-center relative">
                  {attributes[3]}
                </div>
              </div>
              <div class="relative">
                <div class="font-cruyff-condensed-medium text-[0.78em] leading-none mb-[0.2em] text-center">
                  DEF
                </div>
                <div class="font-cruyff-condensed-numbers-medium text-[1.2em] leading-none text-center relative">
                  {attributes[4]}
                </div>
              </div>
              <div class="relative">
                <div class="font-cruyff-condensed-medium text-[0.78em] leading-none mb-[0.2em] text-center">
                  PHY
                </div>
                <div class="font-cruyff-condensed-numbers-medium text-[1.2em] leading-none text-center relative">
                  {attributes[5]}
                </div>
              </div>
            </div>
          )}
          <div
            className={classNames(
              "absolute transform -translate-x-1/2 font-bold text-center top-[17.2%]",
              isMini ? "left-[24.8%]" : "left-[21.8%]"
            )}
          >
            <div
              className={classNames(
                "font-cruyff-condensed-numbers-bold leading-[0.91em]",
                isMini ? "text-[1.2em]" : "text-[2em]"
              )}
            >
              {rating}
            </div>
            <div
              className={classNames(
                "font-cruyff-condensed-medium leading-none  -mt-[0.07em]",
                isMini ? "text-[0.6em]" : "text-[1em]"
              )}
            >
              {position[0]}
            </div>
          </div>
          <div
            id="playstyle_container"
            class="absolute left-[9.8%] top-[57.2%] transform -translate-y-1/2 -translate-x-1/2 z-2 text-[0.9em] text-transparent"
          >
            {playstyle_plus.map((playstyle) => {
              return (
                <div className="relative">
                  <svg
                    className={classNames(
                      " svg-container svg-icon svg-icon--size-sm",
                      isMini ? "!w-[2em] !h-[2em]" : "!w-[2.5em] !h-[2.5em]"
                    )}
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    stroke={text_color}
                  >
                    <path
                      d="M12.813,104.953L68.157,21.862H188.143l55.045,83.091L128,235.138Z"
                      fill-opacity="1"
                      stroke={text_color}
                      stroke-linejoin="round"
                      stroke-width="8"
                      fill={bg_color}
                    ></path>
                  </svg>
                  <div className="playstyle_icon">
                    {getTraitIcon(playstyle, text_color)}
                  </div>
                </div>
              );
            })}
          </div>
          {/* ALternate Positions */}

          {!isMini && (
            <div class="absolute right-[3.96%] top-[28.1%] transform -translate-y-1/2 z-2 w-[14%] text-center flex flex-col gap-[0.1em]">
              {position.slice(1).map((pos) => (
                <div
                  class={`rounded-[0.35em] font-medium border-[0.09em] border-[--color] text-[--color] w-full whitespace-nowrap font-cruyff-condensed-medium text-[0.85em] flex justify-center leading-[1] pb-[0.04em]  relative`}
                  style={{
                    backgroundColor: bg_color,
                  }}
                >
                  {pos}
                </div>
              ))}
            </div>
          )}
          {!isMini && (
            <div class="absolute font-bold right-[3.96%] top-[58.2%] transform -translate-y-1/2 z-2 w-[12%] text-center flex flex-col gap-[0.1em]">
              <div class="p-[0.1em]  rounded-[0.35em] bg-[--fill-color] border-[0.09em] border-[--color] text-[--color] w-full whitespace-nowrap font-cruyff-condensed-medium text-[0.73em] flex justify-center leading-[1]  relative">
                {skill_moves + 1} ★
              </div>
              <div class="p-[0.1em] rounded-[0.35em] bg-[--fill-color] border-[0.09em] border-[--color] text-[--color] w-full whitespace-nowrap font-cruyff-condensed-medium text-[0.73em] flex justify-center leading-[1]  relative">
                {weak_foot} WF
              </div>

              <div class="rounded-[0.35em] p-[0.1em] bg-[--fill-color] border-[0.09em] border-[--color] text-[--color] w-full whitespace-nowrap font-cruyff-condensed-medium text-[0.73em] flex justify-center leading-[1]  relative">
                <div class="grid grid-cols-2 gap-[0.2em] w-full justify-between items-center px-[0.1em]">
                  <span class="inline-block text-center">
                    {WORK_RATE[att_wr][0]}
                  </span>
                  <span class="absolute top-[43%] left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    ·
                  </span>
                  <span class="inline-block text-center">
                    {WORK_RATE[def_wr][0]}
                  </span>
                </div>
              </div>
            </div>
          )}
          <div
            className={classNames(
              "absolute flex justify-center items-center w-full gap-[0.4em] ",
              isMini ? "top-[79.8%]" : "top-[81.8%]"
            )}
          >
            <img
              src={nation_url}
              class={classNames(
                "object-contain",
                isMini
                  ? "max-h-[1em] max-w-[1.4em]"
                  : "max-h-[1.3em] max-w-[1.7em]"
              )}
              alt="Nation"
            />
            <img
              src={league_url}
              class={classNames(
                "object-contain",
                isMini
                  ? "max-h-[1em] max-w-[1.4em]"
                  : "max-h-[1.3em] max-w-[1.7em]"
              )}
              alt="League"
            />
            <img
              src={`https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/24B23FDE-7835-41C2-87A2-F453DFDB2E82/2024/fut/items/images/mobile/clubs/dark/${teamid}.png`}
              class={classNames(
                "object-contain",
                isMini
                  ? "max-h-[1em] max-w-[1.4em]"
                  : "max-h-[1.3em] max-w-[1.7em]"
              )}
              alt="Club"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlayerCard;

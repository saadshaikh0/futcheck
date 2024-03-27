import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buildPlayerUrl, convertToMinutes, fillZeros } from "./utils/utils";
import { setPlayer } from "../redux/playerSlice";
import { fetchPrice, fetchVersions } from "../api/apiService";
import { useQuery } from "@tanstack/react-query";
import { TRAIT_MAP } from "./utils/traitsvg";
import { WORK_RATE } from "./utils/constants";
import CoinsImg from "../assets/coins.png";
import SimilarPlayers from "./similarPlayers";
import PriceCard from "./PlayerViewCards/PriceCard";
import StatsCard from "./PlayerViewCards/StatsCard";
import InfoCard from "./PlayerViewCards/InfoCard";
import PlaystyleCard from "./PlayerViewCards/PlaystyleCard";

const PlayerView = () => {
  const player = useSelector((state) => state.player.details);
  const {
    id,
    base_id,
    name,
    rating,
    guid,
    rarity_url,
    futwiz_id,
    futbin_id,
    attributes,
    playstyle_plus,
    position,
    text_color,
    bg_color,
    nation_url,
    leagueid,
    nation,
    rarity,
    league_url,
    c_name,
    teamid,
    weak_foot,
    skill_moves,
    att_wr,
    def_wr,
    foot,
    playstyles,
    stats,
  } = player;
  const dispatch = useDispatch();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["fetchPrices", id, futwiz_id],
    queryFn: () => fetchPrice(id, futwiz_id),

    staleTime: 1000 * 60,
  });
  const [latestPriceData, setLatestPriceData] = useState({});
  // const {
  //   futbin: futbinData = {},
  //   futwiz: futwizData = {},
  //   futgg: futggData = {},
  // } = data;

  const { data: playerVersions = [] } = useQuery({
    queryKey: ["fetchVersions", base_id, id],
    queryFn: () => fetchVersions(base_id, id),
    cacheTime: 1000 * 60 * 100,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data.futbin) {
      let arr = [data.futbin, data.futwiz, data.futgg];
      const sortedArray = arr.sort((a, b) => {
        const timeA = convertToMinutes(a.updated);
        const timeB = convertToMinutes(b.updated);
        return timeA - timeB; // Sort in descending order
      });
      // console.log(sortedArray);
      setLatestPriceData(sortedArray[0]);
    }
  }, [data]);

  useEffect(() => {
    // Select all path elements inside the SVG
    const pathElements = document.querySelectorAll(
      "#playstyle_container .svg-container path"
    );
    const iconPathElements = document.querySelectorAll(
      "#playstyle_container .playstyle_icon path"
    );

    // Apply fill color to each path element
    pathElements.forEach((path) => {
      path.style.fill = bg_color; // Apply red fill color
      path.style.stroke = text_color; // Apply red fill color
    });
    iconPathElements.forEach((path) => {
      path.style.fill = text_color; // Apply red fill color
    });
  }, [bg_color, text_color]);

  if (!id) {
    return (
      <div className="min-h-[90vh] bg-slate-950 ">
        <p className="text-white text-center text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Search Players
        </p>
      </div>
    );
  }
  return (
    <div className="h-full md:min-h-[90vh] bg-slate-950">
      <div className="w-[90%] mx-auto pt-3">
        <div className="pt-5">
          <h1
            class="text-white
             font-bold text-center md:text-left text-xl md:text-4xl
             group-[.-sticky-header]:text-2xl group-[.-sticky-header]:mt-0
             "
          >
            {c_name != "None" ? c_name : name}
            <span class="text-lighter-gray font-bold hidden md:inline-block text-base ml-2">
              {rating} OVR - EA FC 24
            </span>
          </h1>
        </div>
        <div className="grid md:grid-cols-[1fr_2fr] mt-5">
          <div className="flex flex-col w-full md:max-w-[280px]">
            <div className="mx-auto">
              <span
                className="flex justify-center items-center  px-3 py-1 rounded-full font-bold gap-2 border-2"
                style={{
                  backgroundColor: bg_color,
                  color: text_color,
                  borderColor: text_color,
                }}
              >
                <img src={CoinsImg} className="mt-1" width={24} />
                {latestPriceData["value"]}
              </span>
            </div>
            <div
              style={{
                color: text_color,
                "--fill-color": bg_color,
                "--text-color": text_color,
              }}
              className="block relative "
            >
              <img src={rarity_url.replace("_s_", "_e_")} />
              <img
                style={
                  !guid || base_id == id
                    ? {
                        width: "65%",
                        height: "50%",
                        left: "50%",
                        top: "13%",
                        transform: "translate(-50%)",
                      }
                    : {}
                }
                className="absolute top-0 w-full h-full"
                src={buildPlayerUrl(guid, id, base_id)}
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop in case backup image also fails
                  e.target.src = buildPlayerUrl(guid, base_id, base_id);
                  dispatch(setPlayer({ ...player, guid: null }));
                }}
              />
              <div
                class={`flex flex-row absolute top-[69%] w-[68.8%] font-bold left-1/2 transform -translate-x-1/2 justify-between`}
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
              <div class="absolute left-[21.8%] transform -translate-x-1/2 font-bold text-center top-[17.2%]">
                <div class="font-cruyff-condensed-numbers-bold text-[2em] leading-[0.91em]">
                  {rating}
                </div>
                <div class="font-cruyff-condensed-medium leading-none text-[1em] -mt-[0.07em]">
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
                        className="!w-[2.5em] !h-[2.5em] svg-container svg-icon svg-icon--size-sm"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 256"
                      >
                        <path
                          d="M12.813,104.953L68.157,21.862H188.143l55.045,83.091L128,235.138Z"
                          fill-opacity="1"
                          stroke="#ffffff"
                          stroke-linejoin="round"
                          stroke-width="8"
                          fill="#9335fe"
                        ></path>
                      </svg>
                      <div className="playstyle_icon">
                        {TRAIT_MAP[playstyle]}
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* ALternate Positions */}
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
              <div class="absolute flex justify-center items-center w-full gap-[0.4em] top-[81.8%]">
                <img
                  src={nation_url}
                  class="object-contain max-h-[1.3em] max-w-[1.7em]"
                  alt="Nation"
                />
                <img
                  src={league_url}
                  class="object-contain max-h-[1.3em] max-w-[1.7em]"
                  alt="League"
                />
                <img
                  src={`https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/24B23FDE-7835-41C2-87A2-F453DFDB2E82/2024/fut/items/images/mobile/clubs/dark/${teamid}.png`}
                  class="object-contain max-h-[1.3em] max-w-[1.7em]"
                  alt="Club"
                />
              </div>
            </div>
            {playerVersions && (
              <div className="flex justify-center gap-2 mb-5 flex-wrap">
                {playerVersions.map((player) => {
                  return (
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        console.log(player);
                        player["bg_color"] = fillZeros(player["bg_color"]);
                        dispatch(setPlayer({ ...player }));
                      }}
                    >
                      <img width={40} src={player.rarity_url} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex flex-col h-full gap-4">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-2">
              <div className="bg-gray-900 rounded-md">
                <PriceCard
                  isLoading={isLoading}
                  value={latestPriceData["value"]}
                  updated={latestPriceData["updated"]}
                />
              </div>
              <div className="bg-gray-900 rounded-md">
                <PlaystyleCard
                  iconPlaystyles={playstyle_plus}
                  playstyles={playstyles}
                />
              </div>
            </div>
            <div className="grow grid lg:grid-cols-[3fr_1fr] gap-4">
              <div className="bg-gray-900 rounded-md">
                <StatsCard stats={stats} attributes={attributes} />
              </div>
              <div className="bg-gray-900 rounded-md">
                <InfoCard player={player} />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-14">
          <h2 className="text-white text-xl md:text-4xl text-center font-bold my-4">
            Similar players
          </h2>
          <SimilarPlayers player={player} />
        </div>
      </div>
    </div>
  );
};

export default PlayerView;

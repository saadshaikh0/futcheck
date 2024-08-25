import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import { buildPlayerUrl } from "../utils/utils";
import { getTraitIcon, TRAIT_MAP } from "../utils/traitsvg";
import { WORK_RATE } from "../utils/constants";

export const PlayerImage = ({ player }) => {
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
  return (
    <div
      style={{
        color: text_color,
        "--fill-color": bg_color,
        "--text-color": text_color,
      }}
      className="block relative "
    >
      <img src={rarity_url?.replace("_s_", "_e_")} />

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
          //   dispatch(setPlayer({ ...player, guid: null }));
        }}
      />
      <div class="font-bold leading-none text-[1.4em] absolute top-[67%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[75.2%] whitespace-nowrap overflow-hidden text-overflow-ellipsis text-center">
        {c_name != "None" ? c_name : name}
      </div>
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
            <span class="inline-block text-center">{WORK_RATE[att_wr][0]}</span>
            <span class="absolute top-[43%] left-1/2 transform -translate-y-1/2 -translate-x-1/2">
              ·
            </span>
            <span class="inline-block text-center">{WORK_RATE[def_wr][0]}</span>
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
  );
};

export default function PlayerCarousel({ player, versions, onPlayerChange }) {
  const handleSlideChange = (swiper) => {
    const newIndex = swiper.activeIndex;
    if (newIndex === 0) {
      onPlayerChange(player);
    } else if (versions && versions[newIndex - 1]) {
      onPlayerChange(versions[newIndex - 1]);
    }
  };
  return (
    <div className=" h-[46vh] w-[40vw] self-center">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 100,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        initialSlide={3}
        modules={[EffectCoverflow, Pagination]}
        className="h-full"
        onSlideChange={handleSlideChange}
      >
        <SwiperSlide>
          <PlayerImage player={player} />
        </SwiperSlide>
        {versions?.map((player) => {
          return (
            <SwiperSlide>
              <PlayerImage player={player} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

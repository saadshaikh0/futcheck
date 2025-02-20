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
import PlayerCard from "../common/PlayerCard";
import { useSelector } from "react-redux";
import { buildDynamicUrl } from "../utils/utils";

export default function PlayerCarousel({
  playerDetails,
  player,
  versions,
  onPlayerChange,
}) {
  const modifiedStats = useSelector((state) => state.player.modifiedStats);
  const iconPlaystyles = playerDetails?.playstyle_plus;
  const playstyles = playerDetails?.playstyles;
  const handleSlideChange = (swiper) => {
    const newIndex = swiper.activeIndex;
    if (newIndex === 0) {
      onPlayerChange(player);
    } else if (versions && versions[newIndex - 1]) {
      onPlayerChange(versions[newIndex - 1]);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="w-full  md:h-[40vh] md:w-[40vw] self-center">
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
            <PlayerCard player={player} isMini={false} />
          </SwiperSlide>
          {versions?.map((player) => {
            return (
              <SwiperSlide>
                <PlayerCard player={player} isMini={false} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="flex gap-3 justify-center flex-wrap scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300">
        {iconPlaystyles?.map((playstyle) => {
          return (
            <div className="relative">
              <svg
                class="!w-[2.5em] !h-[2.5em] svg-container svg-icon svg-icon--size-sm"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
              >
                <path
                  d="M12.813,104.953L68.157,21.862H188.143l55.045,83.091L128,235.138Z"
                  fill-opacity="1"
                  stroke="#FFD700"
                  stroke-linejoin="round"
                  stroke-width="8"
                  fill="#FFD700"
                ></path>
              </svg>
              <img
                className="w-[35px] h-[35px] absolute left-[2px] top-0"
                src={buildDynamicUrl("playstyle", playstyle)}
              />
            </div>
          );
        })}

        {playstyles?.map((playstyle) => {
          return (
            <div className="relative">
              <svg
                class="!w-[2.5em] !h-[2.5em] svg-container svg-icon svg-icon--size-sm"
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
                  fill="#ffffff"
                ></path>
              </svg>
              <img
                className="w-[35px] h-[35px] absolute left-[2px] top-0"
                src={buildDynamicUrl("playstyle", playstyle)}
              />
            </div>
          );
        })}
      </div>
      <div className="text-3xl font-black">{player["name"]}</div>
    </div>
  );
}

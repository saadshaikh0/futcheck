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

export default function PlayerCarousel({ player, versions, onPlayerChange }) {
  const modifiedStats = useSelector((state) => state.player.modifiedStats);

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
      <div className="text-3xl font-black">{player["name"]}</div>
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
    </div>
  );
}

// PlayerSwiper.jsx

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setPlayer } from "../../redux/playerSlice";
import PlayerCard from "../common/PlayerCard";
import CoinsImg from "../../assets/coins.png";

const PlayerSwiper = forwardRef(({ players, selectedTab }, ref) => {
  const swiperRef = useRef(null);
  const dispatch = useDispatch();
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useImperativeHandle(ref, () => ({
    goToSlide1: () => {
      if (swiperRef.current) {
        swiperRef.current.swiper.slideTo(0);
      }
    },
  }));

  useEffect(() => {
    if (players && players.length > 0) {
      setSelectedPlayer(players[0]);
      if (swiperRef.current) {
        swiperRef.current.swiper.slideTo(0);
      }
    }
  }, [players]);

  const handleSlideChange = (swiper) => {
    const newIndex = swiper.activeIndex;
    setSelectedPlayer(players[newIndex]);
  };

  return (
    <>
      <Swiper
        key={players.map((player) => player.id).join("-")} // Add this key prop
        ref={swiperRef}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 150,
          depth: 100,
          modifier: 1,
        }}
        pagination={true}
        modules={[EffectCoverflow]}
        className="h-[calc(90%-15rem)] md:h-[calc(90%-4rem)] hidden md:block"
        onSlideChange={handleSlideChange}
        slideActiveClass="active-slide"
      >
        {players?.map((player) => (
          <SwiperSlide key={player.id}>
            <PlayerCard isHome={true} player={player} isMini={false} />
            {player.slotname && (
              <div className="absolute bg-black w-3/4 text-yellow-600 text-center -bottom-16 rounded left-1/2 transform -translate-x-1/2  text-lg font-semibold">
                {player.slotname}
              </div>
            )}
            <div className="bg-black text-white bg-opacity-80 text-2xl font-bold z-10 flex items-center gap-1 text-center px-5 rounded-lg justify-center absolute top-10 left-1/2 -translate-x-1/2">
              <img src={CoinsImg} className="!w-5 h-5" alt="coins" />
              {player?.latest_price?.toLocaleString("en-us")}
              {player?.trend && (
                <span
                  className={`${
                    player?.trend < 0 ? "text-red-500" : "text-green-500"
                  } font-mono text-lg`}
                >
                  {player?.trend > 0 ? "+" : ""}
                  {player?.trend}%
                </span>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedPlayer && (
        <div className="hidden md:block mt-4">
          <div className="flex flex-col text-white text-2xl text-center font-bold">
            <Link
              to={`/player/${selectedPlayer.id}/${selectedPlayer.name?.replace(
                /\s+/g,
                "-"
              )}`}
              onClick={() => {
                dispatch(setPlayer({ ...selectedPlayer }));
              }}
            >
              <div className="cursor-pointer hover:underline">Show Details</div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
});

export default PlayerSwiper;

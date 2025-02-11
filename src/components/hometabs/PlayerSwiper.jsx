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
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";

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
      // if (swiperRef.current) {
      //   swiperRef.current.swiper.slideTo(0);
      // }
    }
  }, [players]);

  const handleSlideChangeTransitionEnd = (swiper) => {
    const newIndex = swiper.realIndex; // Modulo for looping consistency
    setSelectedPlayer(players[newIndex]);
    swiperRef.current.swiper.update();
  };
  const handleSlideChange = (swiper) => {
    const newIndex = swiper.realIndex; // Modulo for looping consistency
    setSelectedPlayer(players[newIndex]);
  };
  return (
    <>
      {/* Left Arrow Button */}
      <div
        className="absolute top-1/2 left-20 transform -translate-y-1/2 z-10 cursor-pointer"
        onClick={() => {
          if (swiperRef.current) {
            swiperRef.current.swiper.slidePrev(100); // Go to the previous slide
          }
        }}
      >
        <ArrowLeftIcon className="w-20 h-20 text-white" />
      </div>
      {/* Right Arrow Button */}
      <div
        className="absolute top-1/2 right-20 transform -translate-y-1/2 z-10 cursor-pointer"
        onClick={() => {
          if (swiperRef.current) {
            swiperRef.current.swiper.slideNext(100); // Go to the next slide
          }
        }}
      >
        <ArrowRightIcon className="w-20 h-20 text-white" />
      </div>
      <Swiper
        key={players.map((player) => player.id).join("-")}
        ref={swiperRef}
        effect={"coverflow"}
        grabCursor={true}
        loop={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        initialSlide={0} // Start at slide number 3 (index 2)
        coverflowEffect={{
          rotate: 0,
          stretch: -100,
          depth: 200,
          modifier: 2,
        }}
        resistance={false}
        allowTouchMove={true}
        resistanceRatio={0}
        pagination={true}
        modules={[EffectCoverflow]}
        className=" no-select h-[calc(90%-15rem)] w-[80%] md:h-[calc(90%-4rem)] hidden md:block"
        onTransitionEnd={handleSlideChange}
        onSlideChangeTransitionEnd={handleSlideChangeTransitionEnd}
        slideActiveClass="active-slide"
      >
        {players?.map((player) => (
          <SwiperSlide key={player.id}>
            <PlayerCard isHome={true} player={player} isMini={false} />
            {player.slotname && (
              <div className="absolute bg-black w-3/4 text-yellow-600 text-center -bottom-16 rounded left-1/2 transform -translate-x-1/2 text-lg font-semibold">
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
      {/* Show Details for the Selected Player */}
      {selectedPlayer && (
        <div className=" no-select hidden md:block mt-4">
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

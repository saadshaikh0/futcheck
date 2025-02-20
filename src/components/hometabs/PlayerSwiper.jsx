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
import { useHandleResize } from "../utils/hooks";

const PlayerSwiper = forwardRef(({ players, selectedTab }, ref) => {
  const swiperRef = useRef(null);
  const dispatch = useDispatch();
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [arrowPosition, setArrowPosition] = useState({ top: "50%" });
  const isMobile = useHandleResize();
  useImperativeHandle(ref, () => ({
    goToSlide1: () => {
      if (swiperRef.current) {
        swiperRef.current.swiper.slideTo(0);
      }
    },
  }));
  // Function to update the arrow position
  const updateArrowPosition = () => {
    if (swiperRef.current) {
      const rect = swiperRef.current.getBoundingClientRect();
      setArrowPosition({ top: `${rect.top + rect.height / 2}px` });
    }
  };

  useEffect(() => {
    updateArrowPosition(); // Initial positioning

    const observer = new ResizeObserver(() => {
      updateArrowPosition();
    });

    if (swiperRef.current?.el) {
      observer.observe(swiperRef.current.el);
    }

    window.addEventListener("resize", updateArrowPosition);

    return () => {
      window.removeEventListener("resize", updateArrowPosition);
      observer.disconnect();
    };
  }, [players]);

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
        style={{
          top: arrowPosition.top,
          transform: isMobile ? "translateY(-300%)" : "translateY(-150%)",
        }}
        className="absolute top-1/3  md:top-1/2 left-0 md:left-20 transform -translate-y-1/2 z-10 cursor-pointer"
        onClick={() => {
          if (swiperRef.current) {
            swiperRef.current.swiper.slidePrev(100); // Go to the previous slide
          }
        }}
      >
        <ArrowLeftIcon className="md:w-20 md:h-20 w-10 h-10 text-white" />
      </div>
      {/* Right Arrow Button */}
      <div
        style={{
          top: arrowPosition.top,
          transform: isMobile ? "translateY(-300%)" : "translateY(-150%)",
        }}
        className="absolute  top-1/3  md:top-1/2 right-0 md:right-20 transform -translate-y-1/2 z-10 cursor-pointer"
        onClick={() => {
          if (swiperRef.current) {
            swiperRef.current.swiper.slideNext(100); // Go to the next slide
          }
        }}
      >
        <ArrowRightIcon className="md:w-20 md:h-20 w-10 h-10 text-white" />
      </div>
      <Swiper
        key={players.map((player) => player.id).join("-")}
        ref={swiperRef}
        effect={"coverflow"}
        grabCursor={true}
        loop={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        initialSlide={0}
        breakpoints={{
          0: {
            spaceBetween: -80,
            centeredSlides: true,
            effect: "coverflow",
            coverflowEffect: {
              rotate: 0,
              stretch: -100,
              depth: 100,
              modifier: 1.3,
            },
          },
          1024: {
            slidesPerView: "auto",
            spaceBetween: 50,
            centeredSlides: true,

            effect: "coverflow",
            coverflowEffect: {
              rotate: 0,
              stretch: -100,
              depth: 200,
              modifier: 2,
            },
          },
        }}
        resistance={false}
        allowTouchMove={true}
        resistanceRatio={0}
        pagination={true}
        modules={[EffectCoverflow]}
        className=" no-select h-auto w-[80%] md:h-[calc(90%-4rem)] "
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
            <div className="bg-black text-white bg-opacity-80 md:text-2xl text-sm font-bold z-10 flex items-center gap-1 text-center px-5 rounded-lg justify-center absolute md:top-10 top-1 left-1/2 -translate-x-1/2">
              <img
                src={CoinsImg}
                className="md:!w-5 md:h-5 h-3 w-3"
                alt="coins"
              />
              {player?.latest_price?.toLocaleString("en-us")}
              {player?.trend && (
                <span
                  className={`${
                    player?.trend < 0 ? "text-red-500" : "text-green-500"
                  } font-mono md:text-lg text-xs`}
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
        <div className="no-select  md:block">
          <div className="flex flex-col items-center text-sm md:text-xl ">
            <Link
              to={`/player/${selectedPlayer.id}/${selectedPlayer.name?.replace(
                /\s+/g,
                "-"
              )}`}
              onClick={() => {
                dispatch(setPlayer({ ...selectedPlayer }));
              }}
            >
              <button className="bg-purple-900 px-4 md:px-8 rounded-full hover:bg-purple-700 text-white py-2   cursor-pointer">
                Show Details
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
});

export default PlayerSwiper;

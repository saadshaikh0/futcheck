import { useQuery } from "@tanstack/react-query";
import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  fetchLatestPlayers,
  fetchSbcsData,
  fetchTopRatedPlayers,
  fetchAllPlayers, // Import fetchAllPlayers
} from "../api/apiService";
import { buildPlayerUrl, fillZeros } from "./utils/utils";
import CoinsImg from "../assets/coins.png";
import FOOTBALL_STADIUM_IMAGE from "../assets/football_stadium_background.jpg";
import MY_CLUB_BG from "../assets/my_club_background.webp";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import NewSbcCard from "./sbc/NewSbcCard";
import LatestPlayers from "./hometabs/latestPlayers";
import MarqueeSbcCard from "./common/MarqueeSbcCard";
import Footer from "./common/Footer";
import { setPlayer } from "../redux/playerSlice";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import PlayerCard from "./common/PlayerCard";
import RatingSlider from "./common/RatingsSlider"; // Import the RatingSlider component
import { useDebounce } from "@uidotdev/usehooks";

const PlayerSwiper = forwardRef(({ players, handleSlideChange }, ref) => {
  const swiperRef = useRef(null);

  useImperativeHandle(ref, () => ({
    goToSlide1: () => {
      if (swiperRef.current) {
        swiperRef.current.swiper.slideTo(0);
      }
    },
  }));

  return (
    <Swiper
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
          <div className="bg-black text-white bg-opacity-80 text-2xl font-bold z-10 flex items-center gap-1   text-center px-5 rounded-lg justify-center  absolute top-10 left-1/2 -translate-x-1/2">
            <img src={CoinsImg} className="!w-5 h-5" alt="coins" />

            {player?.latest_price?.toLocaleString("en-us")}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
});

const tabs = ["RECENT", "HOT", "RATINGS"];

const NewHomePage = () => {
  const { data: top_rated_players = [] } = useQuery({
    queryKey: ["fetchTopRatedPlayers"],
    queryFn: fetchTopRatedPlayers,
    cacheTime: Infinity,
    staleTime: Infinity,
  });
  const { data: latest_players = [] } = useQuery({
    queryKey: ["fetchLatestPlayers"],
    queryFn: fetchLatestPlayers,
    cacheTime: Infinity,
    staleTime: Infinity,
  });
  const { data: sbcs = [] } = useQuery({
    queryKey: ["fetchSbcs"],
    queryFn: fetchSbcsData,
  });
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("HOT");
  const [selectedRating, setSelectedRating] = useState(81);
  const debouncedRating = useDebounce(selectedRating, 1000);

  const { data: rated_players = [] } = useQuery({
    queryKey: ["fetchAllPlayers", debouncedRating],
    queryFn: () =>
      fetchAllPlayers({
        min_rating: debouncedRating,
        max_rating: debouncedRating,
        simple: true,
        order_by: "latest_price",
        order_direction: "asc",
        exclude_extinct: true,
      }),
    enabled: selectedTab === "RATINGS",
  });

  const [selectedPlayer, setSelectedPlayer] = useState(top_rated_players[0]);

  const currentTimestamp = new Date();
  const players =
    selectedTab === "RECENT"
      ? latest_players
      : selectedTab === "RATINGS"
      ? rated_players
      : top_rated_players;

  useEffect(() => {
    setSelectedPlayer(players[0]);
  }, [players]);

  const handleSlideChange = (swiper) => {
    const newIndex = swiper.activeIndex;
    let players;
    if (selectedTab === "HOT") {
      players = top_rated_players;
    } else if (selectedTab === "IN PACKS") {
      players = top_rated_players;
    } else if (selectedTab === "RATINGS") {
      players = rated_players;
    } else {
      players = latest_players;
    }
    setSelectedPlayer(players[newIndex]);
  };

  const playerSwiperRef = useRef(null);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    if (playerSwiperRef.current) {
      playerSwiperRef.current.goToSlide1();
    }
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  useEffect(() => {
    if (playerSwiperRef.current) {
      playerSwiperRef.current.goToSlide1();
    }
  }, [debouncedRating]);
  return (
    <div
      className={`home-page relative min-h-[calc(100vh-4rem)] bg-black md:bg-fixed z-10 flex-grow  w-full `}
      style={{
        backgroundImage:
          window.innerWidth >= 768 ? `url(${FOOTBALL_STADIUM_IMAGE})` : "none", // Only apply on md+ screens
        backgroundAttachment: window.innerWidth >= 768 ? "fixed" : "scroll",
      }}
    >
      <div
        className={`absolute inset-0 bg-black bg-fixed h-full opacity-70`}
      ></div>

      <div className="w-full h-full  absolute z-10">
        <div
          className="text-xl md:text-4xl text-center font-bold pt-10 z-100 grid grid-cols-3 "
          style={{ color: "white" }}
        >
          {tabs.map((tab) => {
            return (
              <span
                onClick={() => handleTabChange(tab)}
                className={`cursor-pointer  ${
                  selectedTab == tab ? "opacity-100" : "opacity-50"
                }`}
              >
                {tab}
              </span>
            );
          })}
        </div>

        {selectedTab === "RATINGS" && (
          <div className="flex w-3/4 md:w-2/4 pt-5 pb-2 mx-auto md:absolute md:top-32 md:left-1/2 md:-translate-x-1/2 justify-center items-center ">
            <RatingSlider
              min={81}
              max={91}
              value={selectedRating}
              onChange={handleRatingChange}
            />
          </div>
        )}

        <PlayerSwiper
          ref={playerSwiperRef}
          players={players}
          handleSlideChange={handleSlideChange}
        />

        {selectedPlayer?.id && (
          <div className="hidden md:block">
            <div className="flex flex-col text-white text-2xl text-center font-bold">
              <Link
                to={`/player/${
                  selectedPlayer.id
                }/${selectedPlayer.name?.replace(/\s+/g, "-")}`}
                onClick={() => {
                  selectedPlayer["bg_color"] = fillZeros(
                    selectedPlayer["bg_color"]
                  );
                  dispatch(setPlayer({ ...selectedPlayer }));
                }}
              >
                <div className="cursor-pointer">Show Details</div>
              </Link>
            </div>
          </div>
        )}
        <div className="mt-4 px-4 md:hidden">
          <LatestPlayers players={players} />
        </div>
        <div
          style={{
            background: `url(${MY_CLUB_BG}) `,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="w-full relative  mt-10 px-10 py-5 text-gray-200"
        >
          {" "}
          <div className={`absolute inset-0 bg-black  opacity-90`}></div>
          <div className="relative">
            <h2 className="text-center  font-medium text-4xl">LATEST SBCS</h2>
            <div className=" mt-5 gap-5 hidden md:block">
              <div className="p-5 px-0 overflow-hidden w-full  h-[35vh]  rounded-md relative">
                <div className="marquee  text-white   gap-8">
                  {sbcs
                    .sort((a, b) => b.releaseTime - a.releaseTime)

                    .filter((sbc) => {
                      return (
                        (sbc.endTimeStamp &&
                          new Date(sbc.endTimeStamp) >= currentTimestamp) ||
                        sbc.endTime == 0
                      );
                    })
                    .slice(0, 5)
                    .map((sbc, index) => {
                      return (
                        <div className=" ">
                          <MarqueeSbcCard data={sbc} />
                        </div>
                      );
                    })}
                  {sbcs
                    .sort((a, b) => b.releaseTime - a.releaseTime)

                    .filter((sbc) => {
                      return (
                        (sbc.endTimeStamp &&
                          new Date(sbc.endTimeStamp) >= currentTimestamp) ||
                        sbc.endTime == 0
                      );
                    })
                    .slice(0, 5)
                    .map((sbc, index) => {
                      return (
                        <div className="">
                          <MarqueeSbcCard data={sbc} />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 md:hidden mt-2 ">
              {sbcs
                .sort((a, b) => b.releaseTime - a.releaseTime)
                .filter((sbc) => {
                  return (
                    (sbc.endTimeStamp &&
                      new Date(sbc.endTimeStamp) >= currentTimestamp) ||
                    sbc.endTime == 0
                  );
                })
                .slice(0, 5)
                .map((sbc, index) => {
                  return (
                    <div className=" ">
                      <NewSbcCard data={sbc} />
                    </div>
                  );
                })}
            </div>
            <div className="flex justify-center items-center ">
              <Link to={"/sbc/"}>
                <div className="bg-white text-black px-4 py-2 mt-5 font-bold rounded-lg cursor-pointer">
                  {" "}
                  Show All SBCs
                </div>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default NewHomePage;

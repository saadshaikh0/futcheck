import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import {
  fetchLatestPlayers,
  fetchSbcsData,
  fetchTopRatedPlayers,
} from "../api/apiService";
import { buildPlayerUrl, fillZeros } from "./utils/utils";

import FOOTBALL_STADIUM_IMAGE from "../assets/football_stadium_background.jpg";
import MY_CLUB_BG from "../assets/my_club_background.webp";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { setPlayer } from "../redux/playerSlice";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import NewSbcCard from "./sbc/NewSbcCard";
import PlayerCard from "./common/PlayerCard";
import LatestPlayers from "./hometabs/latestPlayers";
import MarqueeSbcCard from "./common/MarqueeSbcCard";
import Footer from "./common/Footer";

const tabs = ["RECENT", "HOT", "IN PACKS"];
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

  const [selectedPlayer, setSelectedPlayer] = useState(top_rated_players[0]);
  const player_id = 0;
  const text_color = selectedPlayer?.text_color;
  const bg_color = selectedPlayer?.bg_color;
  const swiperRef = useRef(null);

  const currentTimestamp = new Date();
  const players = selectedTab == "RECENT" ? latest_players : top_rated_players;
  useEffect(() => {
    setSelectedPlayer(players[0]);
  }, [players]);

  const goToSlide1 = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.activeIndex = 0;
    }
  };
  const handleSlideChange = (swiper) => {
    const newIndex = swiper.activeIndex;
    let players;
    if (selectedTab == "HOT") {
      players = top_rated_players;
    } else if (selectedTab == "IN PACKS") {
      players = top_rated_players;
    } else {
      players = latest_players;
    }
    setSelectedPlayer(players[newIndex]);
  };

  return (
    <div
      className="home-page relative min-h-[calc(100vh-4rem)] flex-grow  w-full bg-fixed  "
      style={{
        background: `url(${FOOTBALL_STADIUM_IMAGE}) `,
        backgroundAttachment: "fixed",
      }}
    >
      <div className={`absolute inset-0 bg-black  opacity-70`}></div>

      <div className="w-full h-full  absolute z-10">
        <div
          className="text-xl md:text-4xl text-center font-bold pt-10 z-100 grid grid-cols-3 "
          style={{ color: "white" }}
        >
          {tabs.map((tab) => {
            return (
              <span
                onClick={() => {
                  goToSlide1();
                  setSelectedTab(tab);
                }}
                className={`cursor-pointer  ${
                  selectedTab == tab ? "opacity-100" : "opacity-50"
                }`}
              >
                {tab}
              </span>
            );
          })}
        </div>

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
          {players?.map((player) => {
            return (
              <SwiperSlide key={player.id}>
                <PlayerCard isHome={true} player={player} isMini={false} />
              </SwiperSlide>
            );
          })}
        </Swiper>
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
            <div className=" mt-5 gap-5">
              <div className="p-5 px-0 overflow-hidden w-full  h-[35vh]  rounded-md relative">
                <div className="marquee  text-white   gap-8">
                  {sbcs

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
            <div className="flex justify-center items-center ">
              <div className="bg-white text-black px-4 py-2 mt-5 font-bold rounded-lg cursor-pointer">
                {" "}
                Show All SBCs
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
   
    </div>
  );
};

export default NewHomePage;

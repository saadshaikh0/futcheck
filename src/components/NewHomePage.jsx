import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import {
  fetchLatestPlayers,
  fetchSbcsData,
  fetchTopRatedPlayers,
} from "../api/apiService";
import { buildPlayerUrl, fillZeros } from "./utils/utils";
import { getTraitIcon } from "./utils/traitsvg";
import { WORK_RATE } from "./utils/constants";
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
import SbcCard from "./sbc/SbcCard";
import NewSbcCard from "./sbc/NewSbcCard";
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
      <div class="font-bold leading-none text-[1.4em] absolute top-[63.6%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[75.2%] whitespace-nowrap overflow-hidden text-overflow-ellipsis text-center">
        {c_name != "None" ? c_name : name}
      </div>
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

  const goToSlide1 = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.activeIndex = 0;
    }
  };
  const handleSlideChange = (swiper) => {
    const newIndex = swiper.activeIndex;

    setSelectedPlayer(top_rated_players[newIndex]);
  };
  const currentTimestamp = new Date();
  const players = selectedTab == "RECENT" ? latest_players : top_rated_players;
  return (
    <div
      className="home-page relative h-screen w-full bg-fixed"
      style={{
        background: `url(${FOOTBALL_STADIUM_IMAGE}) `,
        backgroundAttachment: "fixed",
      }}
    >
      <div className={`absolute inset-0 bg-black  opacity-70`}></div>

      <div className="w-full h-full absolute z-10">
        <div
          className="text-4xl text-center font-bold pt-10 z-100 grid grid-cols-3 "
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
          {/* <span className="opacity-50 cursor-pointer"> RECENT</span>
          <span className="cursor-pointer"> HOT</span>
          <span className="opacity-50 cursor-pointer"> IN PACKS</span> */}
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
          className="h-[75%]"
          onSlideChange={handleSlideChange}
          slideActiveClass="active-slide"
        >
          {players?.map((player) => {
            return (
              <SwiperSlide>
                <PlayerImage player={player} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        {selectedPlayer?.id && (
          <div className="">
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
        <div className="w-full bg-white mt-10 px-10 py-5">
          <h2 className="text-center text-black font-bold text-4xl">
            AI Powered SBC Solutions
          </h2>
          <div className="grid grid-cols-2 mt-10 gap-5">
            <div>
              <p className="text-2xl font-medium">
                At Futcheck, we leverage cutting-edge AI algorithms to
                revolutionize the way you complete Squad Building Challenges
                (SBCs). Our advanced system meticulously analyzes player data,
                market trends, and squad requirements to formulate the most
                cost-effective squad solutions. This ensures you can swiftly and
                effortlessly complete SBCs without the usual hassle and expense.
                Say goodbye to the tedious task of scouring the market for the
                best deals; our AI does the heavy lifting for you, allowing you
                to focus on enjoying the game. Experience the convenience and
                efficiency of AI-powered SBC solutions, exclusively at Futcheck.
              </p>
              <div className="flex justify-center">
                <p className="text-center mt-10 px-3 py-2 cursor-pointer rounded-md bg-black text-white">
                  Show All SBCs
                </p>
              </div>
            </div>
            <div className="p-5 grid grid-cols-2 gap-4 overflow-auto h-[40vh] bg-gray-950 rounded-md scrollbar-thin">
              {sbcs
                .filter((sbc) => {
                  return (
                    (sbc.endTimeStamp &&
                      new Date(sbc.endTimeStamp) >= currentTimestamp) ||
                    sbc.endTime == 0
                  );
                })
                .map((sbc) => {
                  return <NewSbcCard data={sbc} />;
                })}
            </div>
          </div>
        </div>
        <div
          className="w-full  relative pb-10"
          style={{
            background: `url(${MY_CLUB_BG}) `,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className={`absolute inset-0 bg-black  opacity-60`}></div>
          <div className="relative">
            <h1 className="text-center text-white text-5xl font-medium py-10">
              MY CLUB
            </h1>
            <div className="grid grid-cols-[1fr] px-10">
              <div></div>
              <div className="text-white text-2xl font-thin">
                Discover unparalleled insights into your club with "My Club."
                This feature provides a comprehensive analysis of your club's
                players, including the total value and rating distribution. "My
                Club" also offers the ability to generate Squad Building
                Challenge (SBC) solutions using your club players. You'll know
                exactly which SBCs you can complete with your current squad and,
                if not, how much more you need to invest to get there. All of
                this is made possible through a seamless Chrome extension that
                automatically uploads your club player details to our database,
                ensuring you always have the most up-to-date information at your
                fingertips. Unlock the full potential of your club, make
                informed decisions with ease, and maximize your team's
                performance with "My Club."
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHomePage;

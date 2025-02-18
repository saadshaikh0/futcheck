import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  fetchLatestPlayers,
  fetchSbcsData,
  fetchTopRatedPlayers,
  fetchTopEvolvedPlayers,
} from "../api/apiService";

import PlayerSwiper from "./hometabs/PlayerSwiper";
import TabsHeader from "./hometabs/TabsHeader";
import SBCSection from "./hometabs/SBCSection";
import Footer from "./common/Footer";

import FOOTBALL_STADIUM_IMAGE from "../assets/726adb2420c6698e95b64a931250b0e63ac18633.png";
import AllPlayersSection from "./hometabs/AllPlayersSection";
import { useHandleResize } from "./utils/hooks";

const tabs = ["RECENT", "HOT", "EVOS"];

const NewHomePage = () => {
  const isMobile = useHandleResize();
  const { data: topRatedPlayers = [] } = useQuery({
    queryKey: ["fetchTopRatedPlayers"],
    queryFn: fetchTopRatedPlayers,
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  const { data: latestPlayers = [] } = useQuery({
    queryKey: ["fetchLatestPlayers"],
    queryFn: fetchLatestPlayers,
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  const { data: topEvolvedPlayers = [] } = useQuery({
    queryKey: ["fetchTopEvolvedPlayers"],
    queryFn: fetchTopEvolvedPlayers,
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  const { data: sbcs = [] } = useQuery({
    queryKey: ["fetchSbcs"],
    queryFn: fetchSbcsData,
  });

  const [selectedTab, setSelectedTab] = useState("HOT");
  const playerSwiperRef = useRef(null);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    if (playerSwiperRef.current) {
      playerSwiperRef.current.goToSlide1();
    }
  };

  let players = [];
  if (selectedTab === "RECENT") {
    players = latestPlayers;
  } else if (selectedTab === "HOT") {
    players = topRatedPlayers;
  } else if (selectedTab === "EVOS") {
    players = topEvolvedPlayers;
  }

  return (
    <div
      className="home-page relative min-h-[calc(100vh-4rem)] bg-black z-10 flex-grow w-full bg-no-repeat bg-center md:bg-fixed"
      style={{
        backgroundImage: `url(${FOOTBALL_STADIUM_IMAGE})`,
        backgroundSize: isMobile ? "220%" : "cover", // Adjust zoom level on mobile
        backgroundPosition: isMobile ? "top center" : "center center", // Adjust position
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[#1E0B20] h-full opacity-60 md:opacity-55"></div>

      {/* Content Wrapper */}
      <div className="w-full h-full absolute z-10">
        <TabsHeader
          tabs={tabs}
          selectedTab={selectedTab}
          handleTabChange={handleTabChange}
        />

        {/* Swiper Section */}
        <PlayerSwiper
          selectedTab={selectedTab}
          ref={playerSwiperRef}
          players={players}
        />

        {/* Gradient Section & Additional Content */}
        <div
          className="w-full"
          style={{
            background:
              "linear-gradient(168deg,     rgb(35, 8, 58) 40%,     rgba(49, 10, 82, 0.5) 60%,     rgba(0, 0, 0, 0.8) 80%,     black 100%)",
          }}
        >
          <AllPlayersSection />
          <SBCSection sbcs={sbcs} />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default NewHomePage;

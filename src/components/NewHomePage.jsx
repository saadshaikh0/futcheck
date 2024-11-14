// NewHomePage.jsx

import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  fetchLatestPlayers,
  fetchSbcsData,
  fetchTopRatedPlayers,
} from "../api/apiService";

import PlayerSwiper from "./hometabs/PlayerSwiper";
import LatestPlayers from "./hometabs/latestPlayers";
import RatingsSection from "./hometabs/RatingsSection";
import TabsHeader from "./hometabs/TabsHeader"; // Import TabsHeader
import SBCSection from "./hometabs/SBCSection"; // Import SBCSection
import Footer from "./common/Footer";

import FOOTBALL_STADIUM_IMAGE from "../assets/football_stadium_background.jpg";

const tabs = ["RECENT", "HOT", "RATINGS"];

const NewHomePage = () => {
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

  const players = selectedTab === "RECENT" ? latestPlayers : topRatedPlayers;

  return (
    <div
      className="home-page relative min-h-[calc(100vh-4rem)] bg-black md:bg-fixed z-10 flex-grow w-full"
      style={{
        backgroundImage:
          window.innerWidth >= 768 ? `url(${FOOTBALL_STADIUM_IMAGE})` : "none",
        backgroundAttachment: window.innerWidth >= 768 ? "fixed" : "scroll",
      }}
    >
      <div className="absolute inset-0 bg-black bg-fixed h-full opacity-70"></div>

      <div className="w-full h-full absolute z-10">
        {/* Tabs Header */}
        <TabsHeader
          tabs={tabs}
          selectedTab={selectedTab}
          handleTabChange={handleTabChange}
        />

        {/* Content Based on Selected Tab */}
        {selectedTab === "RATINGS" ? (
          <RatingsSection />
        ) : (
          <>
            <PlayerSwiper ref={playerSwiperRef} players={players} />
            {/* Show LatestPlayers on Mobile */}
            <div className="mt-4 px-4 md:hidden">
              <LatestPlayers players={players} />
            </div>
          </>
        )}

        {/* SBC Section */}
        <SBCSection sbcs={sbcs} />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default NewHomePage;

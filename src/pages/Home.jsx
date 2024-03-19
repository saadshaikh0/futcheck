import React from "react";
import PlayerView from "../components/playerView";
import { useSelector } from "react-redux";
import HomePage from "../components/homepage";

const Home = () => {
  const player = useSelector((state) => state.player.details);

  return <>{player.id ? <PlayerView /> : <HomePage />}</>;
};

export default Home;

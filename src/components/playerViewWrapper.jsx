import React, { useEffect } from "react";
import PlayerView from "./playerView";
import { fetchPlayerDetails } from "../api/apiService";
import { useDispatch, useSelector } from "react-redux";
import { setPlayer } from "../redux/playerSlice";
import { useParams } from "react-router-dom";
import ReactGA from "react-ga";

const PlayerViewWrapper = () => {
  ReactGA.initialize("G-RD6LGLC1LD");
  ReactGA.pageview(window.location.pathname);
  const { playerId } = useParams();
  const player = useSelector((state) => state.player.details);
  const { id } = player;
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      if (!id) {
        const data = await fetchPlayerDetails(playerId);

        dispatch(setPlayer({ ...data[0] }));
      }
    }
    fetchData();
  }, [id]);
  return <PlayerView />;
};

export default PlayerViewWrapper;

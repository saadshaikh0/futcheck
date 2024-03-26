import React, { useEffect } from "react";
import PlayerView from "./playerView";
import { fetchPlayerDetails } from "../api/apiService";
import { useDispatch, useSelector } from "react-redux";
import { setPlayer } from "../redux/playerSlice";
import { useParams } from "react-router-dom";

const PlayerViewWrapper = () => {
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

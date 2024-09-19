import React, { useEffect } from "react";
import PlayerDashboard from "./PlayerDashboard/playerDashboard";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayerDetails } from "../api/apiService";
import { setPlayer } from "../redux/playerSlice";
import { useParams } from "react-router-dom";

const PlayerDashboardWrapper = () => {
  const { playerId } = useParams();
  const player = useSelector((state) => state.player.details);
  const { id } = player;
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      if (!id || id !== playerId) {
        const data = await fetchPlayerDetails(playerId);

        dispatch(setPlayer({ ...data[0] }));
      }
    }
    fetchData();
  }, [id]);

  if (!id) {
    return <div>Loading</div>;
  }
  return (
    <div >
      <PlayerDashboard />
    </div>
  );
};

export default PlayerDashboardWrapper;

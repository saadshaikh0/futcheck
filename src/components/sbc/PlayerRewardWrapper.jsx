import React, { useEffect, useState } from "react";
import PlayerCard from "../common/PlayerCard"; // Adjust the import path as needed
import { fetchPlayerDetails } from "../../api/apiService";

const PlayerRewardWrapper = ({ id }) => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchPlayerDetails(id);
      setPlayer(data[0]);
    }
    fetchData();
  }, [id]);

  if (!player) {
    return <div>Loading...</div>;
  }

  return (
    <div className="md:max-h-[20vh]">
      <PlayerCard player={player} isMini={false} />
    </div>
  );
};

export default PlayerRewardWrapper;

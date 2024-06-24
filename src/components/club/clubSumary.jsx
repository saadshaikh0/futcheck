import React, { useEffect, useState } from "react";
import ClubValue from "./Cards/clubValue";
import ClubRatingsCount from "./Cards/clubRatingsCount";
import ClubRarityDistribution from "./Cards/clubRarityDistribution";
import ClubCommonSBC from "./Cards/clubCommonSBCs";
import { fetchAllPlayers } from "../../api/apiService";
import { useQuery } from "@tanstack/react-query";
import {
  calculateRatingsCount,
  calculateClubValue,
  calculateRarityDistribution,
  calculateCommonSBCs,
} from "./clubUtils";

const ClubSummary = () => {
  const { data = { players: [], total_pages: 0 }, isLoading } = useQuery({
    queryKey: ["fetchAllPlayers", {}, true],
    queryFn: () => fetchAllPlayers({}, true),
  });
  const [ratingsDistribution, setRatingsDistribution] = useState({});
  const [clubValue, setClubValue] = useState({});
  const [rarityDistribution, setRarityDistribution] = useState([]);
  const [commonSbcs, setCommonSbcs] = useState({});

  useEffect(() => {
    if (data.players.length > 0) {
      setRatingsDistribution(calculateRatingsCount(data.players));
      setClubValue(calculateClubValue(data.players));
      setRarityDistribution(calculateRarityDistribution(data.players));
      setCommonSbcs(calculateCommonSBCs(data.players));
    }
  }, [data.players.length]);

  if (isLoading) {
    return <div>Data is Loading</div>;
  }
  return (
    <div>
      <div className="flex flex-col h-full gap-4">
        <div className="grid lg:grid-cols-[1fr_3fr] gap-4">
          <div className="w-full mx-auto bg-gray-900 shadow-lg rounded-md overflow-hidden">
            <div className="px-6 py-4 mb-2">
              <h2 className="text-lg   font-bold text-white ">Club Value</h2>
              <div className="flex justify-center">
                <ClubValue clubValue={clubValue} />
              </div>
            </div>
          </div>
          <div className="w-full mx-auto bg-gray-900 shadow-lg rounded-md overflow-hidden">
            <div className="px-2 pt-4">
              <h2 className="text-lg pl-4   font-bold text-white mb-4 ">
                Ratings Count
              </h2>
              <div className="w-full h-[20vh]">
                <ClubRatingsCount ratingsCount={ratingsDistribution} />
              </div>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-[3fr_5fr] gap-4">
          <div className="w-full mx-auto bg-gray-900 shadow-lg rounded-md overflow-hidden">
            <div className="px-6 py-4 mb-2">
              <h2 className="text-lg pl-4   font-bold text-white mb-4 ">
                Rarity Distribution
              </h2>
              <ClubRarityDistribution rarityDistribution={rarityDistribution} />
            </div>
          </div>
          <div className="w-full mx-auto bg-gray-900 shadow-lg rounded-md overflow-hidden">
            <div className="px-6 py-4 mb-2">
              <h2 className="text-lg pl-4   font-bold text-white mb-4 ">
                Upgrade SBCs Count
              </h2>
              <ClubCommonSBC commonSbcs={commonSbcs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubSummary;

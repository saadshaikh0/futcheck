import React, { useState } from "react";
import {
  buildDynamicUrl,
  getTimeUntilExpiration,
  setidUntilExpiration,
  timeAgo,
} from "../utils/utils";
import { Link } from "react-router-dom";
import CoinsImg from "../../assets/coins.png";
import PlayerRewardWrapper from "./PlayerRewardWrapper";

const NewSbcCard = ({ data }) => {
  const {
    name,
    description,
    challengesCount,
    setImageId,
    endTimeStamp,
    endTime,
    totalCost,
    setid,
    rewards,
  } = data;
  const [expanded, setExpanded] = useState(false);

  // Check if rewards is an array and contains an object with itemType 'player'
  const playerReward =
    Array.isArray(rewards) &&
    rewards.find((reward) => reward?.itemType === "player");
  return (
    <div className="bg-[#310A52] whitespace-pre-wrap w-[90%] rounded-2xl h-[60vh] flex flex-col items-center text-white">
      <div className="flex flex-col md:grid md:grid-cols-[2fr_1fr] flex-grow">
        {/* Left Section */}
        <div className="flex flex-grow flex-col order-2 md:order-1 py-5 px-4">
          <p className="text-white text-lg font-bold text-start">{name}</p>

          {/* Description with toggle */}
          <p
            className="text-[#B0B0B0] max-h-32  overflow-y-auto text-start flex-grow cursor-pointer"
            onClick={() => setExpanded(true)}
          >
            {expanded
              ? description
              : description.length > 70
              ? `${description.slice(0, 70)}...`
              : description}
          </p>

          {/* Stats Section */}
          <div className="grid grid-cols-3 text-white text-xs mt-3 font-bold text-center items-end">
            <div className="flex flex-col">
              <span>Challenges</span>
              <span>{challengesCount}</span>
            </div>
            <div className="flex flex-col">
              <span>Expires In</span>
              <span>
                {endTime == 0
                  ? "No Expiry"
                  : !endTimeStamp
                  ? "Expired"
                  : getTimeUntilExpiration(endTimeStamp)}
              </span>
            </div>
            <div className="flex flex-col">
              <span>Repeatable</span>
              <span>-</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col h-3/5 md:mt-0 md:h-auto w-2/3 md:w-auto mx-auto order-1 md:order-2 items-center justify-center">
          {playerReward ? (
            <div
              key={playerReward.id}
              className="flex flex-col justify-center items-center"
            >
              <PlayerRewardWrapper id={playerReward.id} isMini={false} />
              <div className="flex justify-center items-center gap-2 -mt-3 pb-2">
                <img src={CoinsImg} className="mt-1" width={20} />
                {totalCost?.toLocaleString("en-US")}
              </div>
            </div>
          ) : (
            <div>
              <img
                src={buildDynamicUrl("sbc", setid)}
                alt="Serie A TOTS Upgrade"
                loading="lazy"
              />
              <div className="flex justify-center items-center gap-2 -mt-3 pb-2">
                <img src={CoinsImg} className="mt-1" width={20} />
                {totalCost?.toLocaleString("en-US")}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <Link className="w-full" to={`/sbc/${setid}`}>
        <div className="bg-purple-900 rounded-b-2xl w-full cursor-pointer py-2">
          <p className="text-center font-bold">Show Challenges</p>
        </div>
      </Link>
    </div>
  );
};

export default NewSbcCard;

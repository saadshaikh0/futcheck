import React from "react";
import {
  buildDynamicUrl,
  getTimeUntilExpiration,
  timeAgo,
} from "../utils/utils";
import { Link } from "react-router-dom";
import CoinsImg from "../../assets/coins.png";

const MarqueeSbcCard = ({ data }) => {
  const {
    name,
    description,
    challengesCount,
    setImageId,
    endTimeStamp,
    endTime,
    totalCost,
    setid,
  } = data;
  return (
    <Link to={`/sbc/${setid}`}>
      <div className="bg-[#310A52] rounded-2xl h-full w-[600px] flex flex-col items-center text-white">
        <div className="grid w-[600px] grid-cols-[2fr_1fr] flex-grow ">
          <div className="flex w-full flex-col py-5 px-4 gap-3">
            <p className="text-white text-lg font-bold text-center">{name}</p>
            <p className="text-[#B0B0B0] text-wrap flex-grow">{description}</p>
            <div className="grid grid-cols-3 text-white font-bold text-center ">
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
          <div className="flex w-full flex-col items-center">
            <img
              src={buildDynamicUrl("sbc", setid)}
              alt="Serie A TOTS Upgrade"
              loading="lazy"
            />
            <div className="flex jusitfy-center items-center gap-2 -mt-3 pb-2">
              <img src={CoinsImg} className="mt-1" width={20} />
              {totalCost?.toLocaleString("en-US")}
            </div>
          </div>
        </div>
        <div className="bg-purple-900 rounded-b-2xl bg-opacity-70 w-full cursor-pointer py-2 ">
          <p className="text-center font-bold">Show Challenges</p>
        </div>
      </div>
    </Link>
  );
};

export default MarqueeSbcCard;

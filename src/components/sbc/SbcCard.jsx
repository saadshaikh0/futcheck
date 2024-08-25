import React from "react";
import {
  buildSbcImageUrl,
  getTimeUntilExpiration,
  timeAgo,
} from "../utils/utils";
import { Link } from "react-router-dom";

const SbcCard = ({ data }) => {
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
    <>
      <div className="bg-gray-800 h-full rounded-md grid grid-rows-[auto_1fr] items-center text-white">
        <Link to={`/sbc/${setid}`}>
          {" "}
          <div className="bg-gray-900 rounded-t py-2 px-4 relative text-white grid grid-cols-[1fr_auto] gap-2">
            <h2 className="text-xl font-bold">{name}</h2>
            <div className="self-end text-right flex gap-2">
              <div className="bg-gray-700 rounded font-bold text-sm px-2 py-1 flex items-center">
                <span className="price-coin price-coin--size-xs mr-2"></span>
                {totalCost.toLocaleString("en-US")}
              </div>
            </div>
          </div>
        </Link>
        <div className="grid grid-cols-[1fr_2fr] items-center p-2 gap-2">
          <div className="mx-auto w-full max-lg:max-w-[142px] max-w-[180px]">
            <a href="/sbc/upgrades/24-880-serie-a-tots-upgrade/">
              {" "}
              <img
                src={buildSbcImageUrl(setImageId)}
                alt="Serie A TOTS Upgrade"
                loading="lazy"
              />
            </a>{" "}
          </div>
          <div>
            <p className="text-sm mb-3">{description}</p>
            <div className="bg-gray-900 rounded px-2 py-1  ">
              <div className="flex justify-between items-center gap-2">
                <div className="grid grid-cols-[17px_1fr] gap-2 items-center">
                  <div className="w-[15px]">
                    <img
                      src="https://assets.fut.gg/files/site/pack.19b841469cbf42050e7d.webp"
                      className="w-full h-full object-contain"
                      alt="Pack"
                      width="20"
                    />
                  </div>
                  <p className="text-xs text-white">
                    {" "}
                    1x Serie A TOTS Guarantee
                    <span className="text-lighter-gray text-xxs">
                      [UNTRADEABLE]
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="grid mt-1 gap-1 md:grid-cols-2 md:mt-2 md:gap-2">
              <a
                href="/sbc/upgrades/24-880-serie-a-tots-upgrade/"
                className="
        bg-gray-900 rounded py-2 max-md:flex max-md:justify-between max-md:items-center max-md:pr-2 max-md:py-1
 hover:bg-orange group     "
              >
                <span className="block text-center text-lighter-gray font-bold px-2 text-xxs xl:text-sm group-hover:text-white uppercase">
                  Challenges
                </span>
                <span className="block text-center font-bold text-md text-white max-md:text-sm">
                  {challengesCount}
                </span>
              </a>
              <div
                className="
        bg-gray-900 rounded py-2 max-md:flex max-md:justify-between max-md:items-center max-md:pr-2 max-md:py-1
    "
              >
                <span className="block text-center text-lighter-gray font-bold px-2 text-xxs xl:text-sm group-hover:text-white uppercase">
                  Expires In
                </span>
                <span className="block text-center font-bold text-md text-white max-md:text-sm">
                  {endTime == 0
                    ? "No Expiry"
                    : !endTimeStamp
                    ? "Expired"
                    : getTimeUntilExpiration(endTimeStamp)}
                </span>
              </div>
              <div
                className="
        bg-gray-900 rounded py-2 max-md:flex max-md:justify-between max-md:items-center max-md:pr-2 max-md:py-1
 max-md:hidden     "
              >
                <span className="block text-center text-lighter-gray font-bold px-2 text-xxs xl:text-sm group-hover:text-white uppercase">
                  Repeatable
                </span>
                <span className="block text-center font-bold text-md text-white max-md:text-sm">
                  -
                </span>
              </div>
              <div
                className="
        bg-gray-900 rounded py-2 max-md:flex max-md:justify-between max-md:items-center max-md:pr-2 max-md:py-1
 max-md:hidden     "
              >
                <span className="block text-center text-lighter-gray font-bold px-2 text-xxs xl:text-sm group-hover:text-white uppercase">
                  Refreshes In
                </span>
                <span className="block text-center font-bold text-md text-white max-md:text-sm">
                  -
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SbcCard;

// SBCSection.jsx

import React from "react";
import { Link } from "react-router-dom";
import MarqueeSbcCard from "../common/MarqueeSbcCard";
import NewSbcCard from "../sbc/NewSbcCard";
import MY_CLUB_BG from "../../assets/my_club_background.webp";

const SBCSection = ({ sbcs }) => {
  const currentTimestamp = new Date();

  const filteredSbcs = sbcs
    .sort((a, b) => b.releaseTime - a.releaseTime)
    .filter((sbc) => {
      return (
        (sbc.endTimeStamp && new Date(sbc.endTimeStamp) >= currentTimestamp) ||
        sbc.endTime === 0
      );
    })
    .slice(0, 5);

  return (
    <div
      // style={{
      //   background: `url(${MY_CLUB_BG})`,
      //   backgroundSize: "cover",
      //   backgroundRepeat: "no-repeat",
      // }}
      style={{
        background: "transparent",
      }}
      className="w-full relative px-10 py-5 text-gray-200"
    >
      {/* <div className="absolute inset-0 bg-black opacity-90"></div> */}
      <div className="relative">
        <h2 className="text-center font-medium text-4xl">LATEST SBCS</h2>
        <div className="mt-5 gap-5 hidden md:block">
          <div className="p-5 px-0 overflow-hidden w-full h-[35vh] rounded-md relative">
            <div className="marquee text-white gap-8">
              {filteredSbcs.map((sbc, index) => (
                <div key={index}>
                  <MarqueeSbcCard data={sbc} />
                </div>
              ))}
              {filteredSbcs.map((sbc, index) => (
                <div key={index + 5}>
                  <MarqueeSbcCard data={sbc} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 md:hidden mt-2">
          {filteredSbcs.map((sbc, index) => (
            <div key={index}>
              <NewSbcCard data={sbc} />
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center">
          <Link to="/sbc/">
            <div className="bg-white text-black px-4 py-2 mt-5 font-bold rounded-lg cursor-pointer">
              Show All SBCs
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SBCSection;

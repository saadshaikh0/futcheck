import React, { useRef } from "react";
import { Link } from "react-router-dom";
import MarqueeSbcCard from "../common/MarqueeSbcCard";
import NewSbcCard from "../sbc/NewSbcCard";
import MY_CLUB_BG from "../../assets/my_club_background.webp";
import { useHandleResize } from "../utils/hooks";

const SBCSection = ({ sbcs }) => {
  const currentTimestamp = new Date();
  const isMobile = useHandleResize();
  const scrollRef = useRef(null);

  const filteredSbcs = sbcs
    .sort((a, b) => b.releaseTime - a.releaseTime)
    .filter((sbc) => {
      return (
        (sbc.endTimeStamp && new Date(sbc.endTimeStamp) >= currentTimestamp) ||
        sbc.endTime === 0
      );
    })
    .slice(0, 5);

  // Handle touch scrolling
  const handleTouchScroll = (event) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= event.deltaY;
      event.preventDefault();
    }
  };

  return (
    <div
      style={{
        background: isMobile
          ? "linear-gradient(45deg, black, #220838)"
          : "transparent",
      }}
      className="w-full relative px-10 py-5 text-gray-200"
    >
      <div className="relative">
        <h2 className="text-center font-medium text-4xl pb-8">LATEST SBCS</h2>

        {/* Desktop Marquee Section */}
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

        {/* Mobile: Horizontal Scrollable NewSbcCard */}
        <div
          ref={scrollRef}
          onWheel={handleTouchScroll}
          className="flex gap-5 md:hidden no-scrollbar mt-2 overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide "
        >
          {filteredSbcs.map((sbc, index) => (
            <div key={index} className="shrink-0 min-w-[250px] max-w-[250px]">
              <NewSbcCard data={sbc} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SBCSection;

import React from "react";
import { useSelector } from "react-redux";
import ChallengeCard from "./ChallengeCards";

const SbcView = () => {
  const sbc = useSelector((state) => state.sbc.details);
  const {
    name,
    categoryId,
    description,
    challengesCount,
    endTimeStamp,
    challenges,
    totalCost,
    setImageId,
    repeatable,
    repeatabilityMode,
    repeats,
    repeatRefreshInterval,
  } = sbc;
  return (
    <div className="h-full md:min-h-[90vh] bg-slate-950">
      <div className="w-[90%] mx-auto pt-3">
        <div className="pt-5 text-center">
          <h1
            class="text-white
             font-bold text-center md:text-left text-xl md:text-4xl
             group-[.-sticky-header]:text-2xl group-[.-sticky-header]:mt-0
             "
          >
            {name}
            <span class="text-lighter-gray font-bold hidden md:inline-block text-base ml-2">
              {description}
            </span>
          </h1>
        </div>
        <div className="pt-5">
          <h2 className="text-white text-2xl font-bold text-center">
            SBC Challenges
          </h2>
          <div className="grid grid-cols-3">
            <ChallengeCard />
            <ChallengeCard />
            <ChallengeCard />
            <ChallengeCard />
            <ChallengeCard />
            <ChallengeCard />
            <ChallengeCard />
            <ChallengeCard />
            <ChallengeCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SbcView;

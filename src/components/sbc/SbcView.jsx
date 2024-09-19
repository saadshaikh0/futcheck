import React from "react";
import { useSelector } from "react-redux";
import ChallengeCard from "./ChallengeCards";
import SBC_BACKGROUND from "../../assets/sbc_background_field.webp";

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
    <div
      className="min-h-[calc(100vh-4rem)]"
      style={{
        background: `url(${SBC_BACKGROUND}) no-repeat `,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className={`fixed inset-0 bg-black  opacity-70`}></div>
      <div className="w-[90%] relative mx-auto pt-3">
        <div className="pt-5 flex flex-col justify-center items-center">
          <p
            className="text-white
             font-bold text-center md:text-left text-xl md:text-4xl
             group-[.-sticky-header]:text-2xl group-[.-sticky-header]:mt-0
             "
          >
            {name}
          </p>
          <p className="text-white font-bold hidden md:inline-block text-base ml-2">
            {description}
          </p>
        </div>
        <div className="pt-5">
          <h2 className="text-white text-2xl font-bold text-center mb-8">
            SBC Challenges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {challenges &&
              [...challenges]
                .sort((a, b) => a.priority - b.priority)
                .map((challenge) => (
                  <ChallengeCard
                    challengeDetails={challenge}
                    key={challenge.id}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SbcView;

import React from "react";
import {
  buildDynamicUrl,
  convertElgReqToFormat,
  convertElgReqToStrings,
} from "../utils/utils";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setChallenge } from "../../redux/sbcSlice";

const ChallengeCard = ({ challengeDetails }) => {
  const {
    challengeId,
    name,
    description,
    cost,
    eligibilityRequirements,
    
  } = challengeDetails;

  const dispatch = useDispatch();
  const formattedReqs = convertElgReqToFormat(eligibilityRequirements);
  const reqStrings = formattedReqs.map((req) => convertElgReqToStrings(req));
  return (
    <div
      class="
        bg-gray-800 rounded grid text-white grid-rows-[auto_1fr] items-center !grid-rows-[auto_1fr_40px]     "
    >
      <div class="bg-gray-900 rounded-t py-2 px-4 relative text-white grid grid-cols-[1fr_auto] gap-2">
        <h2 class="text-xl font-bold">{name}</h2>
        <div class="self-end text-right flex gap-2">
          <div class="bg-gray rounded font-bold text-sm px-2 py-1 flex items-center">
            <span class="price-coin price-coin--size-xs mr-2"></span>
            {cost}
          </div>
        </div>
      </div>
      <div class="grid grid-cols-[1fr_2fr] items-center p-2 gap-2">
        <div class="mx-auto w-full max-lg:max-w-[142px] max-w-[180px]">
          <a href="/24/squad-builder/5bedfe18-5eec-452f-a645-9d48b236fe1e/">
            {" "}
            <img
              src={buildDynamicUrl('challenge',challengeId)}
              alt="89 Rated Squad"
              loading="lazy"
            />
          </a>{" "}
        </div>
        <div>
          <p class="text-sm mb-3 font-medium">{description}</p>
          <div class="bg-gray-900 rounded px-2 py-1  ">
            <div class="flex justify-between items-center gap-2">
              <div class="grid grid-cols-[17px_1fr] gap-2 items-center">
                <div class="w-[15px]">
                  <img
                    src="https://assets.fut.gg/files/site/pack.19b841469cbf42050e7d.webp"
                    class="w-full h-full object-contain"
                    alt="Pack"
                    width="20"
                  />
                </div>
                <p class="text-xs text-white"> 1x Premium Gold Players Pack</p>
              </div>
            </div>
          </div>
          <div class="mt-2">
            {reqStrings.map((req) => (
              <p class="text-sm">{req}</p>
            ))}
          </div>
        </div>
      </div>
      <Link
        onClickCapture={() => {
          dispatch(setChallenge(challengeDetails));
        }}
        to={`/challenge-solution/${challengeId}/1`}
      >
        <span className="uppercase bg-gray-900 rounded font-bold text-white py-2 text-center block hover:bg-orange hover:text-white text-sm h-[40px]">
          {" "}
          View Solutions
        </span>
      </Link>
    </div>
  );
};

export default ChallengeCard;

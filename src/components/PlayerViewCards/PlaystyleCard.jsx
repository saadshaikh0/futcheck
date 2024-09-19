import React from "react";
import { buildDynamicUrl } from "../utils/utils";

const PlaystyleCard = ({ playstyles = [], iconPlaystyles = [] }) => {
  if (!playstyles || playstyles.length == 0) {
    return (
      <div className=" w-full flex justify-center items-center h-[10vh]">
        <div className="text-white font-bold ">
          Player does not possess any playstyle.
        </div>
      </div>
    );
  }
  return (
    <div className="px-4 py-2">
      <h2 className="text-white font-bold mb-4">Playstyles</h2>
      <div className="flex gap-3 flex-wrap scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300">
        {iconPlaystyles?.map((playstyle) => {
          return (
            <div className="relative">
              <svg
                class="!w-[2.5em] !h-[2.5em] svg-container svg-icon svg-icon--size-sm"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
              >
                <path
                  d="M12.813,104.953L68.157,21.862H188.143l55.045,83.091L128,235.138Z"
                  fill-opacity="1"
                  stroke="#FFD700"
                  stroke-linejoin="round"
                  stroke-width="8"
                  fill="#FFD700"
                ></path>
              </svg>
              <img
                className="w-[35px] h-[35px] absolute left-[2px] top-0"
                src={buildDynamicUrl('playstyle',playstyle)}
              />
            </div>
          );
        })}

        {playstyles?.map((playstyle) => {
          return (
            <div className="relative">
              <svg
                class="!w-[2.5em] !h-[2.5em] svg-container svg-icon svg-icon--size-sm"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
              >
                <path
                  d="M12.813,104.953L68.157,21.862H188.143l55.045,83.091L128,235.138Z"
                  fill-opacity="1"
                  stroke="#ffffff"
                  stroke-linejoin="round"
                  stroke-width="8"
                  fill="#ffffff"
                ></path>
              </svg>
              <img
                className="w-[35px] h-[35px] absolute left-[2px] top-0"
                src={buildDynamicUrl('playstyle',playstyle)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlaystyleCard;

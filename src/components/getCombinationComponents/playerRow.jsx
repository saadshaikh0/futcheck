import React from "react";

const PlayerRow = ({ player }) => {
  const {
    base_id,
    id,
    name,
    league_url,
    teamid,
    nation_url,
    rating,
    bg_color,
    text_color,
    position,
    c_name,
  } = player;
  let otherPos = position.slice(1);

  return (
    <li class="inline-flex w-full cursor-pointer items-center gap-x-2  rounded-l-md  text-sm font-medium bg-slate-700 text-white   -mt-px first:mt-0  dark:bg-slate-900 dark:border-gray-700 dark:text-white">
      <div className="grid grid-cols-[40px_1fr] w-full">
        {/* <div
          style={{
            backgroundImage: `url(${rarity_url})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
          className="p-4 pl-2 pt-2"
        > */}
        <div
          className="mr-2 relative"
          style={{ backgroundColor: bg_color, color: text_color }}
        >
          <img
            className="absolute top-1/2 -translate-y-1/2"
            src={`https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/24B23FDE-7835-41C2-87A2-F453DFDB2E82/2024/fut/items/images/mobile/portraits/${base_id}.png`}
            width={40}
          />
        </div>
        {/* </div> */}
        <div className="flex justify-between">
          <div className="flex grow flex-col gap-1 pb-1 ">
            <div className="text-xs text-start">
              {c_name !== "None" ? c_name : name}
            </div>
            <div className="flex gap-2">
              <img src={nation_url} className="w-4 h-2" />
              <img src={league_url} className="w-3 h-3" />
              <img
                className="w-3 h-3"
                src={`https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/24B23FDE-7835-41C2-87A2-F453DFDB2E82/2024/fut/items/images/mobile/clubs/dark/${teamid}.png`}
              />
            </div>
          </div>
          <div className="p-2">{rating}</div>
        </div>
      </div>
    </li>
  );
};
export default PlayerRow;

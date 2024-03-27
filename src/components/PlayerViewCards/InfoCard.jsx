import React from "react";
import { FOOT, WORK_RATE } from "../utils/constants";

const InfoRow = ({ label, value }) => {
  return (
    <div className="grid grid-cols-2 pl-4 py-1">
      <span>{label}</span>
      <span> {value}</span>
    </div>
  );
};

const InfoCard = ({ player }) => {
  const {
    name,
    nation_name,
    nation_url,
    rarity_name,
    c_name,
    league_name,
    att_wr,
    def_wr,
    skill_moves,
    weak_foot,
    league_url,
    rating,
    foot,
    team_name,
  } = player;
  return (
    <div className="text-white">
      <h2 className=" text-center font-medium py-4">Info</h2>
      <div className="flex-col gap-4 text-sm">
        <InfoRow
          label={"Name"}
          value={c_name && c_name != "None" ? c_name : name}
        />
        <InfoRow label={"Club"} value={team_name} />
        <InfoRow
          label={"Nation"}
          value={
            <div className="flex gap-1 items-center">
              {/* <img src={nation_url} className="w-[20px] h-[15px]" /> */}
              {nation_name}
            </div>
          }
        />
        <InfoRow
          label={"League"}
          value={
            <div className="flex gap-1 text-xs items-center">
              {/* <img src={league_url} className="w-[20px] h-[20px]" /> */}
              {league_name}
            </div>
          }
        />
        <InfoRow label={"Rating"} value={rating} />
        <InfoRow label={"Skills"} value={<div>{skill_moves + 1} ★</div>} />
        <InfoRow label={"Weak Foot"} value={<div>{weak_foot} ★</div>} />
        <InfoRow label={"Strong Foot"} value={<div>{FOOT[foot]}</div>} />
        <InfoRow label={"Att. WR"} value={WORK_RATE[att_wr]} />
        <InfoRow label={"Def. WR"} value={WORK_RATE[def_wr]} />
        <InfoRow label={"Rarity"} value={rarity_name} />
      </div>
    </div>
  );
};

export default InfoCard;

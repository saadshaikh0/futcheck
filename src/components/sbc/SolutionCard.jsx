import React from "react";
import "./solutions.css";
import CoinsImg from "../../assets/coins.png";
import classNames from "classnames";
import SolutionCardGraph from "./SolutionCardGraph";
import { useDispatch, useSelector } from "react-redux";
import { buildDynamicUrl, convertCostDistribution } from "../utils/utils";
import { setSolutionLeagueDetails } from "../../redux/sbcSlice";

const SolutionCard = ({ active, solution }) => {
  const dispatch = useDispatch();
  const { nationIdMap, leagueIdMap, teamIdMap } = useSelector(
    (state) => state.app
  );

  const { top_clubs, top_leagues, top_nations, cost_distribution } = solution
    ?.details?.squad_info ?? {
    top_clubs: [],
    top_leagues: [],
    top_nations: [],
    cost_distribution: [],
  };
  const { data: formattedCostDistribution, nations } = convertCostDistribution(
    cost_distribution,
    leagueIdMap
  );
  return (
    <div
      className={classNames(
        active ? "bg-gray-900" : "bg-gray-950",
        " w-full bg-opacity-40 cursor-pointer text-white rounded-md flex flex-col px-4 pb-4"
      )}
    >
      <p className=" text-2xl font-bold text-center relative"></p>
      <div className="grid grid-cols-[1fr_2fr] ">
        <div className=" flex flex-col gap-4 items-center justify-center">
          <p className="relative w-full text-center">
            <span className="text-xl font-bold">Solution 1</span>
            <span className="flex items-center gap-2 text-md absolute left-0 top-1">
              <img className="w-5" src={CoinsImg} />
              {solution?.cost}
            </span>{" "}
          </p>
          <p className="grid grid-cols-[1fr_3fr] gap-5 items-center">
            <p className="font-thin w-16 text-left"> Leagues</p>
            <div className="grid grid-cols-3 gap-3">
              {top_leagues.slice(0, 3)?.map((league) => {
                const league_url = buildDynamicUrl('league',league[0])
                return <img className="w-10 rounded-md" src={league_url} />;
              })}
            </div>
          </p>
          <p className="grid grid-cols-[1fr_3fr] gap-5 items-center">
            <p className="font-thin w-16 text-left"> Nations</p>
            <div className="grid grid-cols-3 gap-3">
              {top_nations.slice(0, 3).map((nation) => {
                const nation_url = buildDynamicUrl('nation',nation[0])
                return <img className="w-10 rounded-md" src={nation_url} />;
              })}
            </div>
          </p>
          <p className="grid grid-cols-[1fr_3fr] gap-5 items-center">
            <p className="font-thin w-16 text-left"> Clubs</p>
            <div className="grid grid-cols-3 gap-3">
              {top_clubs.slice(0, 3).map((club) => {
                const club_url = buildDynamicUrl('club',club[0])
                return <img className="w-10 rounded-md" src={club_url} />;
              })}
            </div>
          </p>
        </div>
        <div className="flex flex-col justify-end items-end gap-2 text-center ">
          <div className="w-full h-full pt-5">
            <SolutionCardGraph
              data={formattedCostDistribution}
              nations={nations}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionCard;

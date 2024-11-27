import React, { useEffect, useState } from "react";
import { setChallenge, setChallengeSolutions } from "../../redux/sbcSlice";
import {
  fetchChallengeDetails,
  fetchChallengeSolutions,
  fetchTopRatedPlayers,
} from "../../api/apiService";
import FOOTBALL_STADIUM_IMAGE from "../../assets/sbc_background_field.webp";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SolutionsPitch from "../../assets/updated-field.png";
import { useQuery } from "@tanstack/react-query";
import PlayerCard from "../common/PlayerCard";
import { getFormationPositions } from "../utils/formations";
import SolutionCard from "./SolutionCard";
import { convertFormation } from "../utils/utils";
import classNames from "classnames";
import SolutionTable from "./SolutionTable";
import { useHandleResize } from "../utils/hooks";

const SolutionPitch = ({
  isDisabled,
  selectedSolution,
  positions,
  solutionLeagueDetails,
  isSuperMini,
  positionsAbbr,
}) => {
  return (
    <div
      className="w-full md:w-[115%] h-[55vh] md:h-[85vh] relative"
      style={{
        background: `url(${SolutionsPitch})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
      }}
    >
      <div className={`absolute inset-0 bg-black opacity-20`}></div>
      {selectedSolution && (
        <div className="flex flex-col absolute top-0 right-4 md:right-9 text-white text-sm md:text-md font-bold text-right">
          <div>Rating: {selectedSolution.details.rating}</div>
          <div>Chemistry: {selectedSolution.details.chemistry}</div>
        </div>
      )}
      <div className="flex w-full flex-wrap relative h-full">
        {selectedSolution &&
          selectedSolution.details.squad.map((player, index) => {
            const position = positions[index] || {};
            const { left, top, position: position_abr } = position;

            let player_position_index =
              selectedSolution.details.player_position_index;
            let playerIndex = selectedSolution.details.squad.findIndex(
              (d) => d.id === player_position_index[index]
            );

            let playerData = selectedSolution.details.squad[playerIndex];
            const showPositionAbbr = playerData?.position?.includes(
              position_abr
            )
              ? position_abr
              : null;

            return (
              <div
                key={playerData.id}
                className={classNames(
                  "w-16 md:w-32 absolute",
                  playerData.leagueid == solutionLeagueDetails.leagueid ||
                    playerData.nation == solutionLeagueDetails.nationid ||
                    playerData.teamid == solutionLeagueDetails.teamid
                    ? "bg-gray-300 rounded-lg z-15 bg-opacity-50"
                    : ""
                )}
                style={{ left, top }}
              >
                <PlayerCard
                  showPrice={true}
                  shouldOpenInNewTab={true}
                  position_abr={showPositionAbbr}
                  isSuperMini={isSuperMini}
                  player={playerData}
                  isDisabled={isDisabled}
                  isHover={true}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

const ChallengeSolutions = () => {
  const { challengeId: challengeid } = useParams();
  const challenge = useSelector((state) => state.sbc.challengeDetails);
  const challengeSolutions = useSelector(
    (state) => state.sbc.challengeSolutions
  );
  const solutionLeagueDetails = useSelector(
    (state) => state.sbc.solutionLeagueDetails
  );

  const { challengeId, formation } = challenge;
  const { challenge_id: challenge_solution_id } = challengeSolutions;
  const [selectedSolution, setSelectedSolution] = useState();
  const dispatch = useDispatch();
  const isMobile = useHandleResize(768);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    try {
      const formationPositions = getFormationPositions(
        formation,
        isMobile ? "small" : "big"
      );
      setPositions(formationPositions);
    } catch (error) {
      console.error("Error getting formation positions:", error);
    }
  }, [isMobile, formation]);
  useEffect(() => {
    async function fetchData() {
      if (!challengeid || challengeid != challengeId) {
        console.log(challengeId, challengeid);
        const data = await fetchChallengeDetails(challengeid);
        dispatch(setChallenge(data));
      }
    }
    async function fetchChallengeData() {
      if (!challenge_solution_id || challengeid != challenge_solution_id) {
        const data = await fetchChallengeSolutions(challengeid);
        setSelectedSolution(data[0]);
        dispatch(setChallengeSolutions(data));
      }
    }
    fetchData();
    fetchChallengeData();
  }, [challengeid, challenge_solution_id]);

  const { name, description } = challenge;

  const UpdateSquad = (squad) => setSelectedSolution(squad);
  return (
    <div
      className="home-page relative min-h-[93vh] w-full bg-fixed"
      style={{
        background: `url(${FOOTBALL_STADIUM_IMAGE}) `,
        backgroundAttachment: "fixed",
      }}
    >
      <div className={`absolute inset-0 bg-black  opacity-80`}></div>
      <div className="md:hidden relative w-5/6 mx-auto">
        <div className="flex flex-col gap-2 mt-5">
          <div className="text-center">
            {" "}
            <div className="text-white text-xl font-bold">{name}</div>
            <div className="text-gray-600 text-sm">{description}</div>
          </div>
          <SolutionPitch
            isDisabled={true}
            selectedSolution={selectedSolution}
            positions={positions}
            solutionLeagueDetails={solutionLeagueDetails}
            isSuperMini={true}
          />
          {challengeSolutions && (
            <SolutionTable
              UpdateSquad={UpdateSquad}
              challengeSolutions={challengeSolutions}
              selectedSolutionId={selectedSolution?.id}
              isSuperMini={true}
            />
          )}
        </div>
      </div>
      <div className="hidden md:block w-4/5 mx-auto relative">
        <div className="flex flex-col pt-10 gap-2">
          <div className="grid grid-cols-[3fr_2fr]">
            <div className="text-center">
              <div className="text-white text-4xl font-bold">{name}</div>
              <div className="text-gray-600 text-xl">{description}</div>{" "}
              <div className=" h-[75vh]  mt-5 flex flex-col ">
                <div>
                  <SolutionCard active={false} solution={selectedSolution} />
                </div>
                {challengeSolutions && (
                  <SolutionTable
                    UpdateSquad={UpdateSquad}
                    challengeSolutions={challengeSolutions}
                    selectedSolutionId={selectedSolution?.id}
                  />
                )}
              </div>
            </div>
            <SolutionPitch
              isDisabled={false}
              selectedSolution={selectedSolution}
              positions={positions}
              solutionLeagueDetails={solutionLeagueDetails}
              isSuperMini={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeSolutions;

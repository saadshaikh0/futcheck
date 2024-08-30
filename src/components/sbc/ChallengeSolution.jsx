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
import SolutionsPitch from "../../assets/solutions_pitch.jpg";
import { useQuery } from "@tanstack/react-query";
import PlayerCard from "../common/PlayerCard";
import { FORMATIONS_POSITIONS } from "../utils/formations";
import SolutionCard from "./SolutionCard";
import { convertFormation } from "../utils/utils";
import classNames from "classnames";
import SolutionTable from "./SolutionTable";

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
  const formationString = convertFormation(formation);
  const positions = FORMATIONS_POSITIONS[formationString];
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
      className="home-page relative h-[93vh] w-full bg-fixed"
      style={{
        background: `url(${FOOTBALL_STADIUM_IMAGE}) `,
        backgroundAttachment: "fixed",
      }}
    >
      <div className={`absolute inset-0 bg-black  opacity-80`}></div>

      <div className="w-4/5 mx-auto relative">
        <div className="flex flex-col pt-10 gap-2">
          <div className="grid grid-cols-[3fr_2fr]">
            <div className="text-center">
              <div className="text-white text-4xl font-bold">{name}</div>
              <div className="text-gray-600 text-xl">{description}</div>{" "}
              <div className=" h-[75vh]  mt-5 flex flex-col ">
                {/* {challengeSolutions?.map((solution) => ( */}
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
            <div
              className="w-[115%] h-[85vh] relative"
              style={{
                background: `url(${SolutionsPitch})`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "bottom",
              }}
            >
              <div className={`absolute inset-0 bg-black  opacity-20`}></div>

              <div className="flex w-full flex-wrap relative h-full">
                {selectedSolution &&
                  selectedSolution.details.squad.map((player, index) => {
                    let left = positions[index][0];
                    let bottom = positions[index][1];
                    let player_position_index =
                      selectedSolution.details.player_position_index;
                    let playerIndex = selectedSolution.details.squad.findIndex(
                      (d) => d.id === player_position_index[index]
                    );
                    let playerData =
                      selectedSolution.details.squad[playerIndex];
                    return (
                      <div
                        className={classNames(
                          "w-32  absolute ",
                          playerData.leagueid ==
                            solutionLeagueDetails.leagueid ||
                            playerData.nation ==
                              solutionLeagueDetails.nationid ||
                            playerData.teamid == solutionLeagueDetails.teamid
                            ? "bg-gray-300 rounded-lg  z-15 bg-opacity-50  "
                            : ""
                        )}
                        style={{ left, bottom }}
                      >
                        <PlayerCard
                          player={playerData}
                          isMini={true}
                          isHover={true}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeSolutions;

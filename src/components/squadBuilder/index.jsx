import React, { useState } from "react";
import FootballPitchImg from "../../assets/football_pitch_squad_builder_night.jpg";
import Formation from "./formation";
import { fetchBestSquad, fetchBestSquadClub } from "../../api/apiService";
import { useSelector } from "react-redux";
const SquadBuilder = () => {
  const [squadRating, setSquadRating] = useState();
  const [squadChemistry, setSquadChemistry] = useState();
  const [bestSquad, setBestSquad] = useState();
  const [bestSquadDetails, setBestSquadDetails] = useState();
  const [isClub, setIsClub] = useState(false);
  const userInfo = useSelector((state) => state.app.userInfo);

  const generateSquad = async () => {
    let squad, rating, chemistry, cost, player_position_index;

    if (isClub) {
      // If isClub is true, call fetchBestSquadClub
      ({ squad, rating, chemistry, cost, player_position_index } =
        await fetchBestSquadClub({
          rating: squadRating,
          chemistry: squadChemistry,
        }));
    } else {
      // If isClub is false, call fetchBestSquad
      ({ squad, rating, chemistry, cost, player_position_index } =
        await fetchBestSquad({
          rating: squadRating,
          chemistry: squadChemistry,
        }));
    }
    setBestSquad(squad);
    setBestSquadDetails({ rating, chemistry, cost, player_position_index });
  };
  return (
    <div className="mt-5 w-4/5 h-[80vh] mx-auto relative">
      <div className="flex flex-col md:grid  md:grid-cols-[1fr_4fr] gap-5">
        <div className="text-white justify-between md:h-[75vh] bg-slate-900 rounded-lg px-4 py-6 flex flex-col">
          <div className="flex flex-col">
            <div className="grid grid-rows-[1fr_1fr]">
              {userInfo && (
                <label class="grid grid-cols-[1fr_1fr] gap-4">
                  <div className="text-white font-bold">My Club</div>
                  <div className="mx-auto">
                    <input
                      type="checkbox"
                      value=""
                      onChange={(e) => {
                        setIsClub(e.target.checked);
                      }}
                      class="sr-only peer"
                    />
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </div>
                </label>
              )}
            </div>
            <div className="grid grid-rows-[1fr_1fr]">
              <div className="font-medium mb-5">Squad Rating</div>
              <div className="relative">
                <input
                  className="w-full accent-fuchsia-400  rounded-md pl-2"
                  type="range"
                  min={70}
                  max={99}
                  maxLength={2}
                  onChange={(e) => {
                    let rating = parseInt(e.target.value);

                    setSquadRating(rating);
                  }}
                />
                <div className="text-white absolute -top-[20px] left-1/2 -translate-x-1/2 ">
                  {" "}
                  {squadRating}
                </div>
              </div>
            </div>
            <div className="grid grid-rows-[1fr_1fr]">
              <div className="font-medium mb-5">Squad Chemistry</div>
              <div className="relative">
                <input
                  className="w-full accent-fuchsia-400  rounded-md pl-2"
                  type="range"
                  min={0}
                  max={33}
                  maxLength={2}
                  onChange={(e) => {
                    let chemistry = parseInt(e.target.value);

                    setSquadChemistry(chemistry);
                  }}
                />
                <div className="text-white absolute -top-[20px] left-1/2 -translate-x-1/2 ">
                  {" "}
                  {squadChemistry}
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={generateSquad}
            className="px-2 cursor-pointer bg-fuchsia-600 rounded-sm w-auto self-center"
          >
            Generate
          </div>
        </div>
        <div className="flex-col gap-4">
          {bestSquad && (
            <div className="flex gap-5 text-white">
              <div>Total Cost : {bestSquadDetails.cost}</div>
              <div>Total Chemistry : {bestSquadDetails.chemistry}</div>
              <div>Total Rating : {bestSquadDetails.rating}</div>
            </div>
          )}
          <div className="relative w-full h-full">
            <img
              src={FootballPitchImg}
              className="w-full h-full absolute top-0 left-0 "
            />
            <div className={`absolute inset-0 bg-black  opacity-40`}></div>

            <div className="z-10 absolute w-full h-full">
              {" "}
              {/* {bestSquad && (
                <Formation
                  squad={bestSquad}
                  player_position_index={bestSquadDetails.player_position_index}
                />
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SquadBuilder;

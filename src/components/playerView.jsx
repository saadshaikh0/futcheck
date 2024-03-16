import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import instance from "../api/axiosclient";
import { buildPlayerUrl } from "./utils/utils";
import PlayerPriceBox from "./playerPriceBox";
import FutbinImg from "../assets/futbin.png";
import FutWizImg from "../assets/futwiz.png";
import FutggImg from "../assets/futgg.jpg";
import { setPlayer } from "../redux/playerSlice";
import { fetchPrice, fetchVersions } from "../api/apiService";
import { useQuery } from "@tanstack/react-query";

const PlayerView = () => {
  const {
    id,
    base_id,
    name,
    rating,
    guid,
    rarity_url,
    futwiz_id,
    futbin_id,
    attributes,
    playstylePlus,
    position,
    text_color,
  } = useSelector((state) => state.player.details);

  const dispatch = useDispatch();
  const { data = {}, isLoading } = useQuery({
    queryKey: ["fetchPrices", id, futwiz_id],
    queryFn: () => fetchPrice(id, futwiz_id),

    staleTime: 1000 * 60,
  });
  const {
    futbin: futbinData = {},
    futwiz: futwizData = {},
    futgg: futggData = {},
  } = data;

  const { data: playerVersions = [] } = useQuery({
    queryKey: ["fetchVersions", base_id, id],
    queryFn: () => fetchVersions(base_id, id),
    cacheTime: 1000 * 60 * 100,
    staleTime: Infinity,
  });

  if (!id) {
    return (
      <div className="h-[90vh] bg-slate-950 ">
        <p className="text-white text-center text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Search Players
        </p>
      </div>
    );
  }
  return (
    <div className="h-full md:h-[90vh] bg-slate-950">
      <div className="w-[90%] mx-auto pt-3">
        <div className="pt-5">
          <h1
            class="text-white
             font-bold text-center md:text-left text-xl md:text-4xl
             group-[.-sticky-header]:text-2xl group-[.-sticky-header]:mt-0
             "
          >
            {name}
            <span class="text-lighter-gray font-bold hidden md:inline-block text-base ml-2">
              {rating} OVR - EA FC 24
            </span>
          </h1>
        </div>
        <div className="grid md:grid-cols-[1fr_2fr] mt-5">
          <div className="flex flex-col w-full md:max-w-[280px]">
            <div style={{ color: text_color }} className="block relative ">
              <img src={rarity_url.replace("_s_", "_e_")} />
              <img
                style={
                  !guid || base_id == id
                    ? {
                        width: "65%",
                        height: "50%",
                        left: "50%",
                        top: "13%",
                        transform: "translate(-50%)",
                      }
                    : {}
                }
                className="absolute top-0 w-full h-full"
                src={buildPlayerUrl(guid, id, base_id)}
              />
              <div
                class={`flex flex-row absolute top-[71.6%] w-[68.8%] font-bold left-1/2 transform -translate-x-1/2 justify-between`}
              >
                <div class="relative">
                  <div class="font-cruyff-condensed-medium text-[0.78em] leading-none mb-[0.2em] text-center">
                    PAC
                  </div>
                  <div class="font-cruyff-condensed-numbers-medium text-[1.2em] leading-none text-center relative">
                    {attributes[0]}
                  </div>
                </div>
                <div class="relative">
                  <div class="font-cruyff-condensed-medium text-[0.78em] leading-none mb-[0.2em] text-center">
                    SHO
                  </div>
                  <div class="font-cruyff-condensed-numbers-medium text-[1.2em] leading-none text-center relative">
                    {attributes[1]}
                  </div>
                </div>
                <div class="relative">
                  <div class="font-cruyff-condensed-medium text-[0.78em] leading-none mb-[0.2em] text-center">
                    PAS
                  </div>
                  <div class="font-cruyff-condensed-numbers-medium text-[1.2em] leading-none text-center relative">
                    {attributes[2]}
                  </div>
                </div>
                <div class="relative">
                  <div class="font-cruyff-condensed-medium text-[0.78em] leading-none mb-[0.2em] text-center">
                    DRI
                  </div>
                  <div class="font-cruyff-condensed-numbers-medium text-[1.2em] leading-none text-center relative">
                    {attributes[3]}
                  </div>
                </div>
                <div class="relative">
                  <div class="font-cruyff-condensed-medium text-[0.78em] leading-none mb-[0.2em] text-center">
                    DEF
                  </div>
                  <div class="font-cruyff-condensed-numbers-medium text-[1.2em] leading-none text-center relative">
                    {attributes[4]}
                  </div>
                </div>
                <div class="relative">
                  <div class="font-cruyff-condensed-medium text-[0.78em] leading-none mb-[0.2em] text-center">
                    PHY
                  </div>
                  <div class="font-cruyff-condensed-numbers-medium text-[1.2em] leading-none text-center relative">
                    {attributes[5]}
                  </div>
                </div>
              </div>
              <div class="absolute left-[21.8%] transform -translate-x-1/2 font-bold text-center top-[17.2%]">
                <div class="font-cruyff-condensed-numbers-bold text-[2em] leading-[0.91em]">
                  {rating}
                </div>
                <div class="font-cruyff-condensed-medium leading-none text-[1em] -mt-[0.07em]">
                  {position[0]}
                </div>
              </div>
            </div>
            {playerVersions && (
              <div className="flex justify-center gap-4 mb-5">
                {playerVersions.map((player) => {
                  return (
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        console.log(player);
                        dispatch(setPlayer({ ...player }));
                      }}
                    >
                      <img width={40} src={player.rarity_url} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {isLoading ? (
            <div
              role="status"
              className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2"
            >
              <svg
                aria-hidden="true"
                class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              <PlayerPriceBox
                Img={FutbinImg}
                name="Futbin"
                price_data={futbinData}
                url={`https://www.futbin.com/24/player/${futbin_id}`}
              />
              <PlayerPriceBox
                Img={FutWizImg}
                name="Futwiz"
                price_data={futwizData}
                url={`https://www.futwiz.com/en/fc24/player/${futwizData.url}/${futwiz_id}`}
              />
              <PlayerPriceBox
                Img={FutggImg}
                name="Futgg"
                price_data={futggData}
                url={`https://www.fut.gg/players/player/24-${id}`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerView;

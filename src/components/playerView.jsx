import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buildPlayerUrl, fillZeros, timeAgo } from "./utils/utils";
import { setPlayer } from "../redux/playerSlice";
import { addToFavourites, fetchVersions } from "../api/apiService";
import { useQuery } from "@tanstack/react-query";
import { getTraitIcon, TRAIT_MAP } from "./utils/traitsvg";
import { WORK_RATE } from "./utils/constants";
import CoinsImg from "../assets/coins.png";
import SimilarPlayers from "./similarPlayers";
import PriceCard from "./PlayerViewCards/PriceCard";
import StatsCard from "./PlayerViewCards/StatsCard";
import InfoCard from "./PlayerViewCards/InfoCard";
import PlaystyleCard from "./PlayerViewCards/PlaystyleCard";
import { Helmet } from "react-helmet";
import { BellIcon, StarIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { updateFavouritePlayers } from "../redux/appSlice";
import PlayerCard from "./common/PlayerCard";

const PlayerView = () => {
  const player = useSelector((state) => state.player.details);
  const userInfo = useSelector((state) => state.app.userInfo);
  const {
    id,
    base_id,
    name,
    rating,
    guid,
    rarity_url,
    rarity_id,
    futwiz_id,
    attributes,
    playstyle_plus,
    position,
    text_color,
    bg_color,
    nation_url,
    league_url,
    c_name,
    teamid,
    weak_foot,
    skill_moves,
    att_wr,
    def_wr,
    playstyles,
    stats,
    guid_no,
    levels,
    colors,
    latest_price,
    last_updated,
  } = player;
  const dispatch = useDispatch();
  const [validGuid, setValidGuid] = useState(!!guid);

  const { data: playerVersions = [] } = useQuery({
    queryKey: ["fetchVersions", base_id, id],
    queryFn: () => fetchVersions(base_id, id),
    cacheTime: 1000 * 60 * 100,
    staleTime: Infinity,
  });

  useEffect(() => {
    // Select all path elements inside the SVG
    const pathElements = document.querySelectorAll(
      "#playstyle_container .svg-container path"
    );
    const iconPathElements = document.querySelectorAll(
      "#playstyle_container .playstyle_icon path"
    );

    // Apply fill color to each path element
    pathElements.forEach((path) => {
      path.style.fill = bg_color; // Apply red fill color
      path.style.stroke = text_color; // Apply red fill color
    });
    iconPathElements.forEach((path) => {
      path.style.fill = text_color; // Apply red fill color
    });
  }, [bg_color, text_color]);

  if (!id) {
    return (
      <div className="h-full bg-slate-950 ">
        <p className="text-white text-center text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Search Players
        </p>
      </div>
    );
  }
  const isFavourite = userInfo?.favourite_players?.includes(id);

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content={`Browse through ${
            c_name != "None" ? c_name : name
          } EAFC 24 stats , price , versions and much more.`}
        />
      </Helmet>
      <div className="h-full  bg-slate-950">
        <div className="w-[90%] mx-auto pt-3">
          <div className="pt-5">
            <h1
              class="text-white
             font-bold text-center md:text-left text-xl md:text-4xl
             group-[.-sticky-header]:text-2xl group-[.-sticky-header]:mt-0
             "
            >
              {c_name != "None" ? c_name : name}
              <span class="text-lighter-gray font-bold hidden md:inline-block text-base ml-2">
                {rating} OVR - EA FC 24
              </span>
            </h1>
          </div>
          <div className="grid md:grid-cols-[1fr_2fr] mt-5">
            <div className="flex flex-col w-full md:max-w-[280px]">
              <div className="mx-auto">
                <span
                  className="flex justify-center items-center  px-3 py-1 rounded-full font-bold gap-2 border-2"
                  style={{
                    backgroundColor: bg_color,
                    color: text_color,
                    borderColor: text_color,
                  }}
                >
                  <img src={CoinsImg} className="mt-1" width={24} />
                  {latest_price?.toLocaleString("en-US")}
                </span>
              </div>
              {userInfo && (
                <div className="flex gap-2 justify-center mt-2">
                  <div
                    onClick={async () => {
                      let payload = {
                        player_id: id,
                        type: isFavourite ? "D" : "I",
                      };
                      const res = await addToFavourites(payload);
                      console.log(res);
                      dispatch(updateFavouritePlayers(res));
                    }}
                    className="bg-slate-800 text-white items-center gap-1 text-sm flex p-2 rounded-full"
                  >
                    Favourite
                    <StarIcon
                      className={classNames(
                        "w-4 h-4 ",
                        isFavourite ? "text-yellow-500" : "text-white"
                      )}
                    />
                  </div>
                  <div className="bg-slate-800 text-white items-center gap-1 text-sm flex p-2 rounded-full">
                    Notify <BellIcon className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
              <PlayerCard player={player} />
              {playerVersions && (
                <div className="flex justify-center gap-2 mb-5 flex-wrap">
                  {playerVersions.map((player) => {
                    return (
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          console.log(player);
                          player["bg_color"] = fillZeros(player["bg_color"]);
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

            <div className="flex flex-col h-full gap-4">
              <div className="grid lg:grid-cols-[1fr_2fr] gap-2">
                <div className="bg-gray-900 rounded-md">
                  <PriceCard
                    value={latest_price}
                    updated={timeAgo(last_updated)}
                  />
                </div>
                <div className="bg-gray-900 rounded-md">
                  <PlaystyleCard
                    iconPlaystyles={playstyle_plus}
                    playstyles={playstyles}
                  />
                </div>
              </div>
              <div className="grow grid lg:grid-cols-[3fr_1fr] gap-4">
                <div className="bg-gray-900 rounded-md">
                  <StatsCard stats={stats} attributes={attributes} />
                </div>
                <div className="bg-gray-900 rounded-md">
                  <InfoCard player={player} />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-14">
            <h2 className="text-white text-xl md:text-4xl text-center font-bold my-4">
              Similar players
            </h2>
            <SimilarPlayers player={player} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerView;

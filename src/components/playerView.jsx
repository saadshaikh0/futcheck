import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import instance from "../api/axiosclient";
import { buildPlayerUrl } from "./utils/utils";
import PlayerPriceBox from "./playerPriceBox";
import FutbinImg from "../assets/futbin.png";
import FutWizImg from "../assets/futwiz.png";
import FutggImg from "../assets/futgg.jpg";
import { setPlayer } from "../redux/playerSlice";

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
  const [futbinData, setFutbinData] = useState({});
  const [futwizData, setFutwizData] = useState({});
  const [futggData, setFutggData] = useState({});
  const [playerVersions, setPlayerVersions] = useState([]);
  const dispatch = useDispatch();
  const fetchPrice = async (id) => {
    try {
      const response = await instance.get(`/price/?id=${id}&fid=${futwiz_id}`);
      let data = response.data.data;
      setFutbinData(data["futbin"] ?? {});
      setFutwizData(data["futwiz"] ?? {});
      setFutggData(data["futgg"] ?? {});
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };
  const fetchPlayerVersions = async () => {
    const response = await instance.get(`/versions/?id=${base_id}&eId=${id}`);
    let data = response.data.data;
    setPlayerVersions(data);
  };
  useEffect(() => {
    if (id) {
      fetchPrice(id);
      fetchPlayerVersions();
    }
  }, [id]);
  if (!id) {
    return <div className="h-full md:h-[90vh] bg-slate-950"></div>;
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
        </div>
      </div>
    </div>
  );
};

export default PlayerView;

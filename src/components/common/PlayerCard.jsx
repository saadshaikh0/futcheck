import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setPlayer } from "../../redux/playerSlice";
import {
  buildDynamicUrl,
  buildPlayerUrl,
  calculateFaceStats,
  fillZeros,
} from "../utils/utils";
import CoinsImg from "../../assets/coins.png";
import { IN_GAME_STATS, WORK_RATE } from "../utils/constants";
import { getTraitIcon } from "../utils/traitsvg";
import classNames from "classnames";
import { applyChemStyle } from "../PlayerViewCards/StatsCard";

const AttributeDisplay = ({
  label,
  value,
  isHome,
  isAllPlayers,
  isHighlighted,
  statDifference,
  attributeNameFontSize,
  attributeValueFontSize,
}) => {
  return (
    <div
      className={classNames("relative", isHighlighted ? "text-green-600" : "")}
    >
      <div
        style={{ fontSize: attributeNameFontSize }}
        className={classNames(
          "font-cruyff-condensed-medium leading-none mb-[0.2em] text-center"
        )}
      >
        {label}
      </div>
      <div
        style={{ fontSize: attributeValueFontSize }}
        className={classNames(
          "font-cruyff-condensed-numbers-medium leading-none text-center relative"
        )}
      >
        {value}
        {statDifference > 0 ? (
          <span className="text-xs absolute -bottom-3 left-1">
            +{statDifference}
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

const PlayerCard = ({
  player,
  showPrice = false,
  isMini = true,
  isDisabled = true,
  isHover = false,
  isHome = false,
  isSuperMini = false,
  isAllPlayers = false,
  position_abr = null,
  shouldOpenInNewTab = false,
}) => {
  const {
    id,
    base_id,
    name,
    leagueid,
    rating,
    nation,
    guid,
    rarity_url,

    attributes,
    playstyle_plus,
    position,
    text_color,
    bg_color,

    c_name,
    teamid,
    weak_foot,
    skill_moves,

    stats,

    latest_price,
  } = player;
  const [validGuid, setValidGuid] = useState(!!guid);
  const player_name = c_name ? c_name : isMini ? name.split(" ").pop() : name;
  const selectedChemStyle = useSelector(
    (state) => state.player.selectedChemStyle
  );
  const selectedChemistryPoints = useSelector(
    (state) => state.player.selectedChemistryPoints
  );
  const [statDifference, setStatDifference] = useState(null);
  const isGk = position[0] == "GK";

  const labels = isGk
    ? ["DIV", "HAN", "KIC", "REF", "SPD", "POS"]
    : ["PAC", "SHO", "PAS", "DRI", "DEF", "PHY"];

  // State variables for font sizes
  const cardRef = useRef(null);
  const [attributeNameFontSize, setAttributeNameFontSize] = useState("14px");
  const [attributeValueFontSize, setAttributeValueFontSize] = useState("16px");
  const [ratingFontSize, setRatingFontSize] = useState("18px");
  const [positionFontSize, setPositionFontSize] = useState("14px");
  const [skillMovesFontSize, setSkillMovesFontSize] = useState("14px");
  const [playerNameFontSize, setPlayerNameFontSize] = useState("30px");
  const [playStyleFontSize, setPlayStyleFontSize] = useState("30px");

  useEffect(() => {
    const cardElement = cardRef.current;

    if (cardElement) {
      const updateFontSizes = () => {
        const cardWidth = cardElement.offsetWidth;
        setAttributeNameFontSize(`${cardWidth * 0.05}px`);
        setAttributeValueFontSize(`${cardWidth * 0.075}px`);
        setRatingFontSize(`${cardWidth * 0.1}px`);
        setPositionFontSize(`${cardWidth * 0.08}px`);
        setSkillMovesFontSize(`${cardWidth * 0.065}px`);
        setPlayerNameFontSize(`${cardWidth * 0.1}px`);
        setPlayStyleFontSize(
          isMini || isSuperMini
            ? `${cardWidth * 0.1}px`
            : `${cardWidth * 0.07}px`
        );
      };

      updateFontSizes();

      const resizeObserver = new ResizeObserver(() => {
        updateFontSizes();
      });
      resizeObserver.observe(cardElement);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);
  useEffect(() => {
    if (selectedChemStyle && selectedChemistryPoints) {
      const modifiedStats = applyChemStyle(
        stats,
        selectedChemStyle,
        selectedChemistryPoints
      );
      const modifiedFaceStats = calculateFaceStats(
        modifiedStats,
        IN_GAME_STATS
      );
      console.log("In Player Card", modifiedFaceStats);
      const tempStatDifference = attributes.map(
        (attribute, index) => modifiedFaceStats[index] - attribute
      );

      setStatDifference(tempStatDifference);
    } else {
      setStatDifference([0, 0, 0, 0, 0, 0]);
    }
  }, [selectedChemStyle, selectedChemistryPoints, stats, attributes]);
  return (
    <Link
      onClick={(e) => isDisabled && e.preventDefault()}
      to={`/player/${id}/${name?.replace(/\s+/g, "-")}`}
      target={shouldOpenInNewTab ? "_blank" : "_self"}
      rel={shouldOpenInNewTab ? "noopener noreferrer" : undefined}
    >
      <div
        key={id}
        className={classNames(
          "",
          isHover
            ? "flex group hover:scale-150 hover:z-20 hover:relative flex-col w-full items-center"
            : ""
        )}
        ref={cardRef}
        style={{ color: text_color }}
      >
        <div
          style={{
            color: text_color,
            "--fill-color": bg_color,
            "--text-color": text_color,
          }}
          className="block relative h-full "
        >
          <img className="h-full w-full" src={rarity_url} />

          <img
            className={
              !validGuid || base_id == id
                ? isMini
                  ? "absolute top-[14%] left-[55%] !w-[65%] h-1/2 -translate-x-1/2"
                  : "absolute top-[18.5%] left-[58%] !w-[65%] h-[45%] -translate-x-1/2"
                : "absolute top-0 w-full h-full"
            }
            src={buildPlayerUrl(guid, id, base_id)}
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop in case backup image also fails
              e.target.src = buildPlayerUrl(guid, base_id, base_id);

              setValidGuid(false);
            }}
            alt="Player"
          />
          <div
            style={{ fontSize: playerNameFontSize }}
            className={classNames(
              "font-bold leading-none top-[67.5%] absolute left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[75.2%] whitespace-nowrap overflow-hidden text-overflow-ellipsis text-center"
            )}
          >
            <span
              className={classNames(
                " text-[0.5em] pt-3  md:text-sm text-wrap hidden",
                isHover ? "group-hover:block" : ""
              )}
            >
              {c_name ?? name?.slice(0, 20)}
            </span>

            <div
              className={classNames(
                "flex flex-col gap-1 ",
                showPrice ? "pt-4 gap-0 md:gap-1" : " pt-0",
                isHover ? " group-hover:hidden" : ""
              )}
            >
              <div className=""> {player_name}</div>

              {showPrice && (
                <div className="flex justify-center gap-0">
                  <img src={CoinsImg} className="w-3 h-3" alt="" />{" "}
                  {latest_price?.toLocaleString("en-us")}
                </div>
              )}
            </div>
          </div>

          {!isMini && (
            <div
              className={`flex flex-row absolute top-[71%] w-[68.8%] gap-1 font-bold left-1/2 transform -translate-x-1/2 justify-between`}
            >
              {attributes.map((attribute, index) => (
                <AttributeDisplay
                  attributeNameFontSize={attributeNameFontSize}
                  attributeValueFontSize={attributeValueFontSize}
                  key={index}
                  label={labels[index]}
                  value={
                    statDifference?.[index] > 0
                      ? statDifference[index] + attribute
                      : attribute
                  }
                  isHome={isHome}
                  isAllPlayers={isAllPlayers}
                  isHighlighted={statDifference?.[index] > 0}
                  statDifference={statDifference?.[index]}
                />
              ))}
            </div>
          )}
          <div
            className={classNames(
              "absolute transform -translate-x-1/2 font-bold text-center flex flex-col gap-0.5 top-[20.2%]",
              isMini ? "left-[24.8%]" : "left-[24.8%]"
            )}
          >
            <div
              style={{ fontSize: ratingFontSize }}
              className={classNames(
                "font-cruyff-condensed-numbers-bold leading-[0.91em]"
              )}
            >
              {rating}
            </div>
            <div
              style={{ fontSize: positionFontSize }}
              className={classNames(
                "font-cruyff-condensed-medium leading-none  -mt-[0.07em]"
              )}
            >
              {position_abr ?? position[0]}
            </div>
          </div>
          <div
            id="playstyle_container"
            className={classNames(
              "absolute left-[9.8%]  top-[57.2%] transform -translate-y-1/2 -translate-x-1/2 z-2   text-transparent"
            )}
            style={{
              fontSize: playStyleFontSize,
            }}
          >
            {playstyle_plus.map((playstyle) => {
              return (
                <div className="relative">
                  <svg
                    className={classNames(
                      " svg-container svg-icon svg-icon--size-sm",
                      isMini ? "!w-[2em] !h-[2em]" : "!w-[2.5em] !h-[2.5em] "
                    )}
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    stroke={text_color}
                  >
                    <path
                      d="M12.813,104.953L68.157,21.862H188.143l55.045,83.091L128,235.138Z"
                      fill-opacity="1"
                      stroke={text_color}
                      stroke-linejoin="round"
                      stroke-width="8"
                      fill={bg_color}
                    ></path>
                  </svg>
                  <div className="playstyle_icon">
                    {getTraitIcon(playstyle, text_color)}
                  </div>
                </div>
              );
            })}
          </div>
          {/* ALternate Positions */}

          {!isMini && (
            <div
              style={{ fontSize: skillMovesFontSize }}
              className={classNames(
                "absolute right-[3.96%] top-[28.1%] transform -translate-y-1/2 z-2 text-center flex flex-col gap-[0.1em] "
              )}
            >
              {position.slice(1).map((pos) => (
                <div
                  class={`rounded-[0.35em] px-1 font-medium border-[0.09em] border-[--color] text-[--color] w-full whitespace-nowrap font-cruyff-condensed-medium  flex justify-center leading-[1] pb-[0.04em]  relative`}
                  style={{
                    backgroundColor: bg_color,
                  }}
                >
                  {pos}
                </div>
              ))}
            </div>
          )}
          {!isMini && (
            <div
              style={{ fontSize: skillMovesFontSize }}
              className={classNames(
                "absolute font-bold right-[3.96%] top-[58.2%] transform -translate-y-1/2 z-2  text-center flex flex-col gap-[0.1em] "
              )}
            >
              <div class="p-[0.1em]  rounded-[0.35em] bg-[--fill-color] border-[0.09em] border-[--color] text-[--color] w-full whitespace-nowrap font-cruyff-condensed-medium  flex justify-center leading-[1]  relative">
                {skill_moves} ★
              </div>
              <div class="p-[0.1em] rounded-[0.35em] bg-[--fill-color] border-[0.09em] border-[--color] text-[--color] w-full whitespace-nowrap font-cruyff-condensed-medium  flex justify-center leading-[1]  relative">
                {weak_foot}WF
              </div>
            </div>
          )}
          <div
            className={classNames(
              "absolute  flex justify-center   gap-[0.4em] ",
              isSuperMini
                ? "flex-col items-end  bg-white bg-opacity-10 top-[8%] right-[8%] py-2"
                : isMini
                ? `flex-col items-end bg-white bg-opacity-10 top-[10.8%] right-[10%] py-4`
                : isAllPlayers
                ? "top-[80.8%] w-full"
                : "top-[80.8%] w-full"
            )}
          >
            <img
              src={buildDynamicUrl("nation", nation)}
              class={classNames(
                "object-contain",
                isMini || isSuperMini ? "max-w-[15%]" : "max-w-[10%]"
              )}
              alt="Nation"
            />
            <img
              src={buildDynamicUrl("league", leagueid)}
              class={classNames(
                "object-contain",
                isMini || isSuperMini ? "max-w-[15%]" : "max-w-[10%]"
              )}
              alt="League"
            />

            <img
              src={buildDynamicUrl("club", teamid)}
              class={classNames(
                "object-contain",
                isMini || isSuperMini ? "max-w-[15%]" : "max-w-[10%]"
              )}
              alt=""
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlayerCard;

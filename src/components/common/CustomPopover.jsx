import React, { useMemo } from "react";
import { Popover } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { setPlayer } from "../../redux/playerSlice";
import {
  buildDynamicUrl,
  buildPlayerUrl,
  buildRarityUrl,
  fillZeros,
  getBgColor,
  getTextColor,
} from "../utils/utils";
import { Link } from "react-router-dom";
import { isHero, isIcon } from "../squadWizard/squadUtils";

const PopoverItems = ({ closePanel, player }) => {
  const dispatch = useDispatch();
  const rarities = useSelector((state) => state.app.rarities);

  if (!player?.name?.length) return null;

  const {
    base_id,
    id,
    name,
    nation,
    rating,
    position,
    c_name,
    teamid,
    rarity,
    leagueid,
  } = player;
  const otherPos = position.slice(1);

  const rarityObject = rarities.find((r) => r.id === rarity);
  const rarity_url = rarityObject
    ? buildRarityUrl({
        level: rarityObject.levels || 0,
        rating: rating,
        id: rarity,
      })
    : "";
  const textColor = rarityObject
    ? getTextColor({
        colors: rarityObject.colors,
        rating: rating,
        level: rarityObject.levels || 0,
        indices: rarityObject.lg_color_indices || [],
      })
    : "#ffffff";

  const bgColor = rarityObject
    ? getBgColor({
        colors: rarityObject.colors,
        rating: rating,
        level: rarityObject.levels || 0,
        indices: rarityObject.lg_color_indices || [],
      })
    : "#ffffff";
  const handleClick = () => {
    player["bg_color"] = fillZeros(player["bg_color"]);
    dispatch(setPlayer({ ...player }));
    closePanel();
  };

  return (
    <Link
      className="w-full"
      to={`/player/${id}/${name.replace(/\s+/g, "-")}`}
      onClick={handleClick}
    >
      <li
        style={{}}
        className="flex items-center gap-4 p-3  hover:bg-[#3b0c59] transition-all border border-transparent hover:border-gray-500 rounded-lg"
      >
        {/* Club & Nation Icons */}
        <div className="flex flex-col items-center gap-1">
          <img
            src={
              isIcon(player) || isHero(player)
                ? buildDynamicUrl("league", leagueid)
                : buildDynamicUrl("club", teamid)
            }
            width={28}
            className="h-6"
          />
          <img
            src={buildDynamicUrl("nation", nation)}
            width={28}
            className="h-5"
          />
        </div>

        {/* Player Image & Name */}
        <div className="flex items-center gap-3">
          <div
            style={{
              backgroundImage: `url(${rarity_url})`,
              backgroundSize: "150%", // Zoom in more
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center", // Focus on the top-left corner
              width: "50px", // Make it a small square
              height: "50px",
              borderRadius: "6px", // Keep slight rounding for a clean look
              overflow: "hidden",
              position: "relative", // Allows absolute positioning of child elements
            }}
            className="flex items-center justify-center"
          >
            <img
              src={buildPlayerUrl(null, base_id, base_id)}
              width={45}
              className="absolute top-0 left-[3px] rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex gap-1 items-center">
              <span className="text-white text-lg font-bold">
                {c_name ? c_name : name}
              </span>

              <span className="text-gray-400 text-xs">
                | {position[0]}{" "}
                {otherPos.length ? `- ${otherPos.join(",")}` : ""}
              </span>
            </div>

            <span className="text-white font-medium">
              TOTY Honourable Mentions
            </span>
          </div>
        </div>

        {/* Rating Badge */}
        <div
          style={{ background: bgColor, color: textColor }}
          className="ml-auto  text-black px-3 py-1 rounded-lg text-lg font-bold"
        >
          <span>{rating}</span>
        </div>
      </li>
    </Link>
  );
};

const CustomPopover = ({
  setPopperElement,
  styles,
  attributes,
  players,
  isOpen,
  closePanel,
  isLoading,
  popoverWidth,
}) => {
  const PopoverContent = useMemo(() => {
    return (
      <div className="max-h-[50vh] overflow-auto  rounded-lg bg-[#28004d] shadow-md ">
        <ul className="flex flex-col w-full gap-0">
          {players.map((player, idx) => (
            <PopoverItems key={idx} closePanel={closePanel} player={player} />
          ))}
        </ul>
      </div>
    );
  }, [players, closePanel]);

  return (
    <Popover>
      {isOpen && (
        <Popover.Panel
          ref={setPopperElement}
          style={{
            ...styles.popper,
            width: popoverWidth ? `${popoverWidth}px` : "auto", // Use exact width
            zIndex: 100,
          }}
          {...attributes.popper}
          static
        >
          {isLoading ? (
            <div className="text-white text-center p-4">Loading....</div>
          ) : (
            PopoverContent
          )}
        </Popover.Panel>
      )}
    </Popover>
  );
};

export default CustomPopover;

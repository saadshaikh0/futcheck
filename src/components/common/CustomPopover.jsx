import React, { useRef } from "react";
import { Popover } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { setPlayer } from "../../redux/playerSlice";
import { fillZeros, useOutsideClick } from "../utils/utils";
const PopoverItems = ({ closePanel, player }) => {
  const {
    base_id,

    name,
    rarity_url,
    nation_url,
    rating,
    position,
  } = player;

  const dispatch = useDispatch();
  if (!name || name.length == 0) {
    return null;
  }
  let otherPos = position.slice(1);
  return (
    <li
      onClick={() => {
        player["bg_color"] = fillZeros(player["bg_color"]);

        dispatch(
          setPlayer({
            ...player,
          })
        );
        closePanel();
      }}
      class="inline-flex cursor-pointer items-center gap-x-2 py-3 px-4 bg-slate-950 text-sm font-medium   text-white -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-slate-900 dark:border-gray-700 dark:text-white"
    >
      <div
        style={{
          backgroundImage: `url(${rarity_url})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
        className="p-4 pl-2 pt-2"
      >
        <img
          src={`https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/24B23FDE-7835-41C2-87A2-F453DFDB2E82/2024/fut/items/images/mobile/portraits/${base_id}.png`}
          width={40}
        />
      </div>

      <img src={nation_url} width={32} />
      <div className="grid grid-rows-2">
        <span>{name}</span>
        <div>
          <span>{position[0]}</span>
          {otherPos.length ? <span>-{otherPos.join(",")}</span> : <></>}
        </div>
      </div>
      <div className="ml-auto">
        <span>{rating}</span>
      </div>
    </li>
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
}) => {
  const PopoverContent = () => {
    return (
      <div className="w-[100vw] md:w-[65vw] max-h-[50vh] overflow-auto">
        <ul class="flex flex-col">
          {players.map((player) => {
            return <PopoverItems closePanel={closePanel} player={player} />;
          })}
        </ul>
      </div>
    );
  };

  return (
    <Popover>
      {isOpen && (
        <Popover.Panel
          ref={setPopperElement}
          style={{ ...styles.popper, width: "auto", zIndex: 100 }}
          {...attributes.popper}
          static
        >
          {isLoading ? (
            <div className="text-white text-center w-[100vw]">Loading....</div>
          ) : (
            <PopoverContent />
          )}
        </Popover.Panel>
      )}
    </Popover>
  );
};

export default CustomPopover;

import { useEffect } from "react";

export const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const buildPlayerUrl = (guId, eaId, baseId) => {
  if (!guId || baseId == eaId)
    return `
https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/24B23FDE-7835-41C2-87A2-F453DFDB2E82/2024/fut/items/images/mobile/portraits/${eaId}.png`;
  return `https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/24B23FDE-7835-41C2-87A2-F453DFDB2E82/2024/fut/items/images/actionShot/${guId}/p${eaId}.png`;
};

export const decimalToHex = (decimal) => {
  // Convert decimal to hexadecimal using toString() method with radix 16
  var hex = decimal.toString(16);

  // Pad the hexadecimal number with leading zeros if necessary
  while (hex.length < 6) {
    hex = "0" + hex;
  }

  // Prepend '#' to the hexadecimal number to form a valid color code
  return "#" + hex;
};

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutsideClick(ref, onClickOutside) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
export const updateRarity = (data) => {
  data.forEach((player) => {
    if (player.rarity == 0 || player.rarity == 1)
      player.rarity_url = player.rarity_url.replace(
        /_(\d+).png/,
        `_${player.level}.png`
      );
  });
  return data;
};

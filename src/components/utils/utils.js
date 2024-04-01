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
export const fillZeros = (hexcode) => {
  // Remove '#' if present
  hexcode = hexcode.replace("#", "");

  // Check if the length is less than 6
  if (hexcode.length < 6) {
    // Calculate the number of zeros to add
    var zerosToAdd = 6 - hexcode.length;

    // Add leading zeros
    hexcode = "0".repeat(zerosToAdd) + hexcode;
  }

  // Add '#' back
  hexcode = "#" + hexcode;

  return hexcode;
};

export const buildPlayerUrl = (guId, eaId, baseId) => {
  if (!guId || baseId == eaId)
    return `
https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/24B23FDE-7835-41C2-87A2-F453DFDB2E82/2024/fut/items/images/mobile/portraits/${eaId}.png`;
  return `https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/24B23FDE-7835-41C2-87A2-F453DFDB2E82/2024/fut/items/images/actionShot/${guId}/p${eaId}.png`;
};

export const buildRarityUrl = ({ guid, size, level, rating, id }) => {
  let level_no = level;
  if (level_no > 0) {
    if (rating >= 75) {
      level_no = 3;
    } else if (rating >= 65) {
      level_no = 2;
    } else {
      level_no = 1;
    }
  }
  return `https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/24B23FDE-7835-41C2-87A2-F453DFDB2E82/2024/fut/items/images/backgrounds/itemBGs/${guid}/cards_bg_${size}_1_${id}_${level_no}.png`;
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
export const convertToMinutes = (timeString) => {
  const matches = timeString.match(
    /(\d+)\s*(min|hour|mins|sec|secs|hours) ago/
  );
  if (matches) {
    const value = parseInt(matches[1]);
    const unit = matches[2];
    if (unit.includes("hour")) {
      return value * 3600; // Convert hours to minutes
    } else if (unit.includes("min")) {
      return value * 60;
    } else {
      return value; // Minutes
    }
  }
  return 0; // Default to 0 minutes if no match
};
export const getTextColor = ({ colors, rating, level }) => {
  let level_no = level;
  if (level_no > 0) {
    if (rating >= 75) {
      level_no = 3;
    } else if (rating >= 65) {
      level_no = 2;
    } else {
      level_no = 1;
    }
  }
  let color = level_no == 0 ? colors[0] : colors[(level_no - 1) * 3];
  return fillZeros(color);
};
export const getBgColor = ({ colors, rating, level }) => {
  let level_no = level;
  if (level_no > 0) {
    if (rating >= 75) {
      level_no = 3;
    } else if (rating >= 65) {
      level_no = 2;
    } else {
      level_no = 1;
    }
  }
  let color = level_no == 0 ? colors[1] : colors[(level_no - 1) * 3 + 1];
  return fillZeros(color);
};

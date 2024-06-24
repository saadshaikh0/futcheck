import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/appSlice";
import { verifyToken } from "../../api/apiService";

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

export const buildSbcImageUrl = (imageId) => {
  return `https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/24B23FDE-7835-41C2-87A2-F453DFDB2E82/2024/fut/sbc/companion/sets/images/sbc_set_image_${imageId}.png`;
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

export function convertString(input) {
  // Initialize an empty array to hold the result strings
  let result = [];

  // Initialize a counter for occurrences
  let count = 1;

  // Loop through the string characters
  for (let i = 0; i < input.length; i++) {
    // Check if the current character is the same as the next character
    if (input[i] === input[i + 1]) {
      // If so, increment the count
      count++;
    } else {
      // If not, push the current character and its count to the result array,
      // then reset the count to 1
      result.push([input[i], count]);
      count = 1;
    }
  }

  // Join the result array into a string, separated by commas
  return result;
}

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

export const useFetchUserInfo = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserInfo = async (token) => {
      try {
        const userInfo = await verifyToken({
          token: token,
        });
        const { access, refresh } = userInfo.tokens;
        localStorage.setItem("google_token", token);
        localStorage.setItem("access_token", access);
        dispatch(setUserInfo(userInfo));
      } catch (error) {
        console.error("Failed to fetch user info", error);
        // Optionally clear user info or handle error
      }
    };

    const token = localStorage.getItem("google_token");
    if (token) {
      fetchUserInfo(token);
    }
  }, [dispatch]);
};

export const addRarityUrl = (data, type = "s") => {
  let updatedData = data.map((player) => {
    player.rarity_url = buildRarityUrl({
      guid: player.guid_no,
      size: type,
      level: player.levels,
      rating: player.rating,
      id: player.rarity,
    });
    player.text_color = getTextColor({
      colors: player.colors,
      rating: player.rating,
      level: player.levels,
    });
    player.bg_color = getBgColor({
      colors: player.colors,
      rating: player.rating,
      level: player.levels,
    });
    return player;
  });
  return updatedData;
};
export default useFetchUserInfo;
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
export function getTimeUntilExpiration(endTimestamp) {
  const now = Date.now();
  const endTime = new Date(endTimestamp).getTime();
  const timeDiff = endTime - now;

  if (timeDiff <= 0) {
    return "Expired";
  }

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} days`;
  } else if (hours > 0) {
    return `${hours} hours`;
  } else if (minutes > 0) {
    return `${minutes} minutes`;
  } else {
    return `${seconds} seconds`;
  }
}
export const timeAgo = (inputDate) => {
  const currentDate = new Date();
  const pastDate = new Date(inputDate);
  const diffInMilliseconds = currentDate - pastDate;

  const seconds = Math.floor(diffInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return years === 1 ? "1 year ago" : `${years} years ago`;
  } else if (months > 0) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  } else if (weeks > 0) {
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  } else if (days > 0) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else {
    return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
  }
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
  let color = colors
    ? level_no == 0
      ? colors[0]
      : colors[(level_no - 1) * 3]
    : "#ffffff";
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
  let color = colors
    ? level_no == 0
      ? colors[1]
      : colors[(level_no - 1) * 3 + 1]
    : "#ffffff";
  return fillZeros(color);
};

export const useScrollToBottom = (callback) => {
  const endOfDivRef = useRef(null);

  useEffect(() => {
    const div = endOfDivRef.current;
    const onScroll = () => {
      if (div && div.scrollTop + div.clientHeight >= div.scrollHeight - 1) {
        // Adding a tolerance of 1px for rounding issues
        callback();
      }
    };

    if (div) {
      div.addEventListener("scroll", onScroll);
    }

    return () => {
      if (div) {
        div.removeEventListener("scroll", onScroll);
      }
    };
  }, [callback]); // Ensure the effect re-runs if the callback changes

  return endOfDivRef;
};

export const decodeJWT = (token) => {
  try {
    const base64Url = token.split(".")[1]; // Get the payload part
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Convert to a standard base64 string
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding the JWT:", error);
    return null;
  }
};
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

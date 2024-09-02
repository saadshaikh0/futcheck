import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/appSlice";
import { verifyToken } from "../../api/apiService";

// utils.js
import store from "../../redux/store";
import { RARITY, RARITY_GROUP, SBC_REQUIREMENTS } from "./sbc_requirements";

export const getNationName = (id) => {
  const state = store.getState();
  const nations = state.app.nations; // Adjust based on your state structure
  const nation = nations.find((nation) => nation.id === id);
  return nation ? nation.name : "Unknown";
};

export const getLeagueName = (id) => {
  const state = store.getState();
  const leagues = state.app.leagues; // Adjust based on your state structure
  const league = leagues.find((league) => league.id === id);
  return league ? league.name : "Unknown";
};

export const getTeamName = (id) => {
  const state = store.getState();
  const teams = state.app.teams; // Adjust based on your state structure
  const team = teams.find((team) => team.id === id);
  return team ? team.name : "Unknown";
};

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

export const buildChallengeImageUrl = (challengeImageId) => {
  return `https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/24B23FDE-7835-41C2-87A2-F453DFDB2E82/2024/fut/sbc/companion/challenges/images/sbc_challenge_image_${challengeImageId}.png
`;
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

export const convertElgReqToFormat = (reqs) => {
  const finalArr = [];
  reqs.forEach((req) => {
    const { type, eligibilityslot, eligibilityvalue } = req;
    let obj = finalArr[eligibilityslot - 1] ?? {};
    switch (type) {
      case "SCOPE":
        obj["scope"] = eligibilityvalue;
        break;

      case "PLAYER_COUNT":
        obj["playerValue"] = eligibilityvalue;
        break;

      default:
        if (type && eligibilityvalue) {
          obj["type"] = type;
          obj["value"] = eligibilityvalue;
        }
    }
    finalArr[eligibilityslot - 1] = obj;
  });
  return finalArr;
};

export const convertElgReqToStrings = (req) => {
  let u = "sbc.requirements.";
  let c = "scope" + req["scope"];
  let playerValue = req["playerValue"];
  let e = (playerValue === 1 ? u + "player." : u + "players.") + c;
  let str = "";
  let type = req["type"];
  let value = req["value"];
  let i = "";
  switch (type) {
    case "ALL_PLAYERS_CHEMISTRY_POINTS":
      str = u + "team.player-chemistry-points." + c;
      str = SBC_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());

      break;
    case "CHEMISTRY_POINTS":
      str = u + "team.chemistry-points." + c;
      str = SBC_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());

      break;
    case "TEAM_STAR_RATING":
      str = u + "team.rating." + c;
      str = SBC_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;
    case "TEAM_RATING_1_TO_100":
      str = u + "team.rating1to100." + c;
      str = SBC_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());

      break;
    case "SAME_NATION_COUNT":
      str = u + "players." + c;
      str = SBC_REQUIREMENTS[str];
      str = str.replace("%1", value.toString()).replace("%2", "Nation");
      break;
    case "SAME_LEAGUE_COUNT":
      str = u + "players." + c;
      str = SBC_REQUIREMENTS[str];
      str = str.replace("%1", value.toString()).replace("%2", "League");
      break;
    case "SAME_CLUB_COUNT":
      str = u + "players." + c;
      str = SBC_REQUIREMENTS[str];
      str = str.replace("%1", value.toString()).replace("%2", "Club");
      break;
    case "NATION_COUNT":
      str = u + "nations." + c;
      str = SBC_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());

      break;
    case "LEAGUE_COUNT":
      str = u + "leagues." + c;
      str = SBC_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());

      break;
    case "CLUB_COUNT":
      str = u + "clubs." + c;
      str = SBC_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());

      break;
    case "NATION_ID":
      str = e + ".val";
      str = SBC_REQUIREMENTS[str];
      str = str.replace("%1", playerValue.toString());
      i = getNationName(value);
      str = i + ":" + str;

      break;
    case "LEAGUE_ID":
      str = e + ".val";
      str = SBC_REQUIREMENTS[str];
      str = str.replace("%1", playerValue.toString());
      i = getLeagueName(value);
      str = i + ":" + str;
      break;
    case "CLUB_ID":
      str = e + ".val";
      str = SBC_REQUIREMENTS[str];
      str = str.replace("%1", playerValue.toString());
      i = getTeamName(value);
      str = i + ":" + str;
      break;
    case "LEGEND_COUNT":
      var h = playerValue === 1 ? "legend." : "legends.";
      str = u + h + c;
      str = SBC_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());

      break;
    case "PLAYER_RARITY":
      // let rarityName = getRarityName(value);
      let rarityName = RARITY[`item.raretype${value}`];
      str = u + "rare." + c;
      str = SBC_REQUIREMENTS[str];
      str = str.replace("%1", playerValue.toString());
      str = rarityName + ": " + str;
      break;
    case "PLAYER_RARITY_GROUP":
      let rarityGroup = RARITY_GROUP[`Player_Group_${value}`];
      str = u + "rare." + c;
      str = SBC_REQUIREMENTS[str];
      str = str.replace("%1", playerValue.toString());
      str = rarityGroup + ": " + str;
      break;
    case "PLAYER_MAX_OVR":
      str = u + "rating.max." + c;
      str = SBC_REQUIREMENTS[str];
      str = str
        .replace("%1", playerValue.toString())
        .replace("%2", value.toString());
      break;
    case "PLAYER_MIN_OVR":
      str = u + "rating.min." + c;
      str = SBC_REQUIREMENTS[str];
      str = str
        .replace("%1", playerValue.toString())
        .replace("%2", value.toString());
    case "PLAYER_EXACT_OVR":
      str = u + "rating.exact." + c;
      str = SBC_REQUIREMENTS[str];
      str = str
        .replace("%1", playerValue.toString())
        .replace("%2", value.toString());

    case "FIRST_OWNER_PLAYERS_COUNT":
      str = u + "firstowner." + c;
      str = SBC_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;
    default:
      return "Reached default case building eligibility string: ";
  }
  return str;
};

export function convertFormation(input = "f433") {
  // Remove the initial 'f'
  input = input.slice(1);
  // Use a regular expression to find all numeric characters
  let numbers = input.match(/\d+/g);

  // Join the numbers with a hyphen
  let formattedNumbers = numbers[0].split("").join("-");

  // Find any trailing alphabets
  let alphabets = input.match(/[a-zA-Z]+$/);

  // Concatenate the formatted numbers with the alphabets if any
  let result = alphabets ? formattedNumbers + alphabets[0] : formattedNumbers;

  return result;
}

// {
//   league: "La Liga",
//   image:
//     "https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/24B23FDE-7835-41C2-87A2-F453DFDB2E82/2024/fut/items/images/mobile/leagueLogos/dark/53.png",
//   leagueid: 53,
//   Spain: 35,
//   Argentina: 25,
//   France: 15,
//   Portugal: 10,
// },

export const formatValue = (value) => {
  const formatWithSuffix = (num, suffix) => {
    let formattedValue = num.toFixed(3);

    // Ensure the string length is at most 3 characters
    if (formattedValue.length > 4) {
      formattedValue = formattedValue.slice(0, 4);
    }

    // Remove trailing period if present
    if (formattedValue.endsWith(".")) {
      formattedValue = formattedValue.slice(0, -1);
    }

    return `${formattedValue}${suffix}`;
  };

  if (Math.abs(value) >= 1000000) {
    return formatWithSuffix(value / 1000000, "M");
  } else if (Math.abs(value) >= 1000) {
    return formatWithSuffix(value / 1000, "K");
  } else {
    return value.toString();
  }
};

export function convertCostDistribution(cost_distribution, leagueIdMap) {
  let nations = new Set();
  let data = cost_distribution?.map((val) => {
    const leagueData = leagueIdMap[val.leagueid];
    let temp_data = {
      ...val,
      league: leagueData?.name,
      image: leagueData?.guid,
    };
    Object.keys(val).forEach((key) => {
      if (key !== "leagueid") {
        nations.add(key);
      }
    });

    return temp_data;
  });
  nations = Array.from(nations);
  return { data, nations };
}

// Example usage:
const result = timeAgo("2024-09-02T01:19:16.301");
console.log(result); // Output will be something like "5 minutes ago", "1 hour ago", etc.

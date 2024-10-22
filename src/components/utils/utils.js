import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/appSlice";
import { verifyToken } from "../../api/apiService";

// utils.js
import store from "../../redux/store";
import {
  ACADEMY_REQUIREMENTS,
  RARITY,
  RARITY_GROUP,
  SBC_REQUIREMENTS,
} from "./sbc_requirements";
import { positions } from "./formations";
import {
  AcademyEligibilityAttribute,
  AcademyStatEnum,
  TraitMapping,
} from "./constants";
import { mapAttributeIdToLocString } from "../evos/EvolutionUtils";

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
export const getRarityName = (id) => {
  const state = store.getState();
  const rarities = state.app.rarities; // Adjust based on your state structure
  const rarity = rarities.find((rarity) => rarity.id === id);
  return rarity ? rarity.name : "Unknown";
};
export const getPositionName = (id) => {
  const position = positions.find((pos) => pos.uniqueId === id);
  return position ? position.typeName : "Unknown";
};

export const getTraitName = (id) => {
  return TraitMapping[id]?.name ?? "Unknown";
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

const BASE_URL = "https://cdn.futcheck.com/assets/img/fc25";
export const buildChallengeImageUrl = (challengeImageId) => {
  return `https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/24B23FDE-7835-41C2-87A2-F453DFDB2E82/2024/fut/sbc/companion/challenges/images/sbc_challenge_image_${challengeImageId}.png
`;
};

export const buildPlayerUrl = (guId, eaId, baseId) => {
  return `${BASE_URL}/player/${eaId}.webp`;
  // return `${BASE_URL}/player//${guId}/p${eaId}.png`;
};

export const buildDynamicUrl = (type, id) => {
  return `${BASE_URL}/${type}/${id}.png`;
};

export const buildRarityUrl = ({ level, rating, id }) => {
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
  return `${BASE_URL}/card/l_${level_no}_r_${id}.png`;
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
  console.log(data);
  let updatedData = data.map((player) => {
    player.rarity_url = buildRarityUrl({
      level: player.levels || 0,
      rating: player.rating,
      id: player.rarity,
    });
    player.text_color = getTextColor({
      colors: player.colors,
      rating: player.rating,
      level: player.levels || 0,
    });
    player.bg_color = getBgColor({
      colors: player.colors,
      rating: player.rating,
      level: player.levels || 0,
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
  const now = Date.now() + new Date().getTimezoneOffset() * 60000; // This forces 'now' to UTC

  const endTime = new Date(endTimestamp).getTime(); // This is already in UTC

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
export const timeAgo = (inputDate, isTimeZone) => {
  const pastDate = new Date(inputDate); // JavaScript handles the time zone conversion automatically
  let istOffsetInMilliseconds = 0;
  if (isTimeZone) {
    istOffsetInMilliseconds = 5.5 * 60 * 60 * 1000;
  }
  const pastDateUTC = pastDate.getTime() - istOffsetInMilliseconds; // Converts the IST time to UTC in milliseconds
  const now = Date.now() + new Date().getTimezoneOffset() * 60000;
  // Calculate the difference in milliseconds
  const diffInMilliseconds = now - pastDateUTC;

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

export const convertAcademyElgReqToFormat = (reqs) => {
  const finalArr = [];
  reqs.forEach((req) => {
    const { type, eligibilitySlot, eligibilityValue } = req;
    let obj = finalArr[eligibilitySlot - 1] ?? {};
    switch (type) {
      case "SCOPE":
        obj["scope"] = eligibilityValue;
        break;
      case "PLAYER_ATTRIBUTE":
        obj["type"] = eligibilityValue;
        break;

      case "ACADEMY_PLAYER_SLOTTING":
        obj["value"] = eligibilityValue;
        break;
      default:
    }
    finalArr[eligibilitySlot - 1] = obj;
  });
  return finalArr;
};

const QUALITY_DICT = {
  3: "Gold",
  2: "Silver",
  1: "Bronze",
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
    case "PLAYER_QUALITY":
      str = u + "rare." + c;
      str = SBC_REQUIREMENTS[str];
      str = str.replace("%1", QUALITY_DICT[value]);

      break;
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
      break;
    case "PLAYER_EXACT_OVR":
      str = u + "rating.exact." + c;
      str = SBC_REQUIREMENTS[str];
      str = str
        .replace("%1", playerValue.toString())
        .replace("%2", value.toString());
      break;
    case "FIRST_OWNER_PLAYERS_COUNT":
      str = u + "firstowner." + c;
      str = SBC_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "PLAYER_LEVEL":
      str = u + "rare." + c;
      str = SBC_REQUIREMENTS[str];
      str = str.replace("%1", playerValue.toString());
      str += ": " + QUALITY_DICT[value];
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

export const formatPrice = (value) => {
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

export const calculateFaceStats = (stats, IN_GAME_STATS) => {
  const calculateWeightedAverage = (statGroup) => {
    let totalWeight = 0;
    let weightedSum = 0;

    statGroup.forEach(([name, index, weight]) => {
      weightedSum += Math.min(99, stats[index]) * weight;
      totalWeight += weight;
    });

    return Math.min(99, Math.round(weightedSum / totalWeight));
  };

  // Calculate weighted averages for each group in order [PAC, SHO, PAS, DRI, DEF, PHY]
  const faceStats = [
    calculateWeightedAverage(IN_GAME_STATS.pace), // PAC
    calculateWeightedAverage(IN_GAME_STATS.shooting), // SHO
    calculateWeightedAverage(IN_GAME_STATS.passing), // PAS
    calculateWeightedAverage(IN_GAME_STATS.dribbling), // DRI
    calculateWeightedAverage(IN_GAME_STATS.defending), // DEF
    calculateWeightedAverage(IN_GAME_STATS.physicality), // PHY
  ];

  return faceStats;
};

function combineValueStrings(arr, separator = " OR ") {
  return arr
    .map((val, index) => {
      return index < arr.length - 1 ? val + separator : val;
    })
    .join("");
}

export const convertAcademyReqToStrings = (req) => {
  let base = "academy.requirements.";
  let scope = "scope" + req["scope"];
  let str = "";
  let type = req["type"];
  type = AcademyEligibilityAttribute[type];
  let value = req["value"];
  let localized = ""; // Placeholder for the localized string, if any

  const processValue = (value, callback) => {
    if (Array.isArray(value)) {
      return combineValueStrings(value.map(callback));
    }
    return callback(value);
  };

  switch (type) {
    case "OVR":
      str = base + "player.ovr." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "PACE":
      str = base + "player.pace." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "SHOOTING":
      str = base + "player.shooting." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "PASSING":
      str = base + "player.passing." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "DRIBBLING_MAIN":
      str = base + "player.dribbling_main." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "DEFENSE":
      str = base + "player.defense." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "PHYSICALITY":
      str = base + "player.physicality." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "ACCELERATION":
      str = base + "player.acceleration." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "SPRINT_SPEED":
      str = base + "player.sprint_speed." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "AGILITY":
      str = base + "player.agility." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "BALANCE":
      str = base + "player.balance." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "JUMPING":
      str = base + "player.jumping." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "STAMINA":
      str = base + "player.stamina." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "STRENGTH":
      str = base + "player.strength." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "REACTIONS":
      str = base + "player.reactions." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "AGGRESSION":
      str = base + "player.aggression." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "COMPOSURE":
      str = base + "player.composure." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "INTERCEPTIONS":
      str = base + "player.interceptions." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "POSITIONING":
      str = base + "player.positioning." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "VISION":
      str = base + "player.vision." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "BALL_CONTROL":
      str = base + "player.ball_control." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "CROSSING":
      str = base + "player.crossing." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "DRIBBLING_SUB":
      str = base + "player.dribbling_sub." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "FINISHING":
      str = base + "player.finishing." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "FK_ACC":
      str = base + "player.fk_acc." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "HEADING_ACC":
      str = base + "player.heading_acc." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "LONG_PASSING":
      str = base + "player.long_passing." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "SHORT_PASSING":
      str = base + "player.short_passing." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "DEF_AWARENESS":
      str = base + "player.def_awareness." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "SHOT_POWER":
      str = base + "player.shot_power." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "LONG_SHOTS":
      str = base + "player.long_shots." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "STANDING_TACKLE":
      str = base + "player.standing_tackle." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "SLIDING_TACKLE":
      str = base + "player.sliding_tackle." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "VOLLEYS":
      str = base + "player.volleys." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "CURVE":
      str = base + "player.curve." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "PENALTIES":
      str = base + "player.penalties." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "WEAK_FOOT":
      str = base + "player.weak_foot." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "SKILL_MOVES":
      str = base + "player.skill_moves." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "DEFINITION_ID":
      let names = processValue(value, (target) => {
        // return getItemNameByDefId(target); // assuming you have this function
        return "";
      });
      str = ACADEMY_REQUIREMENTS[base + "player.defId"];
      str = names + ": " + str;
      break;

    case "NATION":
      localized = processValue(value, getNationName); // assuming you have this function
      str = "Nation: " + localized;
      break;

    case "LEAGUE":
      localized = processValue(value, getLeagueName); // assuming you have this function
      str = "League: " + localized;
      break;

    case "CLUB":
      localized = processValue(value, getTeamName); // assuming you have this function
      str = "Club: " + localized;
      break;

    case "RARITY":
      let rarity = processValue(value, getRarityName); // assuming you have this function
      str = ACADEMY_REQUIREMENTS[base + "rarity." + scope];
      str += " " + rarity;
      break;

    case "RARITY_NEGATED":
      let negatedRarity = processValue(value, getRarityName); // assuming you have this function
      str = ACADEMY_REQUIREMENTS[base + "rarity.not." + scope];
      str += " " + negatedRarity;
      break;

    case "POSITION":
      let positionNames = processValue(value, getPositionName); // assuming you have this function
      str = ACADEMY_REQUIREMENTS[base + "position." + scope];
      str += " " + positionNames;
      break;

    case "POSITION_NEGATED":
      let negatedPositionNames = processValue(value, getPositionName); // assuming you have this function
      str = ACADEMY_REQUIREMENTS[base + "position.not." + scope];
      str += " " + negatedPositionNames;
      break;

    case "POSSIBLE_POSITIONS_COUNT":
      str = base + "player.alt_positions_count." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "UNTRADEABLE":
      let tradeStatus = value === 1 ? "untradable" : "tradable";
      str = ACADEMY_REQUIREMENTS[base + tradeStatus];
      break;

    case "BASE_TRAITS_COUNT":
      str = base + "player.base-traits-count." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "ICON_TRAITS_COUNT":
      str = base + "player.icon-traits-count." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "TOTAL_TRAITS_COUNT":
      str = base + "player.total-traits-count." + scope;
      str = ACADEMY_REQUIREMENTS[str];
      str = str.replace("%1", value.toString());
      break;

    case "BASE_TRAIT_PRESENT":
      let baseTrait = processValue(value, getTraitName); // assuming you have this function
      str = ACADEMY_REQUIREMENTS[base + "player.base-traits-exists"];
      str = baseTrait + ": " + str;
      break;

    case "ICON_TRAIT_PRESENT":
      let iconTrait = processValue(value, getTraitName); // assuming you have this function
      str = ACADEMY_REQUIREMENTS[base + "player.icon-traits-exists"];
      str = iconTrait + ": " + str;
      break;

    case "MAX_ROLES_PP":
      str = ACADEMY_REQUIREMENTS[base + "player.max-roles-plus-plus." + scope];
      str = str.replace("%1", value.toString());
      break;
    default:
      return "Default case encountered for requirement type: " + type;
  }

  return str;
};

export const processLevels = (levels) => {
  const finalUpgrade = {}; // key: value, value: total count

  const levelsData = levels.map((level) => {
    // Process awards
    const awardsData = level.awards.map((award) => {
      const attributeName = AcademyStatEnum[award.value];
      const attributeType = mapAttributeIdToLocString(attributeName);
      const count = award.count;

      // Update finalUpgrade (excluding value: 2 for rarity)
      if (award.value !== 2) {
        if (!finalUpgrade[attributeType]) {
          finalUpgrade[attributeType] = {};
        }
        if (!finalUpgrade[attributeType][award.value]) {
          finalUpgrade[attributeType][award.value] = 0;
        }
        finalUpgrade[attributeType][award.value] += count;
      } else {
        if (!finalUpgrade[attributeType]) {
          finalUpgrade[attributeType] = {};
        }
        finalUpgrade[attributeType][award.value] = count;
      }

      return {
        attributeName,
        attributeType,
        count,
        value: award.value,
        maxValue: award.maxValue || null,
        priority: award.priority,
      };
    });

    // Process objectives if any
    const objectivesData = level.objectives
      ? level.objectives.map((objective) => ({
          name: objective.name,
          isWeb: objective.isWeb,
          gameArea: objective.gameArea,
          priority: objective.priority,
          multiplier: objective.multiplier,
          description: objective.description,
          objectiveId: objective.objectiveId,
          takeMeThereLink: objective.takeMeThereLink,
        }))
      : [];

    return {
      level: level.level,
      levelState: level.levelState,
      awards: awardsData,
      objectives: objectivesData,
    };
  });

  // Create the final upgrade data
  const finalUpgradeData = Object.entries(finalUpgrade).flatMap(
    ([type, values]) =>
      Object.entries(values).map(([value, count]) => {
        const attributeName = AcademyStatEnum[value];
        return {
          attributeName,
          attributeType: type,
          count,
          value: parseInt(value, 10),
        };
      })
  );

  return {
    levelsData,
    finalUpgradeData,
  };
};

import {
  buildRarityUrl,
  getBgColor,
  getTextColor,
  updateRarity,
} from "../components/utils/utils";
import instance from "./axiosclient";
import ReactGA from "react-ga4";
ReactGA.initialize("G-RD6LGLC1LD");

export const fetchPlayers = async (value, searchMode) => {
  if (!value || value.length == 0) return [];
  try {
    ReactGA.event({
      category: "Searching Player",
      action: value,
      label: value,
    });
    let searchQuery = "/search/?";
    if (searchMode == "rating") {
      searchQuery += `rating=${value}`;
    } else {
      searchQuery += `name=${value}`;
    }
    const response = await instance.get(searchQuery);
    let data = response.data.data;
    data.forEach((player) => {
      player.rarity_url = buildRarityUrl({
        guid: player.guid_no,
        size: "s",
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
    });
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
export const fetchPrice = async (id, futwiz_id) => {
  try {
    if (!id) {
      return {};
    }
    const response = await instance.get(`/price/?id=${id}&fid=${futwiz_id}`);
    let data = response.data.data;

    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
export const fetchVersions = async (base_id, id) => {
  if (!base_id || !id) {
    return [];
  }
  const response = await instance.get(`/versions/?id=${base_id}&eId=${id}`);
  let data = response.data.data;
  data.forEach((player) => {
    player.rarity_url = buildRarityUrl({
      guid: player.guid_no,
      size: "s",
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
  });
  return data;
};

export const fetchLatestPlayers = async () => {
  const response = await instance.get(`/get_latest/`);

  let data = response.data.data;
  data.forEach((player) => {
    player.rarity_url = buildRarityUrl({
      guid: player.guid_no,
      size: "s",
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
  });
  return data;
};
export const fetchTopRatedPlayers = async () => {
  const response = await instance.get(`/top_rated/`);
  let data = response.data.data;
  data.forEach((player) => {
    player.rarity_url = buildRarityUrl({
      guid: player.guid_no,
      size: "s",
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
  });
  return data;
};
export const fetchAllRarities = async () => {
  const PROMOS_TO_HIDE = [
    "standard",
    "legendary",
    "select",
    "premium",
    "ultimate",
    "vintage",
    "epic",
    "storyline",
  ];
  const response = await instance.get(`/get_promos/`);
  let data = response.data.data;
  data = data.filter(
    (rarity) =>
      !(
        PROMOS_TO_HIDE.includes(rarity.name.toLowerCase()) ||
        rarity.name.toLowerCase().includes("evo")
      )
  );
  data.forEach((promo) => {
    promo.rarity_url = buildRarityUrl({
      guid: promo.guid_no,
      size: "s",
      level: promo.levels,
      rating: 99,
      id: promo.id,
    });
  });
  return data;
};
export const fetchAllNations = async () => {
  const response = await instance.get(`/get_nations/`);
  return response.data.data;
};
export const fetchRatingsPrices = async () => {
  const response = await instance.get("/get_ratings_prices/");
  let data = response.data.data;
  let ratings_price = {};
  data.forEach(({ rating, price_ps }) => (ratings_price[rating] = price_ps));
  return ratings_price;
};

export const fetchAllLeagues = async () => {
  const response = await instance.get(`/get_leagues/`);
  return response.data.data;
};
export const fetchAllTeams = async () => {
  const response = await instance.get(`/get_teams/`);
  return response.data.data;
};
export const fetch_combinations = async (payload) => {
  const response = await instance.post(`/get_combinations/`, payload, {
    timeout: 30000,
  });
  return response.data.body;
};

export const fetchAllPlayers = async ({
  page,
  min_rating,
  max_rating,
  teamid,
  nation,
  rarity,
  leagueid,
  skill_moves,
  weak_foot,
  awr,
  dwr,
}) => {
  // Construct query parameters
  const queryParams = new URLSearchParams();

  if (page) queryParams.append("page", page);
  if (min_rating) queryParams.append("min_rating", min_rating);
  if (max_rating) queryParams.append("max_rating", max_rating);
  if (teamid) queryParams.append("teamid", teamid.id);
  if (nation) queryParams.append("nation", nation.id);
  if (rarity) queryParams.append("rarity", rarity.id);
  if (leagueid) queryParams.append("leagueid", leagueid.id);
  if (skill_moves) queryParams.append("skill_moves", skill_moves - 1);
  if (weak_foot) queryParams.append("weak_foot", weak_foot);
  if (awr !== null && awr !== undefined) queryParams.append("awr", awr);
  if (dwr !== null && dwr !== undefined) queryParams.append("dwr", dwr);

  // Construct the URL with query parameters
  const url = `/players/?${queryParams.toString()}`;

  // Make the GET request
  const response = await instance.get(url);
  const { players, total_pages, current_page } = response.data;
  players.forEach((player) => {
    player.rarity_url = buildRarityUrl({
      guid: player.guid_no,
      size: "s",
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
  });
  return { players, total_pages, current_page };
};
export const fetchSimilarPlayers = async ({
  rating,
  nation,
  leagueid,
  teamid,
  skill_moves,
  weak_foot,
  rarity,
}) => {
  const response = await instance.get(
    `/get_similar_players/?rating=${rating}&nation=${nation}&leagueid=${leagueid}&teamid=${teamid}&skill_moves=${skill_moves}&weak_foot=${weak_foot}&rarity=${rarity}&encoded_position=${"ST"}`,
    {
      timeout: 30000,
    }
  );
  let data = response.data.data;
  data.forEach((player) => {
    player.rarity_url = buildRarityUrl({
      guid: player.guid_no,
      size: "s",
      level: player.levels,
      rating: player.rating,
      id: player.rarity_id,
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
  });
  return data;
};
export const fetchPlayerDetails = async (id) => {
  ReactGA.event({
    category: "Fetching Player details",
    action: id,
    label: id,
  });
  const response = await instance.get(`/get_player/?id=${id}`);
  let data = response.data.data;
  data.forEach((player) => {
    player.rarity_url = buildRarityUrl({
      guid: player.guid_no,
      size: "e",
      level: player.levels,
      rating: player.rating,
      id: player.rarity_id,
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
  });
  return data;
};

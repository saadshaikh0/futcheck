import axios from "axios";
import {
  addRarityUrl,
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
  return data;
};

export const fetchLatestPlayers = async () => {
  const response = await instance.get(`/get_latest/`);

  let data = response.data.data;

  return data;
};
export const fetchTopRatedPlayers = async () => {
  const response = await instance.get(`/top_rated/`);
  let data = response.data.data;

  return data;
};
export const fetchTopEvolvedPlayers = async () => {
  const response = await instance.get(`/get_top_evolved_players/`);
  let data = response.data.data;

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
  // data = data.filter(
  //   (rarity) =>
  //     !(
  //       PROMOS_TO_HIDE.includes(rarity.name.toLowerCase()) ||
  //       rarity.name.toLowerCase().includes("evo")
  //     )
  // );
  data.forEach((promo) => {
    promo.rarity_url = buildRarityUrl({
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
    timeout: 100000,
  });
  return response.data.body;
};

export const fetchAllPlayers = async (
  {
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
    name,
    order_by,
    order_direction,
    simple,
    exclude_extinct,
  },
  club
) => {
  // Construct query parameters
  const queryParams = new URLSearchParams();

  if (page) queryParams.append("page", page);
  if (name) queryParams.append("name", name);
  if (order_by) queryParams.append("order_by", order_by);
  if (order_direction) queryParams.append("order_direction", order_direction);
  if (simple) queryParams.append("simple", simple);
  if (min_rating) queryParams.append("min_rating", min_rating);
  if (max_rating) queryParams.append("max_rating", max_rating);
  if (teamid) queryParams.append("teamid", teamid.id);
  if (nation) queryParams.append("nation", nation.id);
  if (rarity) queryParams.append("rarity", rarity.id);
  if (leagueid) queryParams.append("leagueid", leagueid.id);
  if (skill_moves) queryParams.append("skill_moves", skill_moves);
  if (weak_foot) queryParams.append("weak_foot", weak_foot);
  if (club) queryParams.append("club", club);
  if (awr !== null && awr !== undefined) queryParams.append("awr", awr);
  if (dwr !== null && dwr !== undefined) queryParams.append("dwr", dwr);
  if (exclude_extinct) queryParams.append("exclude_extinct", exclude_extinct);

  // Construct the URL with query parameters
  const url = `/players/?${queryParams.toString()}`;

  // Make the GET request
  const response = await instance.get(url);
  if (simple) {
    let data = response.data.data;

    return data;
  }
  const { players, total_pages, current_page } = response.data;

  return { players: players, total_pages, current_page };
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

  return data;
};

export const verifyToken = async (payload) => {
  const response = await instance.post("/verify_token/", payload);
  let data = response.data.user_info;
  return data;
};

export const addToFavourites = async (payload) => {
  const response = await instance.post("/update_favourite_players/", payload);
  let data = response.data.favourite_players;
  return data;
};
export const fetchPlayersByIds = async (payload) => {
  try {
    const response = await instance.get(
      `/get_players/?ids=${payload.ids.join(",")}`
    );
    let data = response.data.data;
    return data;
  } catch (error) {
    console.error("Error fetching Players:", error);
    throw error;
  }
};

export const fetchBestSquad = async (payload) => {
  try {
    let response = await instance.post("/get_best_squad/", payload, {
      timeout: 200000,
    });
    console.log(response);
    let squadResponse = await fetchPlayersByIds({ ids: response.data.squad });
    return {
      squad: squadResponse,
      cost: response.data.total_cost,
      rating: response.data.rating,
      chemistry: response.data.chemistry,
      player_position_index: response.data.player_position_index,
    };
  } catch (error) {
    console.error("Error fetching Players:", error);
    throw error;
  }
};
export const fetchBestSquadClub = async (payload) => {
  try {
    let response = await instance.post("/get_best_club_squad/", payload, {
      timeout: 100000,
    });
    console.log(response);
    let squadResponse = await fetchPlayersByIds({ ids: response.data.squad });
    return {
      squad: squadResponse,
      cost: response.data.total_cost,
      rating: response.data.rating,
      chemistry: response.data.chemistry,
      player_position_index: response.data.player_position_index,
    };
  } catch (error) {
    console.error("Error fetching Players:", error);
    throw error;
  }
};

export const fetchSbcsData = async () => {
  try {
    let response = await instance.get("/fetch_sbc_data/", {
      timeout: 60000,
    });
    let data = response.data.data;
    let filteredData = data.filter((item) => !item.name.includes("Foundation"));

    return filteredData;
  } catch (error) {
    console.error("Error fetching Players:", error);
    throw error;
  }
};

export const fetchEvolutionsData = async () => {
  try {
    let response = await instance.get("/fetch_evo_data/", {
      timeout: 60000,
    });
    let data = response.data.data;

    return data;
  } catch (error) {
    console.error("Error fetching Players:", error);
    throw error;
  }
};

export const fetchSbcDetails = async (id) => {
  try {
    let response = await instance.get(`/fetch_sbc_details/?sbcId=${id}`, {
      timeout: 60000,
    });
    let data = response.data.data;

    return data;
  } catch (error) {
    console.error("Error fetching Sbc Details:", error);
    throw error;
  }
};

export const fetchChallengeDetails = async (id) => {
  try {
    let response = await instance.get(
      `/fetch_challenge_details/?challengeId=${id}`,
      {
        timeout: 60000,
      }
    );
    let data = response.data;

    return data[0];
  } catch (error) {
    console.error("Error fetching Challenge Details:", error);
    throw error;
  }
};

export const fetchChallengeSolutions = async (id) => {
  try {
    let response = await instance.get(
      `/fetch_challenge_solutions/?challengeId=${id}`,
      {
        timeout: 60000,
      }
    );
    let data = response.data;

    // Map to an array of promises
    const solutionsWithSquad = await Promise.all(
      data.map(async (solution) => {
        const { details } = solution;
        let squadResponse = await fetchPlayersByIds({ ids: details.squad });
        solution.details.squad = squadResponse;
        return solution;
      })
    );

    return solutionsWithSquad;
  } catch (error) {
    console.error("Error fetching Challenge solutions:", error);
    throw error;
  }
};

export const fetchPlayerPriceHistory = async (id) => {
  try {
    let response = await instance.get(
      `/get_player_price_history/?player_id=${id}`,
      {
        timeout: 60000,
      }
    );
    return response.data?.price_history || [];
  } catch (error) {
    console.error("Error fetching Challenge solutions:", error);
    throw error;
  }
};

export const fetchPlayerSuggestions = async (
  budget,
  chemistry,
  index,
  squad,
  formation,
  focus,
  pageParam
) => {
  try {
    let response = await instance.post(
      `/get_player_suggestions/`,
      {
        budget,
        chemistry,
        index,
        squad,
        formation,
        focus,
        page: pageParam,
      },
      {
        timeout: 60000,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching player suggestions:", error);
    throw error;
  }
};

export const fetchEvolutionDetail = async (id) => {
  try {
    const response = await instance.get(`/fetch_evo_detail/?id=${id}`, {
      timeout: 60000,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching evolution detail:", error);
    throw error;
  }
};

export const fetchEvolvedPlayers = async ({ id, page }) => {
  try {
    const response = await instance.get(
      `/get_evolved_players/?id=${id}&page=${page}`,
      {
        timeout: 60000,
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching evolved players:", error);
    throw error;
  }
};
export const fetchTrendingPlayers = async ({ page }) => {
  try {
    const response = await instance.get(`/trending_players/?page=${page}`, {
      timeout: 60000,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching Trending players:", error);
    throw error;
  }
};
export const fetchInvestmentPlayers = async ({ page }) => {
  try {
    const response = await instance.get(`/investment_players/?page=${page}`, {
      timeout: 60000,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching investment  players:", error);
    throw error;
  }
};
export const fetchEvoChains = async ({ page }) => {
  try {
    const response = await instance.get(`/get_evo_chains/?page=${page}`, {
      timeout: 60000,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching evolution chains:", error);
    throw error;
  }
};

export const fetchMarketTrends = async () => {
  try {
    const response = await instance.get(`/market_trends/`, {
      timeout: 60000,
    });
    const data = response.data; // Assume data is an array of trend objects

    // For each trend, fetch player details for top_players IDs
    const updatedData = await Promise.all(
      data.map(async (trend) => {
        if (trend.top_players && trend.top_players.length > 0) {
          const playerDetails = await fetchPlayersByIds({
            ids: trend.top_players,
          });
          return {
            ...trend,
            top_players: playerDetails,
          };
        } else {
          return trend;
        }
      })
    );

    return updatedData;
  } catch (error) {
    console.error("Error fetching Market Data:", error);
    throw error;
  }
};
export const generateSquad = async ({
  budget,
  formation,
  lockedPlayers,
  target_rating,
  target_chemistry,
  other_constraints,
}) => {
  try {
    const response = await instance.post(
      "https://d9bl9suyr1.execute-api.us-east-1.amazonaws.com/default/squad_generator",
      {
        budget,
        formation,
        lockedPlayers,
        target_rating,
        target_chemistry,
        other_constraints,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 180000,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error generating squad:", error);
    throw error;
  }
};

export const fetchStatClashCards = async () => {
  try {
    const response = await instance.get("/stat_clash_cards/", {
      timeout: 60000,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Stat Clash cards:", error);
    throw error;
  }
};

export const createPremiumOrder = async ({ amount }) =>
  (await instance.post("/api/orders", { amount })).data; // => { id: "ORDER_ID" }

export const captureOrder = async (orderID) =>
  (await instance.post(`/api/orders/${orderID}/capture`)).data; // => full PayPal capture payload

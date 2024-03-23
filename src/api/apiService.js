import { updateRarity } from "../components/utils/utils";
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
    let data = updateRarity(response.data.data);
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
  let data = updateRarity(response.data.data);
  return data;
};

export const fetchLatestPlayers = async () => {
  const response = await instance.get(`/get_latest/`);
  return response.data.data;
};
export const fetchTopRatedPlayers = async () => {
  const response = await instance.get(`/top_rated/`);
  return response.data.data;
};
export const fetchAllRarities = async () => {
  const response = await instance.get(`/get_promos/`);
  return response.data.data;
};
export const fetchPlayerByPromo = async (id) => {
  const response = await instance.get(`/get_players_by_promo/?id=${id}`);
  return response.data.data;
};
export const fetchPlayerDetails = async (id) => {
  ReactGA.event({
    category: "Fetching Player details",
    action: id,
    label: id,
  });
  const response = await instance.get(`/get_player/?id=${id}`);
  return response.data.data;
};

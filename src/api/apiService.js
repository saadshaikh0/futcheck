import { updateRarity } from "../components/utils/utils";
import instance from "./axiosclient";
export const fetchPlayers = async (value, searchMode) => {
  if (!value || value.length == 0) return [];
  try {
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

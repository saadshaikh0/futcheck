import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/allPlayerSlice";
import { useQuery } from "@tanstack/react-query";
import { fetchAllRarities } from "../../api/apiService";
import ComboBox from "./FilterCombobox";

export default function VersionPopup() {
  const { allPlayers } = useSelector((state) => state);
  const { filters } = allPlayers;
  const dispatch = useDispatch();

  const { data: rarities = [] } = useQuery({
    queryKey: ["fetchAllRarities"],
    queryFn: fetchAllRarities,
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  return (
    <ComboBox
      options={rarities}
      selectedValue={filters?.rarity ?? null}
      onChange={(val) =>
        dispatch(setFilters({ ...filters, rarity: val, page: 1 }))
      }
      placeholder="Select Rarity"
    />
  );
}

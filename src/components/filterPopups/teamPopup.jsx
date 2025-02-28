import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/allPlayerSlice";
import ComboBox from "./FilterCombobox";

export default function TeamPopup() {
  const { app, allPlayers } = useSelector((state) => state);
  const { teams } = app;
  const { filters } = allPlayers;
  const dispatch = useDispatch();

  return (
    <ComboBox
      options={teams}
      selectedValue={filters?.teamid ?? null}
      onChange={(val) =>
        dispatch(setFilters({ ...filters, teamid: val, page: 1 }))
      }
      placeholder="Select Team"
    />
  );
}

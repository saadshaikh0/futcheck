import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/allPlayerSlice";
import ComboBox from "./FilterCombobox";

export default function NationPopup() {
  const { app, allPlayers } = useSelector((state) => state);
  const { leagues } = app;
  const { filters } = allPlayers;
  const dispatch = useDispatch();

  return (
    <ComboBox
      options={leagues}
      selectedValue={filters?.nation ?? null}
      onChange={(val) =>
        dispatch(setFilters({ ...filters, nation: val, page: 1 }))
      }
      placeholder="Select Nation"
    />
  );
}

import { useEffect } from "react";
import AllPlayers from "./allPlayers";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllLeagues,
  fetchAllNations,
  fetchAllRarities,
  fetchAllTeams,
} from "../api/apiService";
import {
  setLeagues,
  setNations,
  setRarities,
  setTeams,
} from "../redux/appSlice";

const AllPlayersWrapper = () => {
  const app = useSelector((state) => state.app);
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      if (app.rarities?.length == 0) {
        const response = await fetchAllRarities();
        dispatch(setRarities(response));
      }
      if (app.nations?.length == 0) {
        const response = await fetchAllNations();
        dispatch(setNations(response));
      }
      if (app.leagues?.length == 0) {
        const response = await fetchAllLeagues();
        dispatch(setLeagues(response));
      }
      if (app.teams?.length == 0) {
        const response = await fetchAllTeams();
        dispatch(setTeams(response));
      }
    };
    getData();
  }, []);
  return <AllPlayers />;
};
export default AllPlayersWrapper;

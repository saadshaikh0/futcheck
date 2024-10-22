import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchEvolutionDetail } from "../api/apiService";
import EvolutionDetail from "./evos/EvolutionDetail";
import { setEvolution } from "../redux/evolutionSlice";

const EvolutionDetailWrapper = () => {
  const { evolutionId } = useParams();
  const evolution = useSelector((state) => state.evolution.details);
  const { id } = evolution;
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      if (!id || id !== evolutionId) {
        const data = await fetchEvolutionDetail(evolutionId);
        dispatch(setEvolution({ ...data }));
      }
    }
    fetchData();
  }, [id, evolutionId, dispatch]);

  return (
    <div className="">
      <EvolutionDetail />
    </div>
  );
};

export default EvolutionDetailWrapper;

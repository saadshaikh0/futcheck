import React, { useEffect } from "react";
import { setSbc } from "../redux/sbcSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSbcDetails } from "../api/apiService";
import SbcView from "./sbc/SbcView";

const SbcWrapper = () => {
  const { sbcId } = useParams();
  const sbc = useSelector((state) => state.sbc.details);
  const { setid } = sbc;
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      if (!setid || setid != sbcId) {
        const data = await fetchSbcDetails(sbcId);

        dispatch(setSbc({ ...data }));
      }
    }
    fetchData();
  }, [setid]);
  return <SbcView />;
};

export default SbcWrapper;

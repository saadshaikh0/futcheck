import React from "react";
import SbcCard from "./SbcCard";
import { useQuery } from "@tanstack/react-query";
import { fetchSbcsData } from "../../api/apiService";
const currentTimestamp = new Date();
const SBC = () => {
  const { data: sbcs = [] } = useQuery({
    queryKey: ["fetchSbcs"],
    queryFn: fetchSbcsData,
  });
  return (
    <div className="w-4/5 h-full mx-auto mt-10">
      <div className="flex-col">
        <h2 className="text-white text-2xl font-bold">
          FC 24 Squad Building Challenges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {sbcs
            .filter((sbc) => {
              return (
                (sbc.endTimeStamp &&
                  new Date(sbc.endTimeStamp) >= currentTimestamp) ||
                sbc.endTime == 0
              );
            })
            .map((sbc) => {
              return <SbcCard data={sbc} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default SBC;

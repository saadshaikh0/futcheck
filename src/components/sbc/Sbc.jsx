import React from "react";
import SbcCard from "./SbcCard";
import { useQuery } from "@tanstack/react-query";
import { fetchSbcsData } from "../../api/apiService";
import NewSbcCard from "./NewSbcCard";
import SBC_BACKGROUND from "../../assets/sbc_background_field.webp";
const currentTimestamp = new Date();
const SBC = () => {
  const { data: sbcs = [] } = useQuery({
    queryKey: ["fetchSbcs"],
    queryFn: fetchSbcsData,
  });
  return (
    <div
      className="min-h-[calc(100vh-4rem)]"
      style={{
        background: `url(${SBC_BACKGROUND}) no-repeat `,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className={`fixed inset-0 bg-black  opacity-70`}></div>

      <div className="w-4/5 h-full mx-auto pt-10 relative pb-10">
        <div className="flex-col">
          <h2 className="text-white text-2xl font-bold">
            FC 25 Squad Building Challenges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            {/* <NewSbcCard data={sbcs[6]} /> */}
            {sbcs
              // .filter((sbc) => {
              //   return (
              //     (sbc.endTimeStamp &&
              //       new Date(sbc.endTimeStamp) >= currentTimestamp) ||
              //     sbc.endTime == 0
              //   );
              // })
              .map((sbc) => {
                return <NewSbcCard data={sbc} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SBC;

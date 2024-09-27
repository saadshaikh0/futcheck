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
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const twoDaysInMilliseconds = 2 * oneDayInMilliseconds;
  const [searchTerm, setSearchTerm] = React.useState("");
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
          <div className="flex gap-4 items-center">
            <img
              alt="sbc"
              className="w-7"
              src="https://cdn.futcheck.com/assets/img/fc25/misc/sbc.webp"
            />
            <h2 className="text-white text-2xl font-bold">
              FC 25 Squad Building Challenges
            </h2>
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search SBCs..."
              className="w-full p-2 ps-4 rounded border border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 bg-black text-white"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {sbcs
              .sort((a, b) => b.releaseTime - a.releaseTime) // Sort by releaseTime
              .filter((sbc) => {
                const matchesSearchTerm = sbc.name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase());
                const isNotExpired =
                  (sbc.endTimeStamp &&
                    new Date(sbc.endTimeStamp) >= currentTimestamp) ||
                  sbc.endTime === 0;
                return matchesSearchTerm && isNotExpired;
              })
              .map((sbc) => {
                const isNew =
                  currentTimestamp - sbc.releaseTime * 1000 <
                  oneDayInMilliseconds;
                const isExpiringSoon =
                  sbc.endTimeStamp &&
                  new Date(sbc.endTimeStamp) - currentTimestamp <
                    twoDaysInMilliseconds;
                return (
                  <div key={sbc.id} className="relative">
                    <div className="flex gap-2 absolute -top-3 right-0">
                      {isNew && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                          New
                        </span>
                      )}
                      {isExpiringSoon && (
                        <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                          Expiring Soon
                        </span>
                      )}
                    </div>
                    <NewSbcCard data={sbc} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SBC;

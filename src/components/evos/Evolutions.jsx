import React, { useState } from "react";
import EvolutionCard from "./EvolutionCard"; // Assuming you have an EvolutionCard component
import { useQuery } from "@tanstack/react-query";
import { fetchEvolutionsData } from "../../api/apiService"; // Assuming you have this API service
import EVOLUTIONS_BACKGROUND from "../../assets/sbc_background_field.webp";
import Players from "./EvoPlayers"; // Assuming you have a Players component
import classNames from "classnames";

const currentTimestamp = Date.now() + new Date().getTimezoneOffset() * 60000;

const Evolutions = () => {
  const { data: evolutions = [] } = useQuery({
    queryKey: ["fetchEvolutions"],
    queryFn: fetchEvolutionsData,
  });
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const twoDaysInMilliseconds = 2 * oneDayInMilliseconds;
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeTab, setActiveTab] = useState("evolutions");

  return (
    <div
      className="min-h-[calc(100vh-4rem)]"
      style={{
        background: `url(${EVOLUTIONS_BACKGROUND}) no-repeat `,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className={`fixed inset-0 bg-black opacity-70`}></div>

      <div className="w-4/5 h-full mx-auto pt-10 relative pb-10">
        <div className="flex-col">
          <div className="flex gap-4 items-center">
            <h2
              onClick={() => setActiveTab("evolutions")}
              className={classNames(
                "text-2xl font-bold cursor-pointer",
                activeTab == "evolutions" ? "text-purple-400" : "text-white"
              )}
            >
              Evolutions
            </h2>
            <h2
              onClick={() => setActiveTab("players")}
              className={classNames(
                "text-2xl font-bold cursor-pointer",
                activeTab == "players" ? "text-purple-400" : "text-white"
              )}
            >
              Players{" "}
            </h2>
          </div>
          {activeTab === "evolutions" && (
            <>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Search Evolutions..."
                  className="w-full p-2 ps-4 rounded border border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 bg-black text-white"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-8">
                {evolutions
                  .sort(
                    (a, b) => new Date(b.releaseTime) - new Date(a.releaseTime)
                  )
                  .filter((evolution) => {
                    const matchesSearchTerm = evolution.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase());
                    const isNotExpired =
                      (evolution.endTimePurchaseVisibility &&
                        new Date(
                          evolution.endTimePurchaseVisibility
                        ).getTime() >= currentTimestamp) ||
                      evolution.endTime === 0;
                    return matchesSearchTerm && isNotExpired;
                  })
                  .map((evolution) => {
                    const isNew =
                      currentTimestamp - evolution.releaseTime * 1000 <
                      oneDayInMilliseconds;
                    const isExpiringSoon =
                      evolution.endTimeStamp &&
                      new Date(evolution.endTimeStamp).getTime() -
                        currentTimestamp <
                        twoDaysInMilliseconds;
                    return (
                      <div key={evolution.id} className="relative">
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
                        <EvolutionCard data={evolution} />
                      </div>
                    );
                  })}
              </div>
            </>
          )}
          {activeTab === "players" && <Players evolutions={evolutions} />}
        </div>
      </div>
    </div>
  );
};

export default Evolutions;

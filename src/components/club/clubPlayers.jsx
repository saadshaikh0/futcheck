import React, {  useState } from "react";
import { getClubPlayers } from "../../api/apiService";
import { useQuery } from "@tanstack/react-query";
import PlayerCard from "../common/PlayerCard";

const ClubPlayers = () => {
  const [page, setPage] = useState(1);
  const { data = { players: [], total_pages: 0 }, isLoading } = useQuery({
    queryKey: ["getClubPlayers", page],
    queryFn: () => getClubPlayers(page),
  });

  return (
    <div className="w-4/5 mx-auto h-full">
      <div className="md:mx-10 mt-3 grid grid-cols-3 lg:grid-cols-6 gap-1 md:gap-4">
        {isLoading
          ? [...Array(24).keys()].map(() => {
              return (
                <div class="animate-pulse flex justify-center items-center space-x-4">
                  <div class="rounded bg-slate-200 h-20 w-20 md:h-40 md:w-40"></div>
                </div>
              );
            })
          : data.players.map((player) => <PlayerCard player={player} />)}
      </div>
      <div className="flex justify-center gap-4 mt-5">
        <button
          onClick={() => {
            let currentPage = page ?? 1;

            setPage(Math.max(currentPage - 1, 1));
          }}
          className="bg-fuchsia-400 text-white px-4 py-2 rounded-md disabled:bg-gray-500"
          disabled={data.current_page == 1}
        >
          Previous
        </button>
        <div className="bg-fuchsia-400 text-white flex gap-1 justify-center items-center p-2 rounded-md">
          <span className="mr-1">Page</span>
          {isLoading ? (
            <div className="animate-pulse bg-fuchsia-200 h-4 w-4 "></div>
          ) : (
            <span>{data.current_page}</span>
          )}{" "}
          /
          {isLoading ? (
            <div className="animate-pulse bg-fuchsia-200 h-4 w-4 "></div>
          ) : (
            <span>{data.total_pages}</span>
          )}
        </div>
        <button
          onClick={() => {
            let currentPage = page ?? 1;
            setPage(currentPage + 1);
          }}
          className="bg-fuchsia-400 text-white px-4 py-2 rounded-md disabled:bg-gray-500 "
          disabled={data.current_page == data.total_pages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default ClubPlayers;

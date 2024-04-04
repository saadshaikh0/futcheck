import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setFilters } from "../../redux/allPlayerSlice";

const AllPromos = ({ rarities }) => {
  const dispatch = useDispatch();
  return (
    <div className="grid grid-cols-3 md:grid-cols-6">
      {rarities.map((rarity) => {
        const { name, rarity_url } = rarity;
        return (
          <Link
            to="/players"
            onClick={() => {
              dispatch(setFilters({ page: 1, rarity }));
            }}
          >
            {" "}
            <div className="flex flex-col justify-center items-center cursor-pointer">
              <img src={rarity_url} width={120} height={80} />
              <p className="text-white capitalize text-center whitespace-nowrap overflow-hidden overflow-ellipsis w-full ">
                {name}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default AllPromos;

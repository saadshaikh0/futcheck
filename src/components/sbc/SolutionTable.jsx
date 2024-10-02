import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import CoinsImg from "../../assets/coins.png";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { buildDynamicUrl, timeAgo } from "../utils/utils";

const columnHelper = createColumnHelper();

const mini_columns = [
  columnHelper.accessor("number", {
    enableSorting: false,
    header: "Solution",
    id: "number",
    cell: (info) => <>{info.getValue().split(" ")[1]}</>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.league, {
    id: "league",
    cell: (info) => (
      <div className="flex gap-2 py-4 ml-2 items-center justify-start">
        <img
          className="w-7 "
          src={buildDynamicUrl("league", info.row.original.leagueid)}
        />{" "}
      </div>
    ),
    header: () => <span>League</span>,
  }),
  columnHelper.accessor("nation", {
    id: "nation",
    header: () => "Nation",
    cell: (info) => (
      <div className="flex gap-2 py-4 items-center justify-start ml-2">
        <img
          className="w-7 "
          src={buildDynamicUrl("nation", info.row.original.nationid)}
        />{" "}
      </div>
    ),
  }),

  columnHelper.accessor("cost", {
    id: "cost",
    header: "Total Cost",
    enableSorting: true,
    cell: (info) => (
      <>
        <span className="flex items-center gap-2 text-md ">
          <img className="w-5" src={CoinsImg} />
          {info.getValue() || "-"}
        </span>
      </>
    ),
  }),
];

const columns = [
  columnHelper.accessor("number", {
    enableSorting: false,
    header: "Solution",
    id: "number",
    cell: (info) => <>{info.getValue()}</>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.league, {
    id: "league",
    cell: (info) => (
      <div className="flex gap-2 py-4 ml-10 items-center justify-start">
        <img
          className="w-7 "
          src={buildDynamicUrl("league", info.row.original.leagueid)}
        />{" "}
        {info.getValue()}
      </div>
    ),
    header: () => <span>League</span>,
  }),
  columnHelper.accessor("nation", {
    id: "nation",
    header: () => "Nation",
    cell: (info) => (
      <div className="flex gap-2 py-4 items-center justify-start ml-10">
        <img
          className="w-7 "
          src={buildDynamicUrl("nation", info.row.original.nationid)}
        />{" "}
        {info.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor("created", {
    header: () => <span>Last Updated</span>,
    cell: (info) => <>{timeAgo(info.getValue())}</>,
  }),
  columnHelper.accessor("cost", {
    id: "cost",
    header: "Total Cost",
    enableSorting: true,
    cell: (info) => (
      <>
        <span className="flex items-center gap-2 text-md ">
          <img className="w-5" src={CoinsImg} />
          {info.getValue() || "-"}
        </span>
      </>
    ),
  }),
];

function SolutionTable({
  challengeSolutions,
  UpdateSquad,
  selectedSolutionId,
  isSuperMini,
}) {
  const [data, setData] = React.useState([]);
  const { nationIdMap, leagueIdMap } = useSelector((state) => state.app);
  const table = useReactTable({
    data,
    columns: isSuperMini ? mini_columns : columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    let formattedData = challengeSolutions.map((solution, index) => {
      const { details } = solution;
      const { squad_info } = details;
      const { cost_distribution, top_clubs, top_leagues, top_nations } =
        squad_info;
      let solutionData = {
        number: `Solution ${index + 1}`,
        index,
        league: leagueIdMap[top_leagues[0][0]]?.name,
        nation: nationIdMap[top_nations[0][0]]?.name,
        leagueid: top_leagues[0][0],
        nationid: top_nations[0][0],
        created: solution.created,
        cost: details.cost,
        id: solution.id,
      };
      return solutionData;
    });
    console.log(formattedData);
    setData(formattedData);
  }, [challengeSolutions]);

  return (
    <div className="p-2 text-white w-full text-left max-h-full overflow-y-auto scrollbar-none">
      <table className="w-full bg-black bg-opacity-70 p-4 ">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="pb-5 text-center" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        onClick: header.column.getToggleSortingHandler(),
                        style: {
                          cursor: header.column.getCanSort()
                            ? "pointer"
                            : "default",
                        },
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              className={classNames(
                selectedSolutionId == row.original.id
                  ? "bg-gray-800"
                  : "hover:bg-gray-800 cursor-pointer"
              )}
              key={row.id}
              onClick={() => {
                UpdateSquad(challengeSolutions[row.index]);
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <td className="px-2 text-center" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default SolutionTable;

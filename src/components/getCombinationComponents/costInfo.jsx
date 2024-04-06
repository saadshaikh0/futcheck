import React, { useState } from "react";
import {
  ChartPieIcon,
  QuestionMarkCircleIcon,
  TableCellsIcon,
} from "@heroicons/react/20/solid";
import { Popover } from "@headlessui/react";
import CoinsImg from "../../assets/coins.png";
import { usePopper } from "react-popper";
import {
  Cell,
  Label,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#cecfe5",
  "#b6b6d8",
  "#9e9ac8",
  "#8683bd",
  "#7262ac",
  "#61409b",
  "#4f1f8b",
  "#3f007d",
  "#3f007d",
  "#3f007d",
];

const RADIAN = Math.PI / 180;

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  fill,
  value,
  percent,
  name,
}) => {
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  // Adjust these multipliers to control the length of the line
  const lineLength = 10; // Length of the line from the outer edge of the pie
  const textOffset = 15; // How far the text will be placed from the end of the line

  // Endpoint of the line
  const ex = cx + (outerRadius + lineLength) * cos;
  const ey = cy + (outerRadius + lineLength) * sin;

  // Position of the text
  const tx = cx + (outerRadius + lineLength + textOffset) * cos;
  const ty = cy + (outerRadius + lineLength + textOffset) * sin;

  return (
    <g>
      <line
        x1={cx + (outerRadius + 1) * cos}
        y1={cy + (outerRadius + 1) * sin}
        x2={ex}
        y2={ey}
        stroke={"white"}
      />
      <text
        x={tx}
        y={ty}
        dy={0}
        textAnchor="middle"
        fill={"white"}
        fontSize="12"
      >
        {`${value}(${name})`}
      </text>
    </g>
  );
};

const TableWrapper = ({ result, ratings_price, price }) => {
  return (
    <div className="flex flex-col w-full">
      <table class="table-auto w-full">
        <thead className="font-thin text-sm gap-1">
          <tr>
            <th className="font-medium">Rating</th>
            <th className="font-medium">Price</th>
            <th className="font-medium">Count</th>
            <th className="font-medium">Total</th>
          </tr>
        </thead>
        <tbody>
          {result.map(([rating, count]) => {
            return (
              <tr>
                <td>{rating}</td>
                <td>{ratings_price[rating]}</td>
                <td>{count}</td>
                <td>{ratings_price[rating] * count}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <hr className="w-full" />
      <div className="flex items-center justify-end px-2 py-1 gap-2">
        <span className="font-medium">Total Cost : </span>
        <span className="flex gap-1 items-center">
          <img src={CoinsImg} className="w-4 h-4" /> {price}
        </span>
      </div>
    </div>
  );
};
const PieWrapper = ({ data }) => {
  return (
    <div className="w-full h-[25vh]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={100} height={100}>
          <Pie
            data={data}
            cx="50%"
            cy="55%"
            labelLine={true}
            label={renderCustomLabel}
            outerRadius={50}
            fill="#8884d8"
            dataKey="value"
            isAnimationActive={false}
            // margin={{ top: 0, right: 30, left: 20, bottom: 5 }}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          {/* <Legend
                margin={10}
                wrapperStyle={{ fontSize: "10px", marginBottom: "10px" }}
                align="center"
                verticalAlign="top"
                height={20}
              /> */}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
const CostPopup = ({ result, ratings_price, price }) => {
  const [mode, setMode] = useState("table");
  const data = result.map(([rating, count]) => {
    let price = ratings_price[rating] * count;
    return { name: `${rating}x${count}`, value: price };
  });
  return (
    <div className=" w-60 bg-slate-700 relative shadow-lg rounded-lg z-100">
      <div className="flex flex-col gap-1">
        <div className="relative">
          <p className="pt-1 text-white font-medium">Cost Breakdown</p>
          <div className="absolute right-2 top-2 flex gap-1">
            <button
              className={
                mode == "table" ? "bg-fuchsia-400 px-1 rounded-md" : ""
              }
              onClick={() => setMode("table")}
            >
              <TableCellsIcon className="w-4 h-4 text-white" />
            </button>
            <button
              className={mode == "pie" ? "bg-fuchsia-400 px-1 rounded-md" : ""}
              onClick={() => setMode("pie")}
            >
              <ChartPieIcon className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
        <hr />
        <div className="flex justify-center">
          {mode == "table" ? (
            <TableWrapper
              result={result}
              ratings_price={ratings_price}
              price={price}
            />
          ) : (
            <PieWrapper data={data} />
          )}
        </div>
      </div>
    </div>
  );
};

const CostInfo = ({ result, ratings_price, price }) => {
  let [referenceElement, setReferenceElement] = useState();
  let [popperElement, setPopperElement] = useState();
  let [arrowElement, setArrowElement] = useState(); // Add state for the arrow element

  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom",
    modifiers: [
      { name: "arrow", options: { element: arrowElement } },
      {
        name: "offset",
        options: {
          offset: [0, 5],
        },
      },
    ],
  });
  return (
    <Popover className={"relative flex z-1 "}>
      <Popover.Button ref={setReferenceElement}>
        {" "}
        <QuestionMarkCircleIcon className="w-5 h-5 text-white cursor-pointer" />
      </Popover.Button>
      <Popover.Panel
        className={"z-20"}
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        <div
          ref={setArrowElement}
          style={styles.arrow}
          className="bg-white w-4 h-4"
        />

        {
          <CostPopup
            ratings_price={ratings_price}
            result={result}
            price={price}
          />
        }
      </Popover.Panel>
    </Popover>
  );
};
export default CostInfo;

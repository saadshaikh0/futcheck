import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatValue } from "../utils/utils";

const CustomYTick = (props) => {
  const { x, y, payload } = props;
  const formattedValue = formatValue(payload.value);
  const textWidth = formattedValue.length * 6;
  const imageXPosition = -textWidth - 5;
  return (
    <g transform={`translate(${x},${y})`}>
      {/* <image x={imageXPosition} y={2} href={CoinsImg} width={15} height={13} /> */}
      <text
        x={25}
        y={10}
        dy={4}
        textAnchor="end"
        className="select-none !text-white fill-white"
        // style={{ fontSize: "12px" }}
      >
        {formattedValue}
      </text>
    </g>
  );
};
const AvgPriceGraph = ({ data = [] }) => {
  const averagePrices = data.map((price, hour) => ({
    hour: `${hour}:00`,
    avgPrice: price,
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={averagePrices}>
        <XAxis dataKey="hour" />
        <YAxis
          tick={CustomYTick}
          tickMargin={30}
          padding={{ bottom: 10 }}
          domain={[(dataMin) => Math.max(0, dataMin * 0.9), "dataMax"]}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="avgPrice"
          stroke="#ff7300"
          strokeWidth={3}
          dot={{ r: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AvgPriceGraph;

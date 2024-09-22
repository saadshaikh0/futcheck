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
import { useSelector } from "react-redux";
import { formatValue } from "../utils/utils";
import CoinsImg from "../../assets/coins.png";
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
const CustomTooltip = ({ active, payload, extinctLevel, selectedTimezone }) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;

    return (
      <div className="custom-tooltip bg-black bg-opacity-50 py-1 px-2 rounded">
        <p className="label">{`${dataPoint.hour} (${selectedTimezone})`}</p>
        <hr />
        <p className="intro flex items-center justify-start gap-2">
          <img src={CoinsImg} className="w-4 h-4" />
          {!dataPoint.avgPrice || dataPoint.avgPrice === extinctLevel
            ? "Extinct"
            : `${payload?.[0]?.payload?.avgPrice?.toLocaleString("en-us")}`}
        </p>
      </div>
    );
  }

  return null;
};
const AvgPriceGraph = ({ data = [] }) => {
  const selectedTimezone = useSelector((state) => state.app.selectedTimezone);
  const convertToTimezone = (hour, timezone) => {
    // Create a Date object for the given hour in IST (Asia/Kolkata)
    const [hourStr] = hour.split(":");
    const date = new Date();
    date.setHours(Number(hourStr));
    date.setMinutes(0);
    date.setSeconds(0);

    // Convert to the selected timezone
    return date.toLocaleString("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  const averagePrices = data.map((price, hour) => ({
    hour: convertToTimezone(`${hour}:00`, selectedTimezone), // Convert IST hours to selected timezone
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
        <Tooltip
          content={<CustomTooltip selectedTimezone={selectedTimezone} />}
        />
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

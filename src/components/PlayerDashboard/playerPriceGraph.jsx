import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceArea,
  Area,
  Layer,
  ReferenceLine,
} from "recharts";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTimezone } from "../../redux/appSlice";
import CoinsImg from "../../assets/coins.png";
import { formatPrice } from "../utils/utils";
import classNames from "classnames";
import { filterDataByZoomLevel } from "./dashboardUtils";
import { LockClosedIcon } from "@heroicons/react/20/solid";

const CustomYTick = ({ x, y, payload, extinctLevel }) => {
  const formattedValue =
    payload.value === extinctLevel ? "Extinct" : formatPrice(payload.value);
  const textWidth = formattedValue.length * 6;
  const imageXPosition = -textWidth - 5;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={25}
        y={10}
        dy={4}
        textAnchor="end"
        className="select-none !text-white fill-white"
      >
        {formattedValue}
      </text>
    </g>
  );
};

const CustomTick = ({ x, y, payload, selectedTimezone }) => {
  const date = new Date(payload.value);

  const formattedDate = date.toLocaleString("en-GB", {
    timeZone: selectedTimezone,
    day: "2-digit",
    month: "short",
  });

  return (
    <text
      x={x}
      y={y}
      dy={16}
      textAnchor="middle"
      className="select-none !text-white fill-white"
    >
      {formattedDate}
    </text>
  );
};

const timezones = [
  { label: "UTC", value: "UTC" },
  { label: "GMT", value: "Europe/London" },
  { label: "IST", value: "Asia/Kolkata" },
  { label: "PST", value: "America/Los_Angeles" },
  { label: "EST", value: "America/New_York" },
  { label: "CET", value: "Europe/Berlin" },
  { label: "AEST", value: "Australia/Sydney" },
  { label: "CST", value: "America/Chicago" },
  { label: "BRT", value: "America/Sao_Paulo" },
  { label: "ART", value: "America/Argentina/Buenos_Aires" },
  { label: "MSK", value: "Europe/Moscow" },
  { label: "NZST", value: "Pacific/Auckland" },
  // Add more timezones as needed
];
// Custom tooltip component updated with timezone
const CustomTooltip = ({ active, payload, extinctLevel, selectedTimezone }) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    const date = new Date(dataPoint.name);

    const formattedDate = date.toLocaleString("en-GB", {
      timeZone: selectedTimezone,
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const formattedHour = date.toLocaleString("en-GB", {
      timeZone: selectedTimezone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return (
      <div className="custom-tooltip bg-black bg-opacity-50 py-1 px-2 rounded">
        <p className="label">{`${formattedDate} ${formattedHour}`}</p>
        <hr />
        <p className="intro flex items-center justify-start gap-2">
          <img src={CoinsImg} className="w-4 h-4" />
          {!dataPoint.value || dataPoint.value === extinctLevel
            ? "Extinct"
            : `${payload[0].value.toLocaleString("en-us")}`}
        </p>
      </div>
    );
  }

  return null;
};
const PlayerPriceGraph = ({ data, isLoading, isSbc }) => {
  const [zoomLevel, setZoomLevel] = useState("Today");
  const dispatch = useDispatch();
  const selectedTimezone = useSelector((state) => state.app.selectedTimezone);

  const maxPrice = Math.max(...data.map((item) => Number(item.price))); // Find the maximum price
  const extinctLevel = maxPrice + 10; // Set extinct level slightly above max price for visibility

  const formattedData = filterDataByZoomLevel(data, zoomLevel).map((item) => ({
    name: item.time,
    value: Number(item.price) === 0 ? null : Number(item.price), // Null for extinct hours
    extinct: Number(item.price) === 0 ? extinctLevel : null, // Extinct hours at max level
  }));

  const [containerHeight, setContainerHeight] = useState(250);

  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth >= 1024) {
        setContainerHeight(350);
      } else {
        setContainerHeight(250);
      }
    };

    // Set initial height
    updateHeight();

    // Add event listener to update height on resize
    window.addEventListener("resize", updateHeight);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  if (isSbc) {
    return <div>Player is SBC</div>;
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
      </div>
    );
  }
  if (!data || data.length === 0)
    return (
      <div className="hidden md:flex h-full justify-center items-center flex-col">
        <div className="flex items-center gap-2 text-2xl">
          <LockClosedIcon className="w-6 h-6 text-white" /> Price Data not
          available right now
        </div>
      </div>
    );
  return (
    <div className="h-full flex flex-col">
      <div className="grid grid-cols-3  font-bold">
        <span
          className={classNames(
            "cursor-pointer py-2 ",
            zoomLevel == "Today" ? "bg-purple-800" : ""
          )}
          onClick={() => setZoomLevel("Today")}
        >
          Today
        </span>{" "}
        <span
          className={classNames(
            "cursor-pointer py-2 border-l-2 border-r-2",
            zoomLevel == "Daily" ? "bg-purple-800" : ""
          )}
          onClick={() => setZoomLevel("Daily")}
        >
          Daily
        </span>{" "}
        <span
          className={classNames(
            "cursor-pointer py-2 ",
            zoomLevel == "7 days (Hourly)" ? "bg-purple-800" : ""
          )}
          onClick={() => setZoomLevel("7 days (Hourly)")}
        >
          7 days (Hourly)
        </span>
      </div>
      <hr className="mb-3" />
      <div className="ml-auto mr-2 bottom-0 z-10 max-h-40 ">
        <select
          id="timezone-select"
          value={selectedTimezone}
          style={{ maxHeight: "10rem" }}
          onChange={(e) => dispatch(setSelectedTimezone(e.target.value))}
          className="border rounded px-2 overflow-auto py-1 bg-black"
        >
          {timezones.map((tz) => (
            <option key={tz.value} value={tz.value}>
              {tz.label}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height={containerHeight} className={""}>
        <LineChart
          data={formattedData}
          animationDuration={0}
          className="ml-2 md:ml-5"
          margin={{ top: 20, right: 30, bottom: 5 }}
        >
          <XAxis
            dataKey="name"
            tick={<CustomTick selectedTimezone={selectedTimezone} />} // Pass selectedTimezone to CustomTick
          />
          <YAxis
            type="number"
            domain={["dataMin", "dataMax"]} // Ensure Y-axis can handle extinct level
            padding={{ bottom: 50 }}
            tick={<CustomYTick extinctLevel={extinctLevel} />}
            tickMargin={30}
          />
          <Tooltip
            content={
              <CustomTooltip
                extinctLevel={extinctLevel}
                selectedTimezone={selectedTimezone}
              />
            } // Pass selectedTimezone to CustomTooltip
          />
          <Legend />

          {/* Line for regular prices */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            strokeWidth={3}
            dot={{ r: 0 }}
            activeDot={{ r: 8 }}
          />

          {/* Line for extinct level */}
          <Line
            type="monotone"
            dataKey="extinct"
            stroke="red"
            strokeWidth={2}
            dot={false}
            strokeDasharray="5 5" // Dashed line for extinct hours
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlayerPriceGraph;

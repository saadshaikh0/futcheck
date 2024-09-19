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
import { fetchPlayerPriceHistory } from "../../api/apiService";
import { useQuery } from "@tanstack/react-query";
import CoinsImg from "../../assets/coins.png";
import { formatValue } from "../utils/utils";
import classNames from "classnames";
import { filterDataByZoomLevel } from "./dashboardUtils";
import { LockClosedIcon } from "@heroicons/react/20/solid";

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
const CustomTick = (props) => {
  const { x, y, payload } = props;

  const date = new Date(payload.value);

  const formattedDate = date.toLocaleString("en-GB", {
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
      {formattedDate ?? payload?.value}
    </text>
  );
};
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    debugger;

    const date = new Date(payload[0].payload.name); // Use 'time' if that's the field containing the date
    const formattedDate = date.toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const formattedHour = date.toLocaleString("en-GB", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return (
      <div className="custom-tooltip bg-black bg-opacity-50 py-1 px-2 rounded">
        <p className="label">{`${formattedDate} ${formattedHour}`}</p>
        <hr />
        <p className="intro flex items-center justify-start gap-2">
          <img src={CoinsImg} className="w-4 h-4" />{" "}
          {`${payload[0].value.toLocaleString("en-us")}`}
        </p>
      </div>
    );
  }

  return null;
};

const PlayerPriceGraph = ({ data }) => {
  // let limit_data = data?.slice(0, 200) ?? [];
  const [startIndex, setStartIndex] = useState(null);
  const [endIndex, setEndIndex] = useState(null);
  const [difference, setDifference] = useState(null);
  const [zoomLevel, setZoomLevel] = useState("Today");
  const formattedData = filterDataByZoomLevel(data, zoomLevel).map((item) => ({
    name: item.time, // e.g., "Mon 16 Jul"
    value: Number(item.price), // Convert price to a number
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

  const handleMouseDown = (e) => {
    const { activeTooltipIndex } = e;
    setStartIndex(activeTooltipIndex);
    setEndIndex(null);
    setDifference(null);
  };

  const handleMouseMove = (e) => {
    const { activeTooltipIndex } = e;
    if (startIndex !== null) {
      setEndIndex(activeTooltipIndex);
      if (activeTooltipIndex !== null) {
        const diff = data[activeTooltipIndex]?.value - data[startIndex]?.value;
        setDifference(diff);
      }
    }
  };

  const handleMouseUp = () => {
    setStartIndex(null);
    setEndIndex(null);
  };

  return (
    <div className="h-full flex justify-center items-center flex-col">
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
      <ResponsiveContainer width="100%" height={containerHeight} className={""}>
        <LineChart
          data={formattedData}
          animationDuration={0}
          className="ml-2 md:ml-5"
          // onMouseDown={handleMouseDown}
          // onMouseMove={handleMouseMove}
          // onMouseUp={handleMouseUp}
          margin={{ top: 20, right: 30, bottom: 5 }}
        >
          {/* <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs> */}
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis
            dataKey="name"
            tick={<CustomTick />}

            // interval="preserveStartEnd"
          />
          <YAxis
            type="number"
            domain={["dataMin", "dataMax"]}
            padding={{ bottom: 50 }}
            tick={CustomYTick}
            tickMargin={30}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {/* <Area
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorValue)"
          /> */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            strokeWidth={3}
            dot={{ r: 0 }}
            activeDot={{ r: 8 }}
          />
          {/* {startIndex !== null &&
            endIndex !== null &&
            startIndex !== endIndex && (
              <ReferenceArea
                alwaysShow
                zIndex={3}
                x1={formattedData[startIndex]?.name}
                x2={formattedData[endIndex]?.name}
                strokeOpacity={0.3}
                fill="rgba(136, 132, 216, 0.3)"
              />
            )} */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlayerPriceGraph;

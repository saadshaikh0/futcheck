import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Area,
} from "recharts";
import { fetchPlayerPriceHistory } from "../../api/apiService";
import { useQuery } from "@tanstack/react-query";

// Sample data in the new format
const data = [
  { price: "12000", time: "2024-08-23T14:00:00" },
  { price: "11500", time: "2024-08-23T13:00:00" },
  { price: "11900", time: "2024-08-23T12:00:00" },
  // Add more data points as needed
];

// Convert data to the format required by LineChart

const PlayerPriceGraph = ({ id }) => {
  const { data = [] } = useQuery({
    queryKey: ["fetchPlayerPriceHistory", id],
    queryFn: () => fetchPlayerPriceHistory(id),
    cacheTime: 1000 * 60 * 100,
    staleTime: Infinity,
  });
  const formattedData = data.map((item) => ({
    name: new Date(item.time).toLocaleTimeString(), // Format time as needed
    value: Number(item.price), // Convert price to a number
  }));
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={formattedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        {/* <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" /> */}
        <XAxis dataKey="name" />
        <YAxis
          type="number"
          domain={["dataMin", "dataMax"]}
          padding={{ bottom: 20 }}
        />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorValue)"
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          strokeWidth={3}
          dot={{ r: 0 }}
          activeDot={{ r: 8 }}
        />
        {/* <ReferenceLine y={10000000} stroke="red" strokeDasharray="3 3" /> */}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PlayerPriceGraph;

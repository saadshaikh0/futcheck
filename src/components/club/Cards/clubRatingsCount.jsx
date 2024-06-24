// SimpleBarChart.js
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SimpleBarChart = ({ data, xDataKey, barDataKey }) => {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      style={{ marginLeft: "-25px" }}
    >
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xDataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={barDataKey} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const ClubRatingsCount = ({ ratingsCount }) => {
  return (
    <div className="w-full h-full">
      <SimpleBarChart data={ratingsCount} xDataKey="name" barDataKey="value" />
    </div>
  );
};
export default ClubRatingsCount;

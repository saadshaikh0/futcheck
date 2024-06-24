// StackedBarChart.js
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

const data = [
  {
    name: "Special",
    icons: 20,
    heroes: 35,
    conmebol: 50,
  },
  {
    name: "Gold",
    rare: 100,
    common: 120,
  },
  {
    name: "Silver",
    rare: 200,
    common: 100,
  },
  {
    name: "Bronze",
    rare: 100,
    common: 80,
  },
];

const ClubRarityDistribution = ({ rarityDistribution }) => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={rarityDistribution}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="common" stackId="a" fill="#82ca9d" />
          <Bar dataKey="rare" stackId="a" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClubRarityDistribution;

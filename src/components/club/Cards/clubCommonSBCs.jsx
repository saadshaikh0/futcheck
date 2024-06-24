// HorizontalBarChart.js
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
  LabelList,
} from "recharts";

const data = [
  { name: "82+ Picks", value: 15 },
  { name: "TOTS Crafting ", value: 20 },
  { name: "UT Champions ", value: 1 },
  { name: "Premium SA & CAF", value: 12 },
  { name: "Serie A TOTS", value: 25 },
];

const ClubCommonSBC = ({ commonSbcs }) => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={commonSbcs}
          margin={{
            top: 20,
            right: 30,
            left: -20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis
            type="category"
            dataKey="name"
            width={150}
            tick={{ fontSize: 14 }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8">
            <LabelList dataKey="value" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClubCommonSBC;

// SimplePieChart.js
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { formatLargeNumber } from "../clubUtils";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384"];

const ClubValue = ({ clubValue }) => {
  const renderLegend = (value) => (
    <span style={{ fontSize: "12px", paddingTop: "10px" }}>{value}</span>
  );
  const data = [
    { name: "Tradeable", value: clubValue.tradeable_value ?? 0 },
    { name: "Untradeable", value: clubValue.untradeable_value ?? 0 },
  ];
  const renderCustomizedLabel = ({ x, y, name, value }) => {
    return (
      <text
        x={x}
        y={y}
        fill="#FFF"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {formatLargeNumber(value)}
      </text>
    );
  };
  return (
    <PieChart width={200} height={170}>
      <Pie
        data={data}
        cx={80}
        cy={70}
        innerRadius={42}
        outerRadius={55}
        fill="#8884d8"
        paddingAngle={1}
        dataKey="value"
        label={renderCustomizedLabel}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <text
        x="42%"
        y="45%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="pie-chart-label text-white"
        fill="#EAB308"
        fontWeight={"bold"}
      >
        {formatLargeNumber(clubValue.total_value) ?? 0}
      </text>
      <Legend formatter={renderLegend} />
    </PieChart>
  );
};

export default ClubValue;

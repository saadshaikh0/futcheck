import React from "react";
import {
  ResponsiveContainer,
  Sector,
  Cell,
  PieChart,
  Pie,
  Tooltip,
  Label,
} from "recharts";

const GaugeChart = ({ cv }) => {
  const RADIAN = Math.PI / 180;

  const width = 300;
  const height = 200;
  const chartValue = cv;
  const slices = [
    {
      value: 50,
      color: "#22C55E",
    },

    {
      value: 50,
      color: "#EF4444",
    },
  ];

  const sumValues = slices.map((cur) => cur.value).reduce((a, b) => a + b);
  const valueAngle = (chartValue / sumValues) * 180;

  const arrowData = [
    { value: chartValue },
    { value: 0 },
    { value: sumValues - chartValue },
  ];

  const pieProps = {
    startAngle: 180,
    endAngle: 0,
    cx: width / 2,
    cy: width / 2,
    isAnimationActive: false,
  };

  const Arrow = ({ cx, cy, midAngle, outerRadius }) => {
    const angle = 180 - valueAngle; // Convert it to fit the 180 to 0 angle range
    const sin = Math.sin(-RADIAN * angle);
    const cos = Math.cos(-RADIAN * angle);
    const mx = cx + (outerRadius + width * 0.03) * cos;
    const my = cy + (outerRadius + width * 0.03) * sin;
    return (
      <g>
        <path
          d={`M${cx},${cy}L${mx},${my}`}
          strokeWidth="6"
          stroke="white"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r={width * 0.1} fill="none" stroke="none" />
      </g>
    );
  };

  return (
    <div style={{ width, height: "100%", margin: "auto" }}>
      <div className="font-medium mt-10 -mb-2">Price Fluctuation: Stable</div>

      <ResponsiveContainer>
        <PieChart width={width} height={height}>
          <Pie
            stroke="none"
            data={slices}
            innerRadius={(width / 2) * 0.5}
            outerRadius={(width / 2) * 0.8}
            {...pieProps}
            // label
            // label={renderCustomizedLabel}
          >
            {slices.map((each, i) => (
              <Cell key={`cell-${i}`} fill={slices[i].color} stroke="none" />
            ))}
          </Pie>
          {/* <Tooltip /> */}
          <Pie
            stroke="none"
            fill="none"
            activeIndex={1}
            activeShape={Arrow}
            data={arrowData}
            innerRadius={(width / 2) * 0.5}
            outerRadius={(width / 2) * 0.6}
            {...pieProps}
          >
            {/* <Label
              value={chartValue}
              position="centerBottom" //
              offset={-20}
              className="gauge-label"
              fontSize="50px"
              fontWeight="bold"
            /> */}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GaugeChart;

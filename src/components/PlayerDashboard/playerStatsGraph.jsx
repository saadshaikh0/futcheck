import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
} from "recharts";

const PlayerStatsGraph = ({ player }) => {
  const data = [
    {
      subject: "Pace",
      A: player.attributes[0],

      fullMark: 100,
    },
    {
      subject: "Shooting",
      A: player.attributes[1],

      fullMark: 100,
    },
    {
      subject: "Pasing",
      A: player.attributes[2],

      fullMark: 100,
    },
    {
      subject: "Dribbling",
      A: player.attributes[3],

      fullMark: 100,
    },
    {
      subject: "Defense",
      A: player.attributes[4],

      fullMark: 100,
    },
    {
      subject: "Physical",
      A: player.attributes[5],

      fullMark: 100,
    },
  ];

  return (
    <RadarChart
      cx={200}
      cy={125}
      outerRadius={85}
      width={400}
      height={250}
      data={data}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <Tooltip />

      <Radar
        name={player.c_name ?? player.name}
        dataKey="A"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
    </RadarChart>
  );
};
export default PlayerStatsGraph;

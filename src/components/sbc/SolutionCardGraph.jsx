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
import CoinsImg from "../../assets/coins.png";
import { useDispatch, useSelector } from "react-redux";
import { setSolutionLeagueDetails } from "../../redux/sbcSlice";
// Dummy data
const data = [
  {
    league: "P",
    image:
      "https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/24B23FDE-7835-41C2-87A2-F453DFDB2E82/2024/fut/items/images/mobile/leagueLogos/dark/13.png",
    leagueid: 13,
    England: 40,
    France: 30,
    Germany: 20,
    Brazil: 10,
  },
  {
    league: "La Liga",
    image:
      "https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/24B23FDE-7835-41C2-87A2-F453DFDB2E82/2024/fut/items/images/mobile/leagueLogos/dark/53.png",
    leagueid: 53,
    Spain: 35,
    Argentina: 25,
    France: 15,
    Portugal: 10,
  },
  {
    league: "Serie A",
    image:
      "https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/24B23FDE-7835-41C2-87A2-F453DFDB2E82/2024/fut/items/images/mobile/leagueLogos/dark/54.png",
    leagueid: 54,
    Italy: 30,
    Brazil: 25,
    Argentina: 20,
    France: 15,
  },
  {
    league: "B",
    image:
      "https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/24B23FDE-7835-41C2-87A2-F453DFDB2E82/2024/fut/items/images/mobile/leagueLogos/dark/19.png",
    leagueid: 19,
    Germany: 50,
    Poland: 20,
    Brazil: 15,
    France: 10,
  },
  {
    league: "Ligue 1",
    image:
      "https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/24B23FDE-7835-41C2-87A2-F453DFDB2E82/2024/fut/items/images/mobile/leagueLogos/dark/31.png",
    leagueid: 31,
    France: 45,
    Brazil: 20,
    Argentina: 15,
    Germany: 10,
  },
];

// Custom XAxis tick component to render images
const CustomTick = ({ x, y, payload, data }) => {
  const leagueData = data.find((item) => item.leagueid === payload.value);
  return (
    <g transform={`translate(${x},${y})`}>
      <image
        href={leagueData.image}
        x={-20}
        y={10}
        height={30}
        width={40}
        style={{ transform: "translateY(-13px)" }}
      />
    </g>
  );
};
// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label, selectedLeagueId }) => {
  const dispatch = useDispatch();
  const { nationIdMap, leagueIdMap } = useSelector((state) => state.app);

  console.log("Hovered over bar:", active, payload, label, selectedLeagueId);

  if (active && payload && payload.length) {
    const leagueid = payload[0].payload.leagueid;
    if (leagueid !== selectedLeagueId) {
      dispatch(setSolutionLeagueDetails(payload[0].payload));
    }
    return (
      <div
        className="custom-tooltip rounded-md"
        style={{
          backgroundColor: "black",
          padding: "10px",
          //   border: "1px solid #ccc",
        }}
      >
        <p className="label">{leagueIdMap[leagueid].name}</p>
        {payload
          .sort((a, b) => b.value - a.value)
          .map((entry, index) => (
            <p
              key={`item-${index}`}
              className="grid grid-cols-2 pl-3"
              style={{ color: entry.color }}
            >
              <img
                src={nationIdMap[entry.name].guid}
                className="w-6 h-4 mr-2"
              />
              <div className="flex items-center ml-2 gap-1 text-gray-300">
                <img className="w-3 h-3" src={CoinsImg} /> {entry.value}
              </div>
            </p>
          ))}
        <hr />
        <p className="grid grid-cols-2">
          <span className="flex justify-center items-center">
            <img src={leagueIdMap[leagueid].guid} className="w-8" />
          </span>{" "}
          <span className="flex items-center justify-center gap-1">
            {" "}
            <img className="w-3 h-3" src={CoinsImg} />{" "}
            {payload.reduce((total, entry) => total + entry.value, 0)}
          </span>
        </p>
      </div>
    );
  } else {
    if (selectedLeagueId) {
      dispatch(setSolutionLeagueDetails({}));
    }
  }

  return null;
};

const colors = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7300",
  "#d0ed57",
  "#a4de6c",
  "#ff9f40",
  "#66b3ff",
  "#ffcc99",
  "#c490e4",
];

const getColor = (index) => {
  return colors[index % colors.length]; // Loop over the color palette if nations exceed colors available
};

const SolutionCardGraph = ({ data, nations }) => {
  const solutionLeagueDetails = useSelector(
    (state) => state.sbc.solutionLeagueDetails
  );
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        data={data}
        onm
        margin={{
          top: 10,
          right: 30,
          left: 20,
          bottom: 4,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="leagueid" tick={<CustomTick data={data} />} />
        <YAxis />
        <Tooltip
          content={
            <CustomTooltip selectedLeagueId={solutionLeagueDetails.leagueid} />
          }
        />
        {/* <Legend /> */}
        {nations?.map((nationId, index) => (
          <Bar
            key={nationId}
            dataKey={nationId}
            stackId="a"
            fill={getColor(index)}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SolutionCardGraph;

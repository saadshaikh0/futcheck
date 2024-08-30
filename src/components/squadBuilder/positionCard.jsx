import React from "react";
import PlayerCard from "../common/PlayerCard";

const PositionCard = ({ player }) => {
  // let player = {
  //   id: 151248093,
  //   rating: 97,
  //   base_id: 253149,
  //   rarity: 11,
  //   nation: 34,
  //   teamid: 32,
  //   leagueid: 19,
  //   guid: "7d6cb0a9-3f46-4c94-90e8-71981549e091",
  //   position: ["RWB", "RB", "RM"],
  //   date_created: "2024-05-03",
  //   name: "Jeremie Frimpong",
  //   c_name: "None",
  //   rarity_name: "Team of the Season",
  //   rarity_id: 11,
  //   nation_name: "Netherlands",
  //   nation_url:
  //     "https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/24B23FDE-7835-41C2-87A2-F453DFDB2E82/2024/fut/items/images/mobile/flags/list/34.png",
  //   futbin_id: 23460,
  //   futwiz_id: 22124,
  //   attributes: [99, 84, 93, 97, 91, 88],
  //   playstyle_plus: [9, 17, 10],
  //   level: 3,
  //   league_url:
  //     "https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/24B23FDE-7835-41C2-87A2-F453DFDB2E82/2024/fut/items/images/mobile/leagueLogos/dark/19.png",
  //   league_name: "Bundesliga (GER 1)",
  //   skill_moves: 4,
  //   weak_foot: 4,
  //   att_wr: 2,
  //   def_wr: 2,
  //   foot: 1,
  //   playstyles: [6, 11, 12, 18, 19, 22, 23],
  //   stats: [
  //     99, 99, 99, 99, 90, 99, 80, 93, 92, 91, 94, 99, 97, 95, 99, 98, 93, 60,
  //     61, 85, 96, 92, 80, 72, 96, 93, 66, 96, 60, 12, 7, 8, 14, 13,
  //   ],
  //   team_name: "Leverkusen",
  //   colors: ["#fbebab", "#90f23", "#9a9375"],
  //   guid_no: "4851bd19-70a8-48eb-806b-7b0c8c48889b",
  //   levels: 0,
  //   rarity_url:
  //     "https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/24B23FDE-7835-41C2-87A2-F453DFDB2E82/2024/fut/items/images/backgrounds/itemBGs/4851bd19-70a8-48eb-806b-7b0c8c48889b/cards_bg_s_1_11_0.png",
  //   text_color: "#fbebab",
  //   bg_color: "#090f23",
  // };
  return <PlayerCard player={player} isMini={true} isHover={true} />;
};
export default PositionCard;

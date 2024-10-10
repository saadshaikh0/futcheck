export const WORK_RATE = {
  0: "Low",
  1: "Medium",
  2: "High",
};

export const FOOT = {
  1: "Right",
  2: "Left",
};
// constants.js
export const ItemTypes = {
  PLAYER_CARD: "playerCard",
};

export const FILTER_TEXT = {
  page: "Page No",
  skill_moves: "Skill Moves",
  leagueid: "League",
  teamid: "Team",
  nation: "Nation",
  weak_foot: "Weak Foot",
  rarity: "Version",
  min_rating: "Rating",
  dwr: "Defensive WR",
  awr: "Attacking WR",
};

export const MOMENTUM_TEXT = {
  stable: "Price has been stable for the last few hours",
  up: "Price has been going up for the last few hours",
  down: "Price has been going down for the last few hours",
};

export const IN_GAME_STATS = {
  pace: [
    ["Acceleration", 0, 0.45], // 45% weight
    ["Sprint Speed", 1, 0.55], // 55% weight
  ],
  shooting: [
    ["Positioning", 11, 0.05], // 5% weight
    ["Finishing", 16, 0.45], // 45% weight
    ["Shot Power", 22, 0.2], // 20% weight
    ["Long Shots", 23, 0.2], // 20% weight
    ["Volleys", 26, 0.05], // 5% weight
    ["Penalties", 28, 0.05], // 5% weight
  ],
  passing: [
    ["Vision", 12, 0.2], // 20% weight
    ["Crossing", 14, 0.2], // 20% weight
    ["FK. Accuracy", 17, 0.05], // 5% weight
    ["Short Passing", 20, 0.35], // 35% weight
    ["Long Passing", 19, 0.15], // 15% weight
    ["Curve", 27, 0.05], // 5% weight
  ],
  dribbling: [
    ["Agility", 2, 0.1], // 10% weight
    ["Balance", 3, 0.05], // 5% weight
    ["Reactions", 7, 0.05], // 5% weight
    ["Ball Control", 13, 0.3], // 30% weight
    ["Dribbling", 15, 0.45], // 45% weight
    ["Composure", 9, 0.05], // 5% weight
  ],
  defending: [
    ["Interceptions", 10, 0.2], // 20% weight
    ["Heading Accuracy", 18, 0.1], // 10% weight
    ["Def. Awareness", 21, 0.3], // 30% weight
    ["Standing Tackle", 24, 0.3], // 30% weight
    ["Sliding Tackle", 25, 0.1], // 10% weight
  ],
  physicality: [
    ["Jumping", 4, 0.05], // 5% weight
    ["Stamina", 5, 0.25], // 25% weight
    ["Strength", 6, 0.5], // 50% weight
    ["Aggression", 8, 0.2], // 20% weight
  ],
};
export const STAT_INDEX_MAP = {
  Acceleration: 0,
  "Sprint Speed": 1,
  Agility: 2,
  Balance: 3,
  Jumping: 4,
  Stamina: 5,
  Strength: 6,
  Reactions: 7,
  Aggression: 8,
  Composure: 9,
  Interceptions: 10,
  Positioning: 11,
  Vision: 12,
  "Ball Control": 13,
  Crossing: 14,
  Dribbling: 15,
  Finishing: 16,
  "FK. Accuracy": 17,
  "Heading Accuracy": 18,
  "Long Passing": 19,
  "Short Passing": 20,
  "Def. Awareness": 21,
  "Shot Power": 22,
  "Long Shots": 23,
  "Standing Tackle": 24,
  "Sliding Tackle": 25,
  Volleys: 26,
  Curve: 27,
  Penalties: 28,
};
export const ChemStyles = [
  "Basic",
  "Sniper",
  "Finisher",
  "Deadeye",
  "Marksman",
  "Hawk",
  "Artist",
  "Architect",
  "Powerhouse",
  "Maestro",
  "Engine",
  "Sentinel",
  "Guardian",
  "Gladiator",
  "Backbone",
  "Anchor",
  "Hunter",
  "Catalyst",
  "Shadow",
];
export const GKChemStyles = [
  "Wall",
  "Shield",
  "Cat",
  "Glove",
  "Sweeper",
  "Falcon",
  "Glider",
  "Hunter",
  "Catalyst",
  "Shadow",
  "Wall",
  "Shield",
  "Cat",
  "Glove",
  "Sweeper",
  "Falcon",
  "Glider",
];
export const CHEMISTRY_STYLE_BONUSES = {
  basic: {
    "Sprint Speed": 1,
    Positioning: 1,
    "Shot Power": 1,
    Volleys: 1,
    Penalties: 1,
    Vision: 1,
    "Short Passing": 1,
    "Long Passing": 1,
    Curve: 1,
    Agility: 1,
    "Ball Control": 1,
    Dribbling: 1,
    "Def. Awareness": 1,
    "Standing Tackle": 1,
    "Sliding Tackle": 1,
    Jumping: 1,
    Strength: 1,
  },
  anchor: {
    Acceleration: 1,
    "Sprint Speed": 1,
    Interceptions: 1,
    "Heading Accuracy": 1,
    "Def. Awareness": 1,
    Aggression: 1,
    "Standing Tackle": 2,
    "Sliding Tackle": 2,
    Jumping: 2,
    Strength: 2,
  },
  architect: {
    "FK. Accuracy": 1,
    "Long Passing": 1,
    Aggression: 1,
    Vision: 2,
    Curve: 2,
    Jumping: 2,
    "Short Passing": 3,
    Strength: 3,
  },
  artist: {
    "FK. Accuracy": 1,
    Curve: 1,
    Reactions: 1,
    Vision: 2,
    Crossing: 2,
    Dribbling: 2,
    Agility: 3,
    "Long Passing": 3,
  },
  backbone: {
    "Def. Awareness": 1,
    "Sliding Tackle": 1,
    Strength: 1,
    Vision: 2,
    "Long Passing": 2,
    "Standing Tackle": 2,
    Interceptions: 2,
    Jumping: 2,
    Aggression: 2,
  },
  catalyst: {
    "Short Passing": 1,
    Curve: 1,
    Acceleration: 2,
    "Sprint Speed": 2,
    "Long Passing": 2,
    "FK. Accuracy": 2,
    Crossing: 3,
  },
  deadeye: {
    "Long Shots": 1,
    Penalties: 1,
    Curve: 1,
    Positioning: 2,
    Finishing: 2,
    Vision: 2,
    "Shot Power": 3,
    "Short Passing": 3,
  },
  engine: {
    Acceleration: 1,
    "Sprint Speed": 1,
    Vision: 1,
    "Short Passing": 1,
    "Long Passing": 1,
    Agility: 1,
    Crossing: 2,
    Curve: 2,
    Balance: 2,
    Dribbling: 2,
  },
  finisher: {
    "Shot Power": 1,
    Penalties: 1,
    Balance: 1,
    Positioning: 2,
    Volleys: 2,
    Agility: 2,
    Finishing: 3,
    Dribbling: 3,
  },
  gladiator: {
    Volleys: 1,
    "Heading Accuracy": 1,
    "Def. Awareness": 1,
    "Shot Power": 2,
    Interceptions: 2,
    "Standing Tackle": 2,
    Finishing: 3,
    "Sliding Tackle": 3,
  },
  guardian: {
    "Ball Control": 1,
    Interceptions: 1,
    Agility: 1,
    Balance: 2,
    "Def. Awareness": 2,
    "Sliding Tackle": 2,
    Dribbling: 3,
    "Standing Tackle": 3,
  },
  hawk: {
    Acceleration: 1,
    "Sprint Speed": 1,
    Positioning: 1,
    Finishing: 1,
    Penalties: 1,
    Strength: 1,
    "Shot Power": 2,
    "Long Shots": 2,
    Jumping: 2,
    Aggression: 2,
  },
  hunter: {
    Positioning: 2,
    "Shot Power": 1,
    Acceleration: 2,
    "Sprint Speed": 2,
    Finishing: 2,
    Penalties: 1,
    Volleys: 3,
  },
  maestro: {
    Volleys: 1,
    Vision: 1,
    "Short Passing": 1,
    "Shot Power": 2,
    "Long Shots": 2,
    "FK. Accuracy": 2,
    "Long Passing": 2,
    Reactions: 2,
    Dribbling: 2,
  },
  marksman: {
    "Shot Power": 1,
    Penalties: 1,
    Reactions: 1,
    Finishing: 2,
    "Long Shots": 2,
    "Ball Control": 2,
    Dribbling: 2,
    Jumping: 2,
    Strength: 2,
  },
  powerhouse: {
    Crossing: 1,
    Curve: 1,
    "Def. Awareness": 1,
    "Long Passing": 2,
    "Short Passing": 2,
    Interceptions: 2,
    Vision: 3,
    "Standing Tackle": 3,
  },
  sentinel: {
    "Standing Tackle": 1,
    "Sliding Tackle": 1,
    Strength: 1,
    Interceptions: 2,
    "Def. Awareness": 2,
    Aggression: 2,
    "Heading Accuracy": 3,
    Jumping: 3,
  },
  shadow: {
    "Heading Accuracy": 1,
    "Def. Awareness": 1,
    Acceleration: 2,
    "Sprint Speed": 2,
    "Standing Tackle": 2,
    Interceptions: 2,
    "Sliding Tackle": 3,
  },
  sniper: {
    Positioning: 1,
    Penalties: 1,
    Strength: 3,
    "Shot Power": 2,
    Volleys: 2,
    Aggression: 2,
    "Long Shots": 3,
    Jumping: 1,
  },
};

export const teamChemLinks = [
  {
    teamId: 1,
    linkedTeams: [116009],
  },
  {
    teamId: 116009,
    linkedTeams: [1],
  },
  {
    teamId: 2,
    linkedTeams: [116015],
  },
  {
    teamId: 116015,
    linkedTeams: [2],
  },
  {
    teamId: 5,
    linkedTeams: [116010],
  },
  {
    teamId: 116010,
    linkedTeams: [5],
  },
  {
    teamId: 7,
    linkedTeams: [116016],
  },
  {
    teamId: 116016,
    linkedTeams: [7],
  },
  {
    teamId: 9,
    linkedTeams: [116343],
  },
  {
    teamId: 116343,
    linkedTeams: [9],
  },
  {
    teamId: 10,
    linkedTeams: [116017],
  },
  {
    teamId: 116017,
    linkedTeams: [10],
  },
  {
    teamId: 11,
    linkedTeams: [116012],
  },
  {
    teamId: 116012,
    linkedTeams: [11],
  },
  {
    teamId: 18,
    linkedTeams: [116011],
  },
  {
    teamId: 116011,
    linkedTeams: [18],
  },
  {
    teamId: 19,
    linkedTeams: [116014],
  },
  {
    teamId: 116014,
    linkedTeams: [19],
  },
  {
    teamId: 21,
    linkedTeams: [115995],
  },
  {
    teamId: 115995,
    linkedTeams: [21],
  },
  {
    teamId: 25,
    linkedTeams: [116002],
  },
  {
    teamId: 116002,
    linkedTeams: [25],
  },
  {
    teamId: 31,
    linkedTeams: [116003],
  },
  {
    teamId: 116003,
    linkedTeams: [31],
  },
  {
    teamId: 32,
    linkedTeams: [115996],
  },
  {
    teamId: 115996,
    linkedTeams: [32],
  },
  {
    teamId: 38,
    linkedTeams: [116004],
  },
  {
    teamId: 116004,
    linkedTeams: [38],
  },
  {
    teamId: 45,
    linkedTeams: [116280],
  },
  {
    teamId: 116280,
    linkedTeams: [45],
  },
  {
    teamId: 52,
    linkedTeams: [116282],
  },
  {
    teamId: 116282,
    linkedTeams: [52],
  },
  {
    teamId: 62,
    linkedTeams: [116042],
  },
  {
    teamId: 116042,
    linkedTeams: [62],
  },
  {
    teamId: 66,
    linkedTeams: [116033],
  },
  {
    teamId: 116033,
    linkedTeams: [66],
  },
  {
    teamId: 70,
    linkedTeams: [116037],
  },
  {
    teamId: 116037,
    linkedTeams: [70],
  },
  {
    teamId: 71,
    linkedTeams: [116417],
  },
  {
    teamId: 116417,
    linkedTeams: [71],
  },
  {
    teamId: 73,
    linkedTeams: [116034],
  },
  {
    teamId: 116034,
    linkedTeams: [73],
  },
  {
    teamId: 76,
    linkedTeams: [131724],
  },
  {
    teamId: 131724,
    linkedTeams: [76],
  },
  {
    teamId: 95,
    linkedTeams: [116020],
  },
  {
    teamId: 116020,
    linkedTeams: [95],
  },
  {
    teamId: 175,
    linkedTeams: [115998],
  },
  {
    teamId: 115998,
    linkedTeams: [175],
  },
  {
    teamId: 234,
    linkedTeams: [131358],
  },
  {
    teamId: 131358,
    linkedTeams: [234],
  },
  {
    teamId: 240,
    linkedTeams: [116327],
  },
  {
    teamId: 116327,
    linkedTeams: [240],
  },
  {
    teamId: 241,
    linkedTeams: [116325],
  },
  {
    teamId: 116325,
    linkedTeams: [241],
  },
  {
    teamId: 242,
    linkedTeams: [131720],
  },
  {
    teamId: 131720,
    linkedTeams: [242],
  },
  {
    teamId: 243,
    linkedTeams: [116326],
  },
  {
    teamId: 116326,
    linkedTeams: [243],
  },
  {
    teamId: 245,
    linkedTeams: [131359],
  },
  {
    teamId: 131359,
    linkedTeams: [245],
  },
  {
    teamId: 266,
    linkedTeams: [131360],
  },
  {
    teamId: 131360,
    linkedTeams: [266],
  },
  {
    teamId: 379,
    linkedTeams: [116040],
  },
  {
    teamId: 116040,
    linkedTeams: [379],
  },
  {
    teamId: 448,
    linkedTeams: [116328],
  },
  {
    teamId: 116328,
    linkedTeams: [448],
  },
  {
    teamId: 449,
    linkedTeams: [116330],
  },
  {
    teamId: 116330,
    linkedTeams: [449],
  },
  {
    teamId: 452,
    linkedTeams: [131733],
  },
  {
    teamId: 131733,
    linkedTeams: [452],
  },
  {
    teamId: 457,
    linkedTeams: [116336],
  },
  {
    teamId: 116336,
    linkedTeams: [457],
  },
  {
    teamId: 461,
    linkedTeams: [116339],
  },
  {
    teamId: 116339,
    linkedTeams: [461],
  },
  {
    teamId: 467,
    linkedTeams: [116331],
  },
  {
    teamId: 116331,
    linkedTeams: [467],
  },
  {
    teamId: 481,
    linkedTeams: [116337],
  },
  {
    teamId: 116337,
    linkedTeams: [481],
  },
  {
    teamId: 698,
    linkedTeams: [116306],
  },
  {
    teamId: 116306,
    linkedTeams: [698],
  },
  {
    teamId: 894,
    linkedTeams: [131361],
  },
  {
    teamId: 131361,
    linkedTeams: [894],
  },
  {
    teamId: 1738,
    linkedTeams: [116416],
  },
  {
    teamId: 116416,
    linkedTeams: [1738],
  },
  {
    teamId: 1799,
    linkedTeams: [131725],
  },
  {
    teamId: 131725,
    linkedTeams: [1799],
  },
  {
    teamId: 1808,
    linkedTeams: [116013],
  },
  {
    teamId: 116013,
    linkedTeams: [1808],
  },
  {
    teamId: 1819,
    linkedTeams: [116044],
  },
  {
    teamId: 116044,
    linkedTeams: [1819],
  },
  {
    teamId: 1824,
    linkedTeams: [115997],
  },
  {
    teamId: 115997,
    linkedTeams: [1824],
  },
  {
    teamId: 1853,
    linkedTeams: [116333],
  },
  {
    teamId: 116333,
    linkedTeams: [1853],
  },
  {
    teamId: 10029,
    linkedTeams: [115999],
  },
  {
    teamId: 115999,
    linkedTeams: [10029],
  },
  {
    teamId: 110832,
    linkedTeams: [131391],
  },
  {
    teamId: 131391,
    linkedTeams: [110832],
  },
  {
    teamId: 111065,
    linkedTeams: [131478],
  },
  {
    teamId: 131478,
    linkedTeams: [111065],
  },
  {
    teamId: 111140,
    linkedTeams: [116302],
  },
  {
    teamId: 116302,
    linkedTeams: [111140],
  },
  {
    teamId: 111144,
    linkedTeams: [116300],
  },
  {
    teamId: 116300,
    linkedTeams: [111144],
  },
  {
    teamId: 111817,
    linkedTeams: [116035],
  },
  {
    teamId: 116035,
    linkedTeams: [111817],
  },
  {
    teamId: 112172,
    linkedTeams: [116021],
  },
  {
    teamId: 116021,
    linkedTeams: [112172],
  },
  {
    teamId: 112606,
    linkedTeams: [116307],
  },
  {
    teamId: 116307,
    linkedTeams: [112606],
  },
];

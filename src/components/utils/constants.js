export const WORK_RATE = {
  0: "Low",
  1: "Medium",
  2: "High",
};

export const FOOT = {
  1: "Right",
  2: "Left",
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

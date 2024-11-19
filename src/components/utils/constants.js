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

export const EVO_STAT_INDEX_MAP = {
  ACCELERATION: 0,
  SPRINT_SPEED: 1,
  AGILITY: 2,
  BALANCE: 3,
  JUMPING: 4,
  STAMINA: 5,
  STRENGTH: 6,
  REACTIONS: 7,
  AGGRESSION: 8,
  COMPOSURE: 9,
  INTERCEPTIONS: 10,
  POSITIONING: 11,
  VISION: 12,
  BALL_CONTROL: 13,
  CROSSING: 14,
  DRIBBLING_SUB: 15,
  FINISHING: 16,
  FK_ACC: 17,
  HEADING_ACC: 18,
  LONG_PASSING: 19,
  SHORT_PASSING: 20,
  DEF_AWARENESS: 21,
  SHOT_POWER: 22,
  LONG_SHOTS: 23,
  STANDING_TACKLE: 24,
  SLIDING_TACKLE: 25,
  VOLLEYS: 26,
  CURVE: 27,
  PENALTIES: 28,
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

export const roleMapping = {
  1: {
    name: "Goalkeeper+",
    positionName: "GK",
    description:
      "A modern goalkeeper who is able to stop attacks and support build-up play as a passing option.",
    cleanName: "Goalkeeper",
  },
  2: {
    name: "Sweeper Keeper+",
    positionName: "GK",
    description:
      "A traditional goalkeeper who stays on their line and focuses on shot-stopping.",
    cleanName: "Sweeper Keeper",
  },
  3: {
    name: "Fullback+",
    positionName: "RB",
    description:
      "A wide defender that will prioritise protecting their own goal, by standing back, holding the defensive line, and offering a passing option to release pressure.",
    cleanName: "Fullback",
  },
  4: {
    name: "Falseback+",
    positionName: "RB",
    description:
      "A modern evolution of the fullback, this player pushes up the field, adopting a central position, when their team has the ball.",
    cleanName: "Falseback",
  },
  5: {
    name: "Wingback+",
    positionName: "RB",
    description:
      "This player's versatility and stamina allows them to push upfield to support attacks, before returning to their defensive position.",
    cleanName: "Wingback",
  },
  6: {
    name: "Attacking Wingback+",
    positionName: "RB",
    description:
      "Though technically a defender, this player will be more concerned with getting forward, and offering width to their team's attacks.",
    cleanName: "Attacking Wingback",
  },
  7: {
    name: "Fullback+",
    positionName: "LB",
    description:
      "A wide defender that will prioritise protecting their own goal, by standing back, holding the defensive line, and offering a passing option to release pressure.",
    cleanName: "Fullback",
  },
  8: {
    name: "Falseback+",
    positionName: "LB",
    description:
      "A modern evolution of the fullback, this player pushes up the field, adopting a central position, when their team has the ball.",
    cleanName: "Falseback",
  },
  9: {
    name: "Wingback+",
    positionName: "LB",
    description:
      "This player's versatility and stamina allows them to push upfield to support attacks, before returning to their defensive position.",
    cleanName: "Wingback",
  },
  10: {
    name: "Attacking Wingback+",
    positionName: "LB",
    description:
      "Though technically a defender, this player will be more concerned with getting forward, and offering width to their team's attacks.",
    cleanName: "Attacking Wingback",
  },
  11: {
    name: "Defender+",
    positionName: "CB",
    description:
      "A no nonsense centre back who excels at the basics of defending, including maintaining the defensive line.",
    cleanName: "Defender",
  },
  12: {
    name: "Stopper+",
    positionName: "CB",
    description:
      "A ball-winning centre back who will step forward from the defensive line to make tackles, intercept passes, and lead the press.",
    cleanName: "Stopper",
  },
  13: {
    name: "Ball-Playing Defender+",
    positionName: "CB",
    description:
      "A modern centre back who is as comfortable playing offside as playing the ball. Capable of moving forward or wider to support build-up play.",
    cleanName: "Ball-Playing Defender",
  },
  14: {
    name: "Holding+",
    positionName: "CDM",
    description:
      "A pivotal role in modern football, this defence-minded midfielder focuses on guarding their backline during attacks, and covering off against counter attacks, with limited attacking support.",
    cleanName: "Holding",
  },
  15: {
    name: "Centre-Half+",
    positionName: "CDM",
    description:
      "A defensive midfielder who will drop between the Centre Backs while their team is in possession to offer protection against the counter attack.",
    cleanName: "Centre-Half",
  },
  16: {
    name: "Deep-Lying Playmaker+",
    positionName: "CDM",
    description:
      "The key cog to building up play from the back, this defensively positioned midfielder will often be the catalyst for attacks.",
    cleanName: "Deep-Lying Playmaker",
  },
  18: {
    name: "Box-To-Box+",
    positionName: "CM",
    description:
      "This player operates between the two boxes, operating as neither the last line of defence, nor the final part of the attack, but involved in everything in-between.",
    cleanName: "Box-To-Box",
  },
  19: {
    name: "Holding+",
    positionName: "CM",
    description:
      "A pivotal role in modern football, this defence-minded midfielder focuses on guarding their backline during attacks, and covering off against counter attacks, with limited attacking support.",
    cleanName: "Holding",
  },
  20: {
    name: "Deep-Lying Playmaker+",
    positionName: "CM",
    description:
      "The key cog to building up play from the back, this defensively positioned midfielder will often be the catalyst for attacks.",
    cleanName: "Deep-Lying Playmaker",
  },
  21: {
    name: "Playmaker+",
    positionName: "CM",
    description:
      "This player tends to be the creative fulcrum of a midfield, given license to roam and create space and opportunities for attacks. Likely to be out of position if the opposition counters.",
    cleanName: "Playmaker",
  },
  22: {
    name: "Half-Winger+",
    positionName: "CM",
    description:
      "A midfielder who provides width when their team is in possession, moving along the flanks to offer a wide threat. Particularly effective when one of three central midfielders.",
    cleanName: "Half-Winger",
  },
  23: {
    name: "Winger+",
    positionName: "RM",
    description:
      "A wide midfielder who will always stay wide, hugging the touchline, offering support on the flanks in all phases of play.",
    cleanName: "Winger",
  },
  24: {
    name: "Wide Midfielder+",
    positionName: "RM",
    description:
      "A midfielder who stays wide to facilitate play, providing passing and defensive support, but rarely ventures forward to attack.",
    cleanName: "Wide Midfielder",
  },
  25: {
    name: "Wide Playmaker+",
    positionName: "RM",
    description:
      "A creative outlet positioned out wide, but able to move inside to help create chances to unpick defences.",
    cleanName: "Wide Playmaker",
  },
  26: {
    name: "Inside Forward+",
    positionName: "RM",
    description:
      "A wide attacker who begins on the wing, but will regularly cut inside onto their preferred foot to shoot or play the final pass. The tend to run in behind the defence.",
    cleanName: "Inside Forward",
  },
  27: {
    name: "Winger+",
    positionName: "LM",
    description:
      "A wide midfielder who will always stay wide, hugging the touchline, offering support on the flanks in all phases of play.",
    cleanName: "Winger",
  },
  28: {
    name: "Wide Midfielder+",
    positionName: "LM",
    description:
      "A midfielder who stays wide to facilitate play, providing passing and defensive support, but rarely ventures forward to attack.",
    cleanName: "Wide Midfielder",
  },
  29: {
    name: "Wide Playmaker+",
    positionName: "LM",
    description:
      "A creative outlet positioned out wide, but able to move inside to help create chances to unpick defences.",
    cleanName: "Wide Playmaker",
  },
  30: {
    name: "Inside Forward+",
    positionName: "LM",
    description:
      "A wide attacker who begins on the wing, but will regularly cut inside onto their preferred foot to shoot or play the final pass. The tend to run in behind the defence.",
    cleanName: "Inside Forward",
  },
  31: {
    name: "Playmaker+",
    positionName: "CAM",
    description:
      "This player tends to be the creative fulcrum of a midfield, given license to roam and create space and opportunities for attacks. Likely to be out of position if the opposition counters.",
    cleanName: "Playmaker",
  },
  32: {
    name: "Shadow Striker+",
    positionName: "CAM",
    description:
      "An attack-minded midfielder who plays in the 'hole' behind the strikers. Their well-timed runs into the box will result in plenty of goal-scoring opportunities.",
    cleanName: "Shadow Striker",
  },
  33: {
    name: "Half-Winger+",
    positionName: "CAM",
    description:
      "A midfielder who provides width when their team is in possession, moving along the flanks to offer a wide threat. Particularly effective when one of three central midfielders.",
    cleanName: "Half-Winger",
  },
  35: {
    name: "Winger+",
    positionName: "RW",
    description:
      "A wide midfielder who will always stay wide, hugging the touchline, offering support on the flanks in all phases of play.",
    cleanName: "Winger",
  },
  36: {
    name: "Inside Forward+",
    positionName: "RW",
    description:
      "A wide attacker who begins on the wing, but will regularly cut inside onto their preferred foot to shoot or play the final pass. The tend to run in behind the defence.",
    cleanName: "Inside Forward",
  },
  37: {
    name: "Wide Playmaker+",
    positionName: "RW",
    description:
      "A creative outlet positioned out wide, but able to move inside to help create chances to unpick defences.",
    cleanName: "Wide Playmaker",
  },
  38: {
    name: "Winger+",
    positionName: "LW",
    description:
      "A wide midfielder who will always stay wide, hugging the touchline, offering support on the flanks in all phases of play.",
    cleanName: "Winger",
  },
  39: {
    name: "Inside Forward+",
    positionName: "LW",
    description:
      "A wide attacker who begins on the wing, but will regularly cut inside onto their preferred foot to shoot or play the final pass. The tend to run in behind the defence.",
    cleanName: "Inside Forward",
  },
  40: {
    name: "Wide Playmaker+",
    positionName: "LW",
    description:
      "A creative outlet positioned out wide, but able to move inside to help create chances to unpick defences.",
    cleanName: "Wide Playmaker",
  },
  41: {
    name: "Advanced Forward+",
    positionName: "ST",
    description:
      "A versatile attacker who usually stays close to the opposition's defensive line, but opens themselves up for passes in the build up, and makes runs in behind for scoring chances.",
    cleanName: "Advanced Forward",
  },
  42: {
    name: "Poacher+",
    positionName: "ST",
    description:
      "This player has one objective: score goals. They stay forward and focus on making runs in behind the defence, hoping to fashion a chance to score.",
    cleanName: "Poacher",
  },
  43: {
    name: "False 9+",
    positionName: "ST",
    description:
      "Positioned in the forward line, this player drops deep to dictate play, in the space in front of a defence. This also allows them to contribute towards defensive phases of the game.",
    cleanName: "False 9",
  },
  44: {
    name: "Target Forward+",
    positionName: "ST",
    description:
      "An attacking outlet whose physicality allows them to hold up play, shielding the ball from opponents, and bring others into attacks. They feed on crosses as well as passes to feet.",
    cleanName: "Target Forward",
  },
  101: {
    name: "Goalkeeper++",
    positionName: "GK",
    description:
      "A modern goalkeeper who is able to stop attacks and support build-up play as a passing option.",
    cleanName: "Goalkeeper",
  },
  102: {
    name: "Sweeper Keeper++",
    positionName: "GK",
    description:
      "A traditional goalkeeper who stays on their line and focuses on shot-stopping.",
    cleanName: "Sweeper Keeper",
  },
  103: {
    name: "Fullback++",
    positionName: "RB",
    description:
      "A wide defender that will prioritise protecting their own goal, by standing back, holding the defensive line, and offering a passing option to release pressure.",
    cleanName: "Fullback",
  },
  104: {
    name: "Falseback++",
    positionName: "RB",
    description:
      "A modern evolution of the fullback, this player pushes up the field, adopting a central position, when their team has the ball.",
    cleanName: "Falseback",
  },
  105: {
    name: "Wingback++",
    positionName: "RB",
    description:
      "This player's versatility and stamina allows them to push upfield to support attacks, before returning to their defensive position.",
    cleanName: "Wingback",
  },
  106: {
    name: "Attacking Wingback++",
    positionName: "RB",
    description:
      "Though technically a defender, this player will be more concerned with getting forward, and offering width to their team's attacks.",
    cleanName: "Attacking Wingback",
  },
  107: {
    name: "Fullback++",
    positionName: "LB",
    description:
      "A wide defender that will prioritise protecting their own goal, by standing back, holding the defensive line, and offering a passing option to release pressure.",
    cleanName: "Fullback",
  },
  108: {
    name: "Falseback++",
    positionName: "LB",
    description:
      "A modern evolution of the fullback, this player pushes up the field, adopting a central position, when their team has the ball.",
    cleanName: "Falseback",
  },
  109: {
    name: "Wingback++",
    positionName: "LB",
    description:
      "This player's versatility and stamina allows them to push upfield to support attacks, before returning to their defensive position.",
    cleanName: "Wingback",
  },
  110: {
    name: "Attacking Wingback++",
    positionName: "LB",
    description:
      "Though technically a defender, this player will be more concerned with getting forward, and offering width to their team's attacks.",
    cleanName: "Attacking Wingback",
  },
  111: {
    name: "Defender++",
    positionName: "CB",
    description:
      "A no nonsense centre back who excels at the basics of defending, including maintaining the defensive line.",
    cleanName: "Defender",
  },
  112: {
    name: "Stopper++",
    positionName: "CB",
    description:
      "A ball-winning centre back who will step forward from the defensive line to make tackles, intercept passes, and lead the press.",
    cleanName: "Stopper",
  },
  113: {
    name: "Ball-Playing Defender++",
    positionName: "CB",
    description:
      "A modern centre back who is as comfortable playing offside as playing the ball. Capable of moving forward or wider to support build-up play.",
    cleanName: "Ball-Playing Defender",
  },
  114: {
    name: "Holding++",
    positionName: "CDM",
    description:
      "A pivotal role in modern football, this defence-minded midfielder focuses on guarding their backline during attacks, and covering off against counter attacks, with limited attacking support.",
    cleanName: "Holding",
  },
  115: {
    name: "Centre-Half++",
    positionName: "CDM",
    description:
      "A defensive midfielder who will drop between the Centre Backs while their team is in possession to offer protection against the counter attack.",
    cleanName: "Centre-Half",
  },
  116: {
    name: "Deep-Lying Playmaker++",
    positionName: "CDM",
    description:
      "The key cog to building up play from the back, this defensively positioned midfielder will often be the catalyst for attacks.",
    cleanName: "Deep-Lying Playmaker",
  },
  118: {
    name: "Box-To-Box++",
    positionName: "CM",
    description:
      "This player operates between the two boxes, operating as neither the last line of defence, nor the final part of the attack, but involved in everything in-between.",
    cleanName: "Box-To-Box",
  },
  119: {
    name: "Holding++",
    positionName: "CM",
    description:
      "A pivotal role in modern football, this defence-minded midfielder focuses on guarding their backline during attacks, and covering off against counter attacks, with limited attacking support.",
    cleanName: "Holding",
  },
  120: {
    name: "Deep-Lying Playmaker++",
    positionName: "CM",
    description:
      "The key cog to building up play from the back, this defensively positioned midfielder will often be the catalyst for attacks.",
    cleanName: "Deep-Lying Playmaker",
  },
  121: {
    name: "Playmaker++",
    positionName: "CM",
    description:
      "This player tends to be the creative fulcrum of a midfield, given license to roam and create space and opportunities for attacks. Likely to be out of position if the opposition counters.",
    cleanName: "Playmaker",
  },
  122: {
    name: "Half-Winger++",
    positionName: "CM",
    description:
      "A midfielder who provides width when their team is in possession, moving along the flanks to offer a wide threat. Particularly effective when one of three central midfielders.",
    cleanName: "Half-Winger",
  },
  123: {
    name: "Winger++",
    positionName: "RM",
    description:
      "A wide midfielder who will always stay wide, hugging the touchline, offering support on the flanks in all phases of play.",
    cleanName: "Winger",
  },
  124: {
    name: "Wide Midfielder++",
    positionName: "RM",
    description:
      "A midfielder who stays wide to facilitate play, providing passing and defensive support, but rarely ventures forward to attack.",
    cleanName: "Wide Midfielder",
  },
  125: {
    name: "Wide Playmaker++",
    positionName: "RM",
    description:
      "A creative outlet positioned out wide, but able to move inside to help create chances to unpick defences.",
    cleanName: "Wide Playmaker",
  },
  126: {
    name: "Inside Forward++",
    positionName: "RM",
    description:
      "A wide attacker who begins on the wing, but will regularly cut inside onto their preferred foot to shoot or play the final pass. The tend to run in behind the defence.",
    cleanName: "Inside Forward",
  },
  127: {
    name: "Winger++",
    positionName: "LM",
    description:
      "A wide midfielder who will always stay wide, hugging the touchline, offering support on the flanks in all phases of play.",
    cleanName: "Winger",
  },
  128: {
    name: "Wide Midfielder++",
    positionName: "LM",
    description:
      "A midfielder who stays wide to facilitate play, providing passing and defensive support, but rarely ventures forward to attack.",
    cleanName: "Wide Midfielder",
  },
  129: {
    name: "Wide Playmaker++",
    positionName: "LM",
    description:
      "A creative outlet positioned out wide, but able to move inside to help create chances to unpick defences.",
    cleanName: "Wide Playmaker",
  },
  130: {
    name: "Inside Forward++",
    positionName: "LM",
    description:
      "A wide attacker who begins on the wing, but will regularly cut inside onto their preferred foot to shoot or play the final pass. The tend to run in behind the defence.",
    cleanName: "Inside Forward",
  },
  131: {
    name: "Playmaker++",
    positionName: "CAM",
    description:
      "This player tends to be the creative fulcrum of a midfield, given license to roam and create space and opportunities for attacks. Likely to be out of position if the opposition counters.",
    cleanName: "Playmaker",
  },
  132: {
    name: "Shadow Striker++",
    positionName: "CAM",
    description:
      "An attack-minded midfielder who plays in the 'hole' behind the strikers. Their well-timed runs into the box will result in plenty of goal-scoring opportunities.",
    cleanName: "Shadow Striker",
  },
  133: {
    name: "Half-Winger++",
    positionName: "CAM",
    description:
      "A midfielder who provides width when their team is in possession, moving along the flanks to offer a wide threat. Particularly effective when one of three central midfielders.",
    cleanName: "Half-Winger",
  },
  135: {
    name: "Winger++",
    positionName: "RW",
    description:
      "A wide midfielder who will always stay wide, hugging the touchline, offering support on the flanks in all phases of play.",
    cleanName: "Winger",
  },
  136: {
    name: "Inside Forward++",
    positionName: "RW",
    description:
      "A wide attacker who begins on the wing, but will regularly cut inside onto their preferred foot to shoot or play the final pass. The tend to run in behind the defence.",
    cleanName: "Inside Forward",
  },
  137: {
    name: "Wide Playmaker++",
    positionName: "RW",
    description:
      "A creative outlet positioned out wide, but able to move inside to help create chances to unpick defences.",
    cleanName: "Wide Playmaker",
  },
  138: {
    name: "Winger++",
    positionName: "LW",
    description:
      "A wide midfielder who will always stay wide, hugging the touchline, offering support on the flanks in all phases of play.",
    cleanName: "Winger",
  },
  139: {
    name: "Inside Forward++",
    positionName: "LW",
    description:
      "A wide attacker who begins on the wing, but will regularly cut inside onto their preferred foot to shoot or play the final pass. The tend to run in behind the defence.",
    cleanName: "Inside Forward",
  },
  140: {
    name: "Wide Playmaker++",
    positionName: "LW",
    description:
      "A creative outlet positioned out wide, but able to move inside to help create chances to unpick defences.",
    cleanName: "Wide Playmaker",
  },
  141: {
    name: "Advanced Forward++",
    positionName: "ST",
    description:
      "A versatile attacker who usually stays close to the opposition's defensive line, but opens themselves up for passes in the build up, and makes runs in behind for scoring chances.",
    cleanName: "Advanced Forward",
  },
  142: {
    name: "Poacher++",
    positionName: "ST",
    description:
      "This player has one objective: score goals. They stay forward and focus on making runs in behind the defence, hoping to fashion a chance to score.",
    cleanName: "Poacher",
  },
  143: {
    name: "False 9++",
    positionName: "ST",
    description:
      "Positioned in the forward line, this player drops deep to dictate play, in the space in front of a defence. This also allows them to contribute towards defensive phases of the game.",
    cleanName: "False 9",
  },
  144: {
    name: "Target Forward++",
    positionName: "ST",
    description:
      "An attacking outlet whose physicality allows them to hold up play, shielding the ball from opponents, and bring others into attacks. They feed on crosses as well as passes to feet.",
    cleanName: "Target Forward",
  },
};
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

export const AcademyEligibilityAttribute = {
  0: "NONE",
  1: "OVR",
  2: "PACE",
  3: "SHOOTING",
  4: "PASSING",
  5: "DRIBBLING_MAIN",
  6: "DEFENSE",
  7: "PHYSICALITY",
  8: "ACCELERATION",
  9: "SPRINT_SPEED",
  10: "AGILITY",
  11: "BALANCE",
  12: "JUMPING",
  13: "STAMINA",
  14: "STRENGTH",
  15: "REACTIONS",
  16: "AGGRESSION",
  17: "COMPOSURE",
  18: "INTERCEPTIONS",
  19: "POSITIONING",
  20: "VISION",
  21: "BALL_CONTROL",
  22: "CROSSING",
  23: "DRIBBLING_SUB",
  24: "FINISHING",
  25: "FK_ACC",
  26: "HEADING_ACC",
  27: "LONG_PASSING",
  28: "SHORT_PASSING",
  29: "DEF_AWARENESS",
  30: "SHOT_POWER",
  31: "LONG_SHOTS",
  32: "STANDING_TACKLE",
  33: "SLIDING_TACKLE",
  34: "VOLLEYS",
  35: "CURVE",
  36: "PENALTIES",
  37: "WEAK_FOOT",
  38: "SKILL_MOVES",
  39: "ATTACK_WORK_RATE",
  40: "DEFENSIVE_WORK_RATE",
  41: "DEFINITION_ID",
  42: "NATION",
  43: "CLUB",
  44: "LEAGUE",
  45: "RARITY",
  46: "RARITY_NEGATED",
  47: "POSITION",
  48: "POSITION_NEGATED",
  49: "POSSIBLE_POSITIONS_COUNT",
  50: "BASE_TRAITS_COUNT",
  51: "ICON_TRAITS_COUNT",
  52: "TOTAL_TRAITS_COUNT",
  53: "BASE_TRAIT_PRESENT",
  54: "ICON_TRAIT_PRESENT",
  55: "UNTRADEABLE",
  58: "MAX_ROLES_P",
  59: "MAX_ROLES_PP",
};

export const AcademyStatEnum = {
  0: "ENROLLED_IN_ACADEMY",
  1: "ACTIVE_IN_ACADEMY",
  2: "RARITY",
  3: "NICKNAME",
  11: "OVR",
  12: "PACE",
  13: "SHOOTING",
  14: "PASSING",
  15: "DRIBBLING_MAIN",
  16: "DEFENSE",
  17: "PHYSICALITY",
  21: "ACCELERATION",
  22: "SPRINT_SPEED",
  23: "AGILITY",
  24: "BALANCE",
  25: "JUMPING",
  26: "STAMINA",
  27: "STRENGTH",
  28: "REACTIONS",
  29: "AGGRESSION",
  30: "COMPOSURE",
  31: "INTERCEPTIONS",
  32: "POSITIONING",
  33: "VISION",
  34: "BALL_CONTROL",
  35: "CROSSING",
  36: "DRIBBLING_SUB",
  37: "FINISHING",
  38: "FK_ACC",
  39: "HEADING_ACC",
  40: "LONG_PASSING",
  41: "SHORT_PASSING",
  42: "DEF_AWARENESS",
  43: "SHOT_POWER",
  44: "LONG_SHOTS",
  45: "STANDING_TACKLE",
  46: "SLIDING_TACKLE",
  47: "VOLLEYS",
  48: "CURVE",
  49: "PENALTIES",
  61: "CB",
  62: "RB",
  63: "RWB",
  64: "LB",
  65: "LWB",
  66: "CDM",
  67: "CM",
  68: "CAM",
  69: "LM",
  70: "RM",
  71: "LW",
  72: "RW",
  73: "ST",
  74: "CF",
  81: "WEAK_FOOT",
  82: "SKILL_MOVES",
  83: "ATTACK_WORK_RATE",
  84: "DEFENSIVE_WORK_RATE",
  101: "FINISHING_FINESSE_SHOT",
  102: "FINISHING_CHIP_SHOT",
  103: "FINISHING_POWER_SHOT",
  104: "FINISHING_FK_SPECIALIST",
  105: "FINISHING_POWER_HEADER",
  106: "PASSING_PASS_INTO_SPACE",
  107: "PASSING_BULLET_PASSES",
  108: "PASSING_LOB_PASS_MASTER",
  109: "PASSING_TIKI_TAKA_MASTER",
  110: "PASSING_WHIPPED_CROSSES",
  111: "DEFENDING_FAST_JOCKEY",
  112: "DEFENDING_BRICK_WALL",
  113: "DEFENDING_INTERCEPTOR",
  114: "DEFENDING_TACKLE_VISION",
  115: "DEFENDING_SLIDE_TACKLER",
  116: "DEFENDING_BRUISER",
  117: "BALL_CONTROL_TECHNICAL_DRIBBLER",
  118: "BALL_CONTROL_SPEED_DRIBBLER",
  119: "BALL_CONTROL_FLAIR",
  120: "BALL_CONTROL_TRAP_MASTER",
  121: "BALL_CONTROL_TRICKSTER",
  122: "BALL_CONTROL_POSSESSION_HOLDER",
  123: "PHYSICAL_EXPLOSIVE_SPRINT_BOOST",
  124: "PHYSICAL_RELENTLESS",
  125: "PHYSICAL_OUTSIDE_FOOT",
  126: "PHYSICAL_ACROBATIC",
  127: "PHYSICAL_THROW_IN_SPECIALIST",
  128: "PHYSICAL_AERIAL_MASTER",
  129: "GOAL_KEEPER_LONG_THROWER",
  130: "GOAL_KEEPER_SAVE_WITH_FOOT",
  131: "GOAL_KEEPER_COMES_FOR_CROSSES",
  132: "GOAL_KEEPER_RUSHES_OUT_OF_GOAL",
  133: "COSMETIC_UPGRADE",
  134: "GOAL_KEEPER_FAR_REACH",
  135: "GOAL_KEEPER_DEFLECTOR",
  151: "GK_GOALKEEPER",
  152: "GK_SWEEPER_KEEPER",
  153: "RB_FULLBACK",
  154: "RB_FALSEBACK",
  155: "RB_WINGBACK",
  156: "RB_OFFENSIVE_WINGBACK",
  157: "LB_FULLBACK",
  158: "LB_FALSEBACK",
  159: "LB_WINGBACK",
  160: "LB_OFFENSIVE_WINGBACK",
  161: "CB_DEFENDER",
  162: "CB_STOPPER",
  163: "CB_BALL_PLAYING_DEFENDER",
  164: "CDM_HOLDING",
  165: "CDM_CENTRE_HALF",
  166: "CDM_DEEP_LYING_PLAYMAKER",
  167: "CDM_PLR1",
  168: "CM_BOX_TO_BOX",
  169: "CM_HOLDING",
  170: "CM_DEEP_LYING_PLAYMAKER",
  171: "CM_PLAYMAKER",
  172: "CM_HALF_WINGER",
  173: "RM_WINGER",
  174: "RM_WIDE_MIDFIELDER",
  175: "RM_WIDE_PLAYMAKER",
  176: "RM_INSIDE_FORWARD",
  177: "LM_WINGER",
  178: "LM_WIDE_MIDFIELDER",
  179: "LM_WIDE_PLAYMAKER",
  180: "LM_INSIDE_FORWARD",
  181: "CAM_PLAYMAKER",
  182: "CAM_SHADOW_STRIKER",
  183: "CAM_HALF_WINGER",
  184: "CAM_PLR2",
  185: "RW_WINGER",
  186: "RW_INSIDE_FORWARD",
  187: "RW_WIDE_PLAYMAKER",
  188: "LW_WINGER",
  189: "LW_INSIDE_FORWARD",
  190: "LW_WIDE_PLAYMAKER",
  191: "ST_ADVANCE_FORWARD",
  192: "ST_POACHER",
  193: "ST_FALSE_9",
  194: "ST_TARGET_FORWARD",
};

export const TraitMapping = {
  25: {
    name: "Acrobatic",
    categoryId: 5,
    category: "Physical",
    whoHasIt:
      "A player who tends to perform acrobatic passes, clearances, and shots.",
    playstyleDescription:
      "Performs volleys with improved accuracy and has access to acrobatic volley animations.",
    playstylePlusDescription:
      "Performs volleys with significant accuracy and has access to unique acrobatic volley animations.",
  },
  27: {
    name: "Aerial",
    categoryId: 5,
    category: "Physical",
    whoHasIt:
      "A player who is known for having a high success rate winning aerial battles in both offence and defence.",
    playstyleDescription:
      "Performs higher jumps and has improved aerial physical presence.",
    playstylePlusDescription:
      "Performs even higher jumps and has greatly improved aerial physical presence.",
  },
  13: {
    name: "Anticipate",
    categoryId: 4,
    category: "Defending",
    whoHasIt:
      "A player who is known for having a high success rate getting ball possession on tackles with a low fouling rate.",
    playstyleDescription:
      "Improved chances of standing tackle success and grants the ability to stop the ball directly at their feet when performing a standing tackle.",
    playstylePlusDescription:
      "Significantly improved chances of standing tackle success and grants the ability to stop the ball directly at their feet when performing a standing tackle.",
  },
  11: {
    name: "Block",
    categoryId: 4,
    category: "Defending",
    whoHasIt:
      "A player who is known for performing elastic and overreaching blocks.",
    playstyleDescription:
      "Increased reach when performing blocks and improved ability to make a successful block.",
    playstylePlusDescription:
      "Even greater reach when performing blocks and improved ability to make a successful block.",
  },
  15: {
    name: "Bruiser",
    categoryId: 4,
    category: "Defending",
    whoHasIt:
      "A player who is known for winning possession by physical imposition.",
    playstyleDescription: "Greater strength when performing physical tackles.",
    playstylePlusDescription:
      "Even greater strength when performing physical tackles.",
  },
  1: {
    name: "Chip Shot",
    categoryId: 1,
    category: "Scoring",
    whoHasIt:
      "A player who is known to often try to chip the goalkeeper when shooting at goal.",
    playstyleDescription:
      "Performs chip shots faster and with greater accuracy.",
    playstylePlusDescription:
      "Performs chip shots more quickly with exceptional accuracy.",
  },
  30: {
    name: "Cross Claimer",
    categoryId: 6,
    category: "Goalkeeping",
    whoHasIt:
      "A goalkeeper who is known to often come off the line to claim high balls from dangerous areas.",
    playstyleDescription:
      "Comes out to claim crosses with increased pace, increased awareness of the ball trajectory, and further punch reach with increased power.",
    playstylePlusDescription:
      "Comes out to claim crosses with greater pace, greater awareness of the ball trajectory, increased punch reach with greater power.",
  },
  3: {
    name: "Dead Ball",
    categoryId: 1,
    category: "Scoring",
    whoHasIt:
      "A player who is known for being a specialist at taking set pieces.",
    playstyleDescription:
      "Set pieces are delivered with increased speed, curve, and accuracy. Ball trajectory preview line is longer.",
    playstylePlusDescription:
      "Set pieces are delivered with exceptional speed, curve, and accuracy. Ball trajectory preview line is at maximum length.",
  },
  33: {
    name: "Deflector",
    categoryId: 6,
    category: "Goalkeeping",
    whoHasIt:
      "A goalkeeper who is known for having great deflection control to safer spaces.",
    playstyleDescription:
      "Performs deflection saves into safer areas with increased ball speed control.",
    playstylePlusDescription:
      "Performs deflection saves into safer areas or towards free teammates with greater ball speed control.",
  },
  32: {
    name: "Far Reach",
    categoryId: 6,
    category: "Goalkeeping",
    whoHasIt:
      "A goalkeeper who is known for the ability to cover the net and extend their reach to save challenging shots.",
    playstyleDescription:
      "Performs diving saves with improved reach and has access to extended reach animations.",
    playstylePlusDescription:
      "Performs diving saves with greater reach and has access to extended reach animations.",
  },
  28: {
    name: "Far Throw",
    categoryId: 6,
    category: "Goalkeeping",
    whoHasIt:
      "A goalkeeper who is known for starting counter attacks with long throws.",
    playstyleDescription:
      "Able to perform throws with increased speed and distance.",
    playstylePlusDescription:
      "Able to perform throws with greater speed and distance.",
  },
  0: {
    name: "Finesse Shot",
    categoryId: 1,
    category: "Scoring",
    whoHasIt:
      "A player who is known to try and place the ball when shooting at goal.",
    playstyleDescription:
      "Performs finesse shots faster with additional curve and improved accuracy.",
    playstylePlusDescription:
      "Performs finesse shots significantly faster with maximum curve and exceptional accuracy.",
  },
  19: {
    name: "First Touch",
    categoryId: 3,
    category: "Ball Control",
    whoHasIt:
      "A player who is known for accurate first touch control in difficult situations.",
    playstyleDescription:
      "Has reduced error when trapping the ball and is able to transition to dribbling faster with greater control.",
    playstylePlusDescription:
      "Has minimal error when trapping the ball and is able to transition to dribbling much faster with greater control.",
  },
  18: {
    name: "Flair",
    categoryId: 3,
    category: "Ball Control",
    whoHasIt:
      "A player who is known to try flamboyant moves (traps, passes, and shots).",
    playstyleDescription:
      "Fancy passes and shots are performed with improved accuracy. Performs Flair animations when contextually appropriate.",
    playstylePlusDescription:
      "Fancy passes and shots are performed with even greater accuracy. Performs Flair animations when contextually appropriate.",
  },
  29: {
    name: "Footwork",
    categoryId: 6,
    category: "Goalkeeping",
    whoHasIt:
      "A goalkeeper who is known for using their feet to make difficult saves.",
    playstyleDescription: "Performs foot saves faster and with extended reach.",
    playstylePlusDescription:
      "Performs foot saves more quickly with even greater reach.",
  },
  5: {
    name: "Incisive Pass",
    categoryId: 2,
    category: "Passing",
    whoHasIt:
      "A player who is known for making defence splitting passes for a teammate to run onto.",
    playstyleDescription:
      "Through Passes are more accurate, Swerve Passes are delivered with more curve, and Precision Passes travel faster to the destination.",
    playstylePlusDescription:
      "Through Passes are far more accurate, Swerve Passes are delivered with maximum curve, and Precision Passes travel at top speed to the destination.",
  },
  12: {
    name: "Intercept",
    categoryId: 4,
    category: "Defending",
    whoHasIt:
      "A player who is known for performing interceptions and keeping ball possession.",
    playstyleDescription:
      "Increased reach and improved chances of retaining possession of the ball when performing interceptions.",
    playstylePlusDescription:
      "Even greater reach and improved chances of retaining possession of the ball when performing interceptions.",
  },
  10: {
    name: "Jockey",
    categoryId: 4,
    category: "Defending",
    whoHasIt: "A player who is known for being successful in 1v1 situations.",
    playstyleDescription:
      "Increased max speed of Sprint Jockey and improved transition speed from jockey to sprint.",
    playstylePlusDescription:
      "Increased max speed of Sprint Jockey and greatly improves transition speed from jockey to sprint.",
  },
  7: {
    name: "Long Ball Pass",
    categoryId: 2,
    category: "Passing",
    whoHasIt:
      "A player who is known for performing lobbed long passes to teammates.",
    playstyleDescription:
      "Lob and Lofted Through Passes are more accurate, travel faster and are more difficult to intercept.",
    playstylePlusDescription:
      "Lob and Lofted Through Passes are even more accurate, travel faster than ever, and are far more difficult to intercept.",
  },
  26: {
    name: "Long Throw",
    categoryId: 5,
    category: "Physical",
    whoHasIt:
      "A player who is known to throw the ball further than the average player.",
    playstyleDescription:
      "Performs throw-ins with increased power to cover a greater distance.",
    playstylePlusDescription:
      "Performs throw-ins with more power to cover maximum distance.",
  },
  6: {
    name: "Pinged Pass",
    categoryId: 2,
    category: "Passing",
    whoHasIt: "A player who is known for making high speed ground passes.",
    playstyleDescription:
      "Passes travel faster along the ground without impacting the trapping difficulty of the receiver.",
    playstylePlusDescription:
      "Passes travel much faster along the ground without impacting the trapping difficulty of the receiver.",
  },
  4: {
    name: "Power Header",
    categoryId: 1,
    category: "Scoring",
    whoHasIt:
      "A player who is known to strike with power when heading towards goal.",
    playstyleDescription: "Performs headers with increased power and accuracy.",
    playstylePlusDescription:
      "Performs headers with maximum power and accuracy.",
  },
  2: {
    name: "Power Shot",
    categoryId: 1,
    category: "Scoring",
    whoHasIt:
      "A player who is known for taking powerful shots from outside the box.",
    playstyleDescription:
      "Performs power shots faster and with increased speed.",
    playstylePlusDescription:
      "Performs power shots much faster and with a significant increase in speed.",
  },
  21: {
    name: "Press Proven",
    categoryId: 3,
    category: "Ball Control",
    whoHasIt:
      "A player who is known for keeping ball possession under physical pressure from the opponent.",
    playstyleDescription:
      "Keeps close control of the ball while dribbling at jog speed and can shield the ball more effectively from stronger opponents.",
    playstylePlusDescription:
      "Keeps exceptionally close control of the ball while dribbling at jog speed. Can shield the ball much more effectively from stronger opponents.",
  },
  22: {
    name: "Quick Step",
    categoryId: 5,
    category: "Physical",
    whoHasIt:
      "A player who is known to have a quick burst of speed when accelerating on and off the ball.",
    playstyleDescription: "Accelerates faster during Explosive Sprint.",
    playstylePlusDescription:
      "Accelerates significantly faster during Explosive Sprint.",
  },
  17: {
    name: "Rapid",
    categoryId: 3,
    category: "Ball Control",
    whoHasIt:
      "A player who is known to use speed and knock the ball ahead of their opponent to beat them whilst dribbling.",
    playstyleDescription:
      "Reaches a higher sprint speed while dribbling and has reduced chance of an error when sprinting or performing knock-ons.",
    playstylePlusDescription:
      "Reaches even higher sprint speed while dribbling and has greatly reduced chance of an error when sprinting or performing knock-ons.",
  },
  23: {
    name: "Relentless",
    categoryId: 5,
    category: "Physical",
    whoHasIt:
      "A player who is known for covering a greater area of the field compared to other players in the same position.",
    playstyleDescription:
      "Reduces fatigue loss during play and increases fatigue recovery during half time.",
    playstylePlusDescription:
      "Greatly reduces the long term fatigue effects on attributes, reaction time, and defensive awareness. Reduces fatigue loss during play and significantly increases fatigue recovery during half time.",
  },
  31: {
    name: "Rush Out",
    categoryId: 6,
    category: "Goalkeeping",
    whoHasIt:
      "A goalkeeper who is known to often challenge attackers head-on in 1v1 situations.",
    playstyleDescription:
      "Rush speed is increased and has an improved reaction speed to shots in rushing situations.",
    playstylePlusDescription:
      "Rush speed is greatly increased and has a faster reaction speed to shots in rushing situations.",
  },
  14: {
    name: "Slide Tackle",
    categoryId: 4,
    category: "Defending",
    whoHasIt: "A player who is known for often performing slide tackles.",
    playstyleDescription:
      "Grants the ability to stop the ball directly at their feet when performing a slide tackle.",
    playstylePlusDescription:
      "Greatly improved slide tackle coverage. Also grants the ability to stop the ball directly at their feet when performing a slide tackle.",
  },
  16: {
    name: "Technical",
    categoryId: 3,
    category: "Ball Control",
    whoHasIt:
      "A player who regularly tries to beat an opponent by using technical dribbling ability (with little to no use of skill moves or little to no physical contact).",
    playstyleDescription:
      "Reaches a higher speed when performing Controlled Sprint and performs wide turns while dribbling with more precision.",
    playstylePlusDescription:
      "Reaches even higher speed when performing Controlled Sprint and performs wide turns while dribbling with greater precision.",
  },
  8: {
    name: "Tiki Taka",
    categoryId: 2,
    category: "Passing",
    whoHasIt:
      "A player who is known for making first-time accurate and short passes.",
    playstyleDescription:
      "Executes difficult first-time Ground Passes with high accuracy, using backheels when contextually appropriate. Short distance Ground Passes are highly accurate.",
    playstylePlusDescription:
      "Executes difficult first-time Ground Passes with even greater accuracy, using backheels when contextually appropriate. Short distance Ground Passes are exceptionally accurate.",
  },
  20: {
    name: "Trickster",
    categoryId: 3,
    category: "Ball Control",
    whoHasIt:
      "A player who is known for being able to perform skill moves in 1v1 situations.",
    playstyleDescription:
      "Grants the ability to perform unique flick Skill Moves.",
    playstylePlusDescription:
      "Grants the ability to perform more unique ground and flick Skill Moves. Is significantly more agile when strafe dribbling.",
  },
  24: {
    name: "Trivela",
    categoryId: 5,
    category: "Physical",
    whoHasIt:
      "A player who is known for passing, crossing and shooting with the outside of the foot.",
    playstyleDescription:
      'Contextually triggers "outside of the foot" passes and shots.',
    playstylePlusDescription:
      'Contextually triggers "outside of the foot" passes and shots. Reduced error on "outside the foot" passes.',
  },
  9: {
    name: "Whipped Pass",
    categoryId: 2,
    category: "Passing",
    whoHasIt:
      "A player who is known for making high speed whipped crosses into the box.",
    playstyleDescription:
      "All crosses are highly accurate, travel faster and with more curve.",
    playstylePlusDescription:
      "All crosses are highly accurate, travel faster and with more curve. Performs driven crosses with exceptional power.",
  },
};

export const playstyleUpgradeToIdMapping = {
  FINISHING_FINESSE_SHOT: 0,
  FINISHING_CHIP_SHOT: 1,
  FINISHING_POWER_SHOT: 2,
  FINISHING_FK_SPECIALIST: 3,
  FINISHING_POWER_HEADER: 4,
  PASSING_PASS_INTO_SPACE: 5,
  PASSING_BULLET_PASSES: 6,
  PASSING_LOB_PASS_MASTER: 7,
  PASSING_TIKI_TAKA_MASTER: 8,
  PASSING_WHIPPED_CROSSES: 9,
  DEFENDING_FAST_JOCKEY: 10,
  DEFENDING_BRICK_WALL: 11,
  DEFENDING_INTERCEPTOR: 12,
  DEFENDING_TACKLE_VISION: 13,
  DEFENDING_SLIDE_TACKLER: 14,
  DEFENDING_BRUISER: 15,
  BALL_CONTROL_TECHNICAL_DRIBBLER: 16,
  BALL_CONTROL_SPEED_DRIBBLER: 17,
  BALL_CONTROL_FLAIR: 18,
  BALL_CONTROL_TRAP_MASTER: 19,
  BALL_CONTROL_TRICKSTER: 20,
  BALL_CONTROL_POSSESSION_HOLDER: 21,
  PHYSICAL_EXPLOSIVE_SPRINT_BOOST: 22,
  PHYSICAL_RELENTLESS: 23,
  PHYSICAL_OUTSIDE_FOOT: 24,
  PHYSICAL_ACROBATIC: 25,
  PHYSICAL_THROW_IN_SPECIALIST: 26,
  PHYSICAL_AERIAL_MASTER: 27,
  GOAL_KEEPER_LONG_THROWER: 28,
  GOAL_KEEPER_SAVE_WITH_FOOT: 29,
  GOAL_KEEPER_COMES_FOR_CROSSES: 30,
  GOAL_KEEPER_RUSHES_OUT_OF_GOAL: 31,
  GOAL_KEEPER_FAR_REACH: 32,
  GOAL_KEEPER_DEFLECTOR: 33,
};

export const roleUpgradeToIdMapping = {
  GK_GOALKEEPER: 1,
  GK_SWEEPER_KEEPER: 2,
  RB_FULLBACK: 3,
  RB_FALSEBACK: 4,
  RB_WINGBACK: 5,
  RB_OFFENSIVE_WINGBACK: 6,
  LB_FULLBACK: 7,
  LB_FALSEBACK: 8,
  LB_WINGBACK: 9,
  LB_OFFENSIVE_WINGBACK: 10,
  CB_DEFENDER: 11,
  CB_STOPPER: 12,
  CB_BALL_PLAYING_DEFENDER: 13,
  CDM_HOLDING: 14,
  CDM_CENTRE_HALF: 15,
  CDM_DEEP_LYING_PLAYMAKER: 16,
  CM_BOX_TO_BOX: 18,
  CM_HOLDING: 19,
  CM_DEEP_LYING_PLAYMAKER: 20,
  CM_PLAYMAKER: 21,
  CM_HALF_WINGER: 22,
  RM_WINGER: 23,
  RM_WIDE_MIDFIELDER: 24,
  RM_WIDE_PLAYMAKER: 25,
  RM_INSIDE_FORWARD: 26,
  LM_WINGER: 27,
  LM_WIDE_MIDFIELDER: 28,
  LM_WIDE_PLAYMAKER: 29,
  LM_INSIDE_FORWARD: 30,
  CAM_PLAYMAKER: 31,
  CAM_SHADOW_STRIKER: 32,
  CAM_HALF_WINGER: 33,
  RW_WINGER: 35,
  RW_INSIDE_FORWARD: 36,
  RW_WIDE_PLAYMAKER: 37,
  LW_WINGER: 38,
  LW_INSIDE_FORWARD: 39,
  LW_WIDE_PLAYMAKER: 40,
  ST_ADVANCE_FORWARD: 41,
  ST_POACHER: 42,
  ST_FALSE_9: 43,
  ST_TARGET_FORWARD: 44,
};

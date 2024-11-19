import React from "react";
import {
  AcademyStatEnum,
  EVO_STAT_INDEX_MAP,
  IN_GAME_STATS,
  playstyleUpgradeToIdMapping,
  roleUpgradeToIdMapping,
  STAT_INDEX_MAP,
} from "../utils/constants";
import { buildDynamicUrl, getRarityName } from "../utils/utils";

export const RatingComponent = ({ value }) => {
  return <div className="text-green-500 text-center">+{value}</div>;
};

export const RarityComponent = ({ value }) => {
  return (
    <div className="text-green-500 text-center">{getRarityName(value)}</div>
  );
};

export const PaceComponent = ({ value }) => {
  return <div className="text-green-500 text-center">+{value}</div>;
};

export const ShootingComponent = ({ value }) => {
  return <div className="text-green-500 text-center">+{value}</div>;
};

export const PassingComponent = ({ value }) => {
  return <div className="text-green-500 text-center">+{value}</div>;
};

export const DribblingComponent = ({ value }) => {
  return <div className="text-green-500 text-center">+{value}</div>;
};

export const DefendingComponent = ({ value }) => {
  return <div className="text-green-500 text-center">+{value}</div>;
};

export const PhysicalityComponent = ({ value }) => {
  return <div className="text-green-500 text-center">+{value}</div>;
};

export const SubAttributeComponent = ({ value }) => {
  return <div className="text-green-500 text-center">+{value}</div>;
};

export const SkillMovesComponent = ({ value }) => {
  return <div className="text-green-500 text-center">+{value}</div>;
};

export const WeakFootComponent = ({ value }) => {
  return <div className="text-green-500 text-center">+{value}</div>;
};

export const PositionComponent = ({ value }) => {
  return <div className="text-green-500 text-center">{value}</div>;
};

export const TraitComponent = ({ value }) => {
  const playstyleUpgrade = AcademyStatEnum[value];
  const traidId = playstyleUpgradeToIdMapping[playstyleUpgrade];
  return (
    <div className="relative">
      <svg
        class="!w-[2.5em] !h-[2.5em] svg-container svg-icon svg-icon--size-sm"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
      >
        <path
          d="M12.813,104.953L68.157,21.862H188.143l55.045,83.091L128,235.138Z"
          fill-opacity="1"
          stroke="#ffffff"
          stroke-linejoin="round"
          stroke-width="8"
          fill="#ffffff"
        ></path>
      </svg>
      <img
        className="w-[35px] h-[35px] absolute left-[2px] top-0"
        src={buildDynamicUrl("playstyle", traidId)}
        alt="trait"
      />
    </div>
  );
};

export const RolesComponent = ({ value, count }) => {
  const roleUpgrade = AcademyStatEnum[value];
  const [position, ...roleParts] = roleUpgrade.split("_");
  const role = roleParts
    .join(" ")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());

  return (
    <div className="flex items-center text-xs border  px-1 rounded shadow-sm bg-gray-800 text-white">
      <div className="font-bold text-xs">{position}</div>
      <div className="mx-2">|</div>
      <div className="">
        {role} <span>{count === 3 ? "++" : "+"}</span>{" "}
      </div>
    </div>
  );
};

export const CustomizationRewardComponent = ({ value }) => {
  return <div>{value}</div>;
};

export const UnknownComponent = ({ value }) => {
  return <div>{value}</div>;
};
export const mapAttributeIdToLocString = (attributeId) => {
  switch (attributeId) {
    case "OVR":
      return "rating";
    case "RARITY":
      return "rarity";
    case "PACE":
      return "pace";
    case "SHOOTING":
      return "shooting";
    case "PASSING":
      return "passing";
    case "DRIBBLING_MAIN":
      return "dribbling";
    case "DEFENSE":
      return "defending";
    case "PHYSICALITY":
      return "physicality";
    case "ACCELERATION":
    case "SPRINT_SPEED":
    case "AGILITY":
    case "BALANCE":
    case "JUMPING":
    case "STAMINA":
    case "STRENGTH":
    case "REACTIONS":
    case "AGGRESSION":
    case "COMPOSURE":
    case "INTERCEPTIONS":
    case "POSITIONING":
    case "VISION":
    case "BALL_CONTROL":
    case "CROSSING":
    case "DRIBBLING_SUB":
    case "FINISHING":
    case "FK_ACC":
    case "HEADING_ACC":
    case "LONG_PASSING":
    case "SHORT_PASSING":
    case "DEF_AWARENESS":
    case "SHOT_POWER":
    case "LONG_SHOTS":
    case "STANDING_TACKLE":
    case "SLIDING_TACKLE":
    case "VOLLEYS":
    case "CURVE":
    case "PENALTIES":
      return "subattribute";
    case "SKILL_MOVES":
      return "skillmoves";
    case "WEAK_FOOT":
      return "weakfoot";
    case "CB":
    case "RB":
    case "RWB":
    case "LB":
    case "LWB":
    case "CDM":
    case "CM":
    case "CAM":
    case "LM":
    case "RM":
    case "LW":
    case "RW":
    case "ST":
    case "CF":
      return "position";
    case "FINISHING_FINESSE_SHOT":
    case "FINISHING_CHIP_SHOT":
    case "FINISHING_POWER_SHOT":
    case "FINISHING_FK_SPECIALIST":
    case "FINISHING_POWER_HEADER":
    case "PASSING_PASS_INTO_SPACE":
    case "PASSING_BULLET_PASSES":
    case "PASSING_LOB_PASS_MASTER":
    case "PASSING_TIKI_TAKA_MASTER":
    case "PASSING_WHIPPED_CROSSES":
    case "DEFENDING_FAST_JOCKEY":
    case "DEFENDING_BRICK_WALL":
    case "DEFENDING_INTERCEPTOR":
    case "DEFENDING_TACKLE_VISION":
    case "DEFENDING_SLIDE_TACKLER":
    case "DEFENDING_BRUISER":
    case "BALL_CONTROL_TECHNICAL_DRIBBLER":
    case "BALL_CONTROL_SPEED_DRIBBLER":
    case "BALL_CONTROL_FLAIR":
    case "BALL_CONTROL_TRAP_MASTER":
    case "BALL_CONTROL_TRICKSTER":
    case "BALL_CONTROL_POSSESSION_HOLDER":
    case "PHYSICAL_EXPLOSIVE_SPRINT_BOOST":
    case "PHYSICAL_RELENTLESS":
    case "PHYSICAL_OUTSIDE_FOOT":
    case "PHYSICAL_ACROBATIC":
    case "PHYSICAL_THROW_IN_SPECIALIST":
    case "PHYSICAL_AERIAL_MASTER":
    case "GOAL_KEEPER_LONG_THROWER":
    case "GOAL_KEEPER_SAVE_WITH_FOOT":
    case "GOAL_KEEPER_COMES_FOR_CROSSES":
    case "GOAL_KEEPER_RUSHES_OUT_OF_GOAL":
    case "GOAL_KEEPER_FAR_REACH":
    case "GOAL_KEEPER_DEFLECTOR":
      return "trait";
    case "GK_GOALKEEPER":
    case "GK_SWEEPER_KEEPER":
    case "RB_FULLBACK":
    case "RB_FALSEBACK":
    case "RB_WINGBACK":
    case "RB_OFFENSIVE_WINGBACK":
    case "LB_FULLBACK":
    case "LB_FALSEBACK":
    case "LB_WINGBACK":
    case "LB_OFFENSIVE_WINGBACK":
    case "CB_DEFENDER":
    case "CB_STOPPER":
    case "CB_BALL_PLAYING_DEFENDER":
    case "CDM_HOLDING":
    case "CDM_CENTRE_HALF":
    case "CDM_DEEP_LYING_PLAYMAKER":
    case "CDM_PLR1":
    case "CM_BOX_TO_BOX":
    case "CM_HOLDING":
    case "CM_DEEP_LYING_PLAYMAKER":
    case "CM_PLAYMAKER":
    case "CM_HALF_WINGER":
    case "RM_WINGER":
    case "RM_WIDE_MIDFIELDER":
    case "RM_WIDE_PLAYMAKER":
    case "RM_INSIDE_FORWARD":
    case "LM_WINGER":
    case "LM_WIDE_MIDFIELDER":
    case "LM_WIDE_PLAYMAKER":
    case "LM_INSIDE_FORWARD":
    case "CAM_PLAYMAKER":
    case "CAM_SHADOW_STRIKER":
    case "CAM_HALF_WINGER":
    case "CAM_PLR2":
    case "RW_WINGER":
    case "RW_INSIDE_FORWARD":
    case "RW_WIDE_PLAYMAKER":
    case "LW_WINGER":
    case "LW_INSIDE_FORWARD":
    case "LW_WIDE_PLAYMAKER":
    case "ST_ADVANCE_FORWARD":
    case "ST_POACHER":
    case "ST_FALSE_9":
    case "ST_TARGET_FORWARD":
      return "roles";
    case "COSMETIC_UPGRADE":
      return "Customization Reward";
    default:
      console.error("Unrecognized academy stat enum:", attributeId);
      return "Unknown";
  }
};

const processLevels = (levels) => {
  const levelsUpgradeData = [];

  levels.forEach((level) => {
    const levelUpgrades = [];

    level.awards.forEach((award) => {
      const attributeName = AcademyStatEnum[award.value];
      const attributeType = mapAttributeIdToLocString(attributeName);
      const count = award.count;

      levelUpgrades.push({
        attributeName,
        attributeType,
        count,
        value: award.value,
        maxValue: award.maxValue,
      });
    });

    levelsUpgradeData.push({
      level: level.level,
      upgrades: levelUpgrades,
    });
  });

  return levelsUpgradeData;
};

export function applyUpgradesToPlayer(player, upgrades, currentLevel, evoId) {
  const updatedPlayer = JSON.parse(JSON.stringify(player));

  upgrades.forEach((upgrade) => {
    const { attributeType, attributeName, count } = upgrade;
    let { maxValue } = upgrade;
    if (attributeType === "rarity") {
      updatedPlayer["rarity"] = count;
    } else if (attributeType === "rating") {
      let newRating = updatedPlayer["rating"] + count;
      if (maxValue !== undefined && maxValue !== null) {
        newRating = Math.min(newRating, maxValue);
        updatedPlayer["rating"] = Math.max(newRating, updatedPlayer["rating"]);
      } else {
        updatedPlayer["rating"] = newRating;
      }
    } else if (attributeType === "pace") {
      const idx = 0;
      let newValue = updatedPlayer["attributes"][idx] + count;
      if (maxValue !== undefined && maxValue !== null) {
        newValue = Math.min(newValue, maxValue);
        updatedPlayer["attributes"][idx] = Math.max(
          newValue,
          updatedPlayer["attributes"][idx]
        );
      } else {
        updatedPlayer["attributes"][idx] = newValue;
      }
    } else if (attributeType === "shooting") {
      const idx = 1;
      let newValue = updatedPlayer["attributes"][idx] + count;
      if (maxValue !== undefined && maxValue !== null) {
        newValue = Math.min(newValue, maxValue);
        updatedPlayer["attributes"][idx] = Math.max(
          newValue,
          updatedPlayer["attributes"][idx]
        );
      } else {
        updatedPlayer["attributes"][idx] = newValue;
      }
    } else if (attributeType === "passing") {
      const idx = 2;
      let newValue = updatedPlayer["attributes"][idx] + count;
      if (maxValue !== undefined && maxValue !== null) {
        newValue = Math.min(newValue, maxValue);
        updatedPlayer["attributes"][idx] = Math.max(
          newValue,
          updatedPlayer["attributes"][idx]
        );
      } else {
        updatedPlayer["attributes"][idx] = newValue;
      }
    } else if (attributeType === "dribbling") {
      const idx = 3;
      let newValue = updatedPlayer["attributes"][idx] + count;
      if (maxValue !== undefined && maxValue !== null) {
        newValue = Math.min(newValue, maxValue);
        updatedPlayer["attributes"][idx] = Math.max(
          newValue,
          updatedPlayer["attributes"][idx]
        );
      } else {
        updatedPlayer["attributes"][idx] = newValue;
      }
    } else if (attributeType === "defending") {
      const idx = 4;
      let newValue = updatedPlayer["attributes"][idx] + count;
      if (maxValue !== undefined && maxValue !== null) {
        newValue = Math.min(newValue, maxValue);
        updatedPlayer["attributes"][idx] = Math.max(
          newValue,
          updatedPlayer["attributes"][idx]
        );
      } else {
        updatedPlayer["attributes"][idx] = newValue;
      }
    } else if (attributeType === "physicality") {
      const idx = 5;
      let newValue = updatedPlayer["attributes"][idx] + count;
      if (maxValue !== undefined && maxValue !== null) {
        newValue = Math.min(newValue, maxValue);
        updatedPlayer["attributes"][idx] = Math.max(
          newValue,
          updatedPlayer["attributes"][idx]
        );
      } else {
        updatedPlayer["attributes"][idx] = newValue;
      }
    } else if (attributeType === "subattribute") {
      const idx = EVO_STAT_INDEX_MAP[attributeName];
      if (idx !== undefined) {
        let newValue = updatedPlayer["stats"][idx] + count;
        if (maxValue !== undefined && maxValue !== null) {
          newValue = Math.min(newValue, maxValue);
          updatedPlayer["stats"][idx] = Math.max(
            newValue,
            updatedPlayer["stats"][idx]
          );
        } else {
          updatedPlayer["stats"][idx] = newValue;
        }
      } else {
        console.log("Unknown subattribute:", attributeName);
      }
    } else if (attributeType === "skillmoves") {
      let newValue = (updatedPlayer["skill_moves"] || 0) + count;
      maxValue = maxValue || 4;
      maxValue += 1;
      if (maxValue !== undefined && maxValue !== null) {
        newValue = Math.min(newValue, maxValue);
        updatedPlayer["skill_moves"] = Math.max(
          newValue,
          updatedPlayer["skill_moves"]
        );
      } else {
        updatedPlayer["skill_moves"] = newValue;
      }
    } else if (attributeType === "weakfoot") {
      let newValue = (updatedPlayer["weak_foot"] || 0) + count;
      if (maxValue !== undefined && maxValue !== null) {
        newValue = Math.min(newValue, maxValue);
        updatedPlayer["weak_foot"] = Math.max(
          newValue,
          updatedPlayer["weak_foot"]
        );
      } else {
        updatedPlayer["weak_foot"] = newValue;
      }
    } else if (attributeType === "position") {
      if (!updatedPlayer["position"].includes(attributeName)) {
        updatedPlayer["position"].push(attributeName);
      }
    } else if (attributeType === "trait") {
      const traitId = playstyleUpgradeToIdMapping[attributeName];
      if (count === 1) {
        if (!updatedPlayer["playstyles"].includes(traitId)) {
          updatedPlayer["playstyles"].push(traitId);
        }
      } else {
        const existing_traits_count = updatedPlayer["playstyle_plus"]?.length;
        if (
          maxValue !== null &&
          maxValue !== undefined &&
          existing_traits_count >= maxValue
        ) {
        } else {
          if (!updatedPlayer["playstyle_plus"].includes(traitId)) {
            updatedPlayer["playstyle_plus"].push(traitId);
          }
        }
      }
    } else if (attributeType === "roles") {
      const roleId = roleUpgradeToIdMapping[attributeName];
      if (count === 2) {
        if (!updatedPlayer["plusroles"].includes(roleId)) {
          updatedPlayer["plusroles"].push(roleId);
        }
      } else if (count === 3) {
        if (!updatedPlayer["plusplusroles"].includes(roleId)) {
          updatedPlayer["plusplusroles"].push(roleId);
        }
      } else {
        console.log("Unknown count for roles:", count);
      }
    } else {
      console.log("Unhandled attribute type:", attributeType);
    }
  });

  updatedPlayer.evo_level = currentLevel;
  updatedPlayer.evo_id = evoId;
  updatedPlayer.previous_evolved_id = player.id;

  return updatedPlayer;
}

export function calculateStatDifference(player1, player2) {
  const statDifference = [];

  // Calculate differences for attributes
  for (let i = 0; i < player1.attributes.length; i++) {
    statDifference.push(player2.attributes[i] - player1.attributes[i]);
  }

  // Calculate differences for rating, skill_moves, and weak_foot
  statDifference.push(
    player2.rating - player1.rating,
    (player2.skill_moves || 0) - (player1.skill_moves || 0),
    (player2.weak_foot || 0) - (player1.weak_foot || 0)
  );

  return statDifference;
}
export const generateIntermediatePlayers = (
  basePlayer,
  levelsUpgradeData,
  evoId
) => {
  const players = [];
  let cumulativeUpgrades = [];
  let previousPlayer = basePlayer;

  levelsUpgradeData?.levelsData?.slice(1).forEach((levelData) => {
    const { level, awards } = levelData;

    // Add current level's upgrades to cumulative upgrades
    cumulativeUpgrades = cumulativeUpgrades.concat(awards);

    // Apply cumulative upgrades
    let currentPlayer = applyUpgradesToPlayer(
      basePlayer,
      cumulativeUpgrades,
      level,
      evoId
    );
    currentPlayer = adjustPlayerAttributes(currentPlayer);

    const statDifference = calculateStatDifference(
      previousPlayer,
      currentPlayer
    );

    currentPlayer.statDifference = statDifference;

    players.push(currentPlayer);
    previousPlayer = currentPlayer;
  });

  return players;
};
export function adjustPlayerAttributes(player) {
  // Copy the player to avoid modifying the original
  const updatedPlayer = JSON.parse(JSON.stringify(player));
  updatedPlayer.attributes = [...player.attributes];
  updatedPlayer.stats = [...player.stats];

  const attributeMap = {
    pace: 0,
    shooting: 1,
    passing: 2,
    dribbling: 3,
    defending: 4,
    physicality: 5,
  };

  for (const [attributeName, subattributes] of Object.entries(IN_GAME_STATS)) {
    const idxAttribute = attributeMap[attributeName];
    const attributeValue = updatedPlayer.attributes[idxAttribute];

    // Calculate weighted sum of subattributes
    let calculatedValue = 0;
    for (const [_, idxSubattr, weight] of subattributes) {
      const subattrValue = updatedPlayer.stats[idxSubattr];
      calculatedValue += subattrValue * weight;
    }
    calculatedValue = Math.round(calculatedValue);

    if (attributeValue > calculatedValue) {
      // Increase subattributes to match attributeValue
      const diff = attributeValue - calculatedValue;
      const totalWeight = subattributes.reduce(
        (sum, [_, __, weight]) => sum + weight,
        0
      );
      const deltas = subattributes.map(([_, idxSubattr, weight]) => {
        const delta = (weight / totalWeight) * diff;
        return { idxSubattr, delta };
      });
      let totalDelta = 0;
      const intDeltas = deltas.map(({ idxSubattr, delta }) => {
        const intDelta = Math.round(delta);
        totalDelta += intDelta;
        return { idxSubattr, intDelta };
      });
      const deltaCorrection = diff - totalDelta;
      const lastIdx = intDeltas.length - 1;
      intDeltas[lastIdx].intDelta += deltaCorrection;
      intDeltas.forEach(({ idxSubattr, intDelta }) => {
        const currentValue = updatedPlayer.stats[idxSubattr];
        const newValue = Math.min(99, currentValue + intDelta);
        updatedPlayer.stats[idxSubattr] = newValue;
      });
    } else if (calculatedValue > attributeValue) {
      // Increase main attribute to match calculatedValue
      updatedPlayer.attributes[idxAttribute] = Math.min(99, calculatedValue);
    }
  }

  return updatedPlayer;
}

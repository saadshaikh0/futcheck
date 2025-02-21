import { teamChemLinks, CHEMISTRY_PROFILES } from "../utils/constants";

// Helper functions to identify Icon and Hero players
export function isIcon(player) {
  return player.teamid === 12658 || player.leagueid === 2118;
}

export function isHero(player) {
  return player.teamid === 114605;
}
export const calculateChemistry = (squad, formation, manager = null) => {
  // Build a rarity-to-profile mapping for increments
  const rarityToProfile = {};
  CHEMISTRY_PROFILES.forEach((profile) => {
    const increments = { NATION: 0, LEAGUE: 0, CLUB: 0 };
    profile.rules.forEach((mapping) => {
      const ptype = mapping.parameterType.toUpperCase();
      const val = mapping.value;
      if (increments.hasOwnProperty(ptype)) {
        increments[ptype] = val;
      }
    });
    profile.mappings.forEach((rarityId) => {
      rarityToProfile[rarityId] = increments;
    });
  });

  const chemistryPoints = {};
  const contributingPlayers = [];

  const leagueCount = {};
  const clubCount = {};
  const nationCount = {};
  const leaguesInSquad = new Set();

  const parent = {};
  const teamIdsInLinks = new Set();

  // Union-Find setup for team chemistry links
  if (teamChemLinks && teamChemLinks.length > 0) {
    teamChemLinks.forEach((item) => {
      const teamId = item.teamId;
      teamIdsInLinks.add(teamId);
      item.linkedTeams.forEach((linkedTeamId) => {
        teamIdsInLinks.add(linkedTeamId);
      });
    });

    teamIdsInLinks.forEach((teamId) => {
      parent[teamId] = teamId;
    });

    function find(teamId) {
      if (parent[teamId] !== teamId) {
        parent[teamId] = find(parent[teamId]); // Path compression
      }
      return parent[teamId];
    }

    function union(teamId1, teamId2) {
      const parent1 = find(teamId1);
      const parent2 = find(teamId2);
      if (parent1 !== parent2) {
        parent[parent1] = parent2;
      }
    }

    teamChemLinks.forEach((item) => {
      const teamId = item.teamId;
      item.linkedTeams.forEach((linkedTeamId) => {
        union(teamId, linkedTeamId);
      });
    });
  }

  function find(x) {
    return x;
  }

  const iconPlayers = [];

  // Default increments if no profile:
  // Base: NATION=+1, LEAGUE=+1, CLUB=+1
  // Hero: NATION=+1, LEAGUE=+2, CLUB=+0
  // Icon: NATION=+2, CLUB=+0 initially, later +1 to each league after all players processed

  // Iterate over the squad and formation
  for (let i = 0; i < formation.length; i++) {
    const position = formation[i];
    const player = squad[i];

    if (!player) {
      continue;
    }

    const pid = player.id;
    chemistryPoints[pid] = 0;

    if (!(player.teamid in parent)) {
      parent[player.teamid] = player.teamid;
    }

    const inPreferredPos =
      player.position && player.position.includes(position.position);

    if (inPreferredPos) {
      contributingPlayers.push(player);
      const groupId = find(player.teamid);
      leaguesInSquad.add(player.leagueid);

      const playerRarity = player.rarity;
      const profileIncrements = rarityToProfile[playerRarity] || null;

      if (profileIncrements) {
        // Use profile increments
        const n_inc = profileIncrements.NATION || 0;
        const l_inc = profileIncrements.LEAGUE || 0;
        const c_inc = profileIncrements.CLUB || 0;

        nationCount[player.nation] = (nationCount[player.nation] || 0) + n_inc;
        leagueCount[player.leagueid] =
          (leagueCount[player.leagueid] || 0) + l_inc;
        clubCount[groupId] = (clubCount[groupId] || 0) + c_inc;

        // Handle Icon league increments after processing all players
        if (isIcon(player)) {
          iconPlayers.push(player);
        }
      } else {
        // Default logic for players without a profile
        if (isIcon(player)) {
          nationCount[player.nation] = (nationCount[player.nation] || 0) + 2;
          // Club increment is zero for Icons
          iconPlayers.push(player);
        } else if (isHero(player)) {
          nationCount[player.nation] = (nationCount[player.nation] || 0) + 1;
          leagueCount[player.leagueid] =
            (leagueCount[player.leagueid] || 0) + 2;
          // Club increment is zero for Heroes
        } else {
          nationCount[player.nation] = (nationCount[player.nation] || 0) + 1;
          leagueCount[player.leagueid] =
            (leagueCount[player.leagueid] || 0) + 1;
          clubCount[groupId] = (clubCount[groupId] || 0) + 1;
        }
      }
    } else {
      // Player not in preferred position, no increments
      // chemistryPoints[pid] remains at 0
    }
  }

  // Handle Icon league increments after all players are processed
  iconPlayers.forEach((player) => {
    const playerRarity = player.rarity;
    const profileIncrements = rarityToProfile[playerRarity] || null;

    let l_inc = 1; // Default increment if not specified
    if (profileIncrements) {
      l_inc = profileIncrements.LEAGUE || 1;
    }

    leaguesInSquad.forEach((leagueId) => {
      leagueCount[leagueId] = (leagueCount[leagueId] || 0) + l_inc;
    });
  });

  // Helper functions for chemistry calculation
  function applyThresholds(count, thresholds) {
    let increment = 0;
    thresholds.forEach(([th, inc]) => {
      if (count >= th) {
        increment = inc;
      }
    });
    return increment;
  }

  // Calculate chemistry for each contributing player
  contributingPlayers.forEach((player) => {
    const pid = player.id;
    const playerLeagueId = player.leagueid;
    const playerNation = player.nation;
    const teamId = player.teamid;
    const groupId = find(teamId);

    if (isIcon(player) || isHero(player)) {
      // Icons and Heroes get full chemistry (3)
      chemistryPoints[pid] = 3;
    } else {
      // Base players' chemistry based on thresholds
      chemistryPoints[pid] = 0;
      const clubPlayers = clubCount[groupId] || 0;
      const nationPlayers = nationCount[playerNation] || 0;
      const leaguePlayers = leagueCount[playerLeagueId] || 0;

      const clubIncrement = applyThresholds(clubPlayers, [
        [2, 1],
        [4, 2],
        [7, 3],
      ]);
      const nationIncrement = applyThresholds(nationPlayers, [
        [2, 1],
        [5, 2],
        [8, 3],
      ]);
      const leagueIncrement = applyThresholds(leaguePlayers, [
        [3, 1],
        [5, 2],
        [8, 3],
      ]);

      const totalIncrement = clubIncrement + nationIncrement + leagueIncrement;
      chemistryPoints[pid] = Math.min(totalIncrement, 3);
    }

    // Manager bonus
    let managerBonusApplied = false;
    if (
      manager &&
      (playerLeagueId === manager.leagueid || playerNation === manager.nation)
    ) {
      chemistryPoints[pid] += 1;
      managerBonusApplied = true;
    }

    // Cap chemistry points
    chemistryPoints[pid] = managerBonusApplied
      ? Math.min(chemistryPoints[pid], 4)
      : Math.min(chemistryPoints[pid], 3);
  });

  // Calculate total chemistry, capped at 33
  const totalChemistry = Math.min(
    Object.values(chemistryPoints).reduce((sum, val) => sum + val, 0),
    33
  );

  return {
    totalChemistry,
    chemistryPoints,
  };
};
export const calculateRating = (squad) => {
  // Extract player ratings
  const playerRatings = squad.map((player) => player?.rating || 0);

  // Step 1: Calculate the initial average rating
  const initialAvg =
    playerRatings.reduce((sum, rating) => sum + rating, 0) /
    playerRatings.length;

  // Step 2: Adjust ratings for players above the average
  const adjustedRatings = playerRatings.map((rating) => {
    return rating > initialAvg ? rating + (rating - initialAvg) : rating;
  });

  // Step 3: Recalculate the average rating with adjusted values
  const newAvg =
    adjustedRatings.reduce((sum, rating) => sum + rating, 0) /
    adjustedRatings.length;

  // Step 4: Apply rounding rules for final squad rating
  const newAvgRounded = Math.round(newAvg * 100) / 100; // Round to 2 decimal places
  const decimalPart = newAvgRounded - Math.round(newAvgRounded);
  const finalRating =
    decimalPart < 0.96
      ? Math.round(newAvgRounded)
      : Math.round(newAvgRounded) + 1;

  return finalRating;
};

export const getChemistryPoints = (
  player,
  selectedPositionIndex,
  players,
  positions
) => {
  // Create a copy of the players array and replace the player at the selectedPositionIndex
  const updatedPlayers = [...players];
  updatedPlayers[selectedPositionIndex] = player;

  // Calculate chemistry with the updated players array
  const { chemistryPoints } = calculateChemistry(updatedPlayers, positions);

  return chemistryPoints[player.id] || 0;
};
export const formatNumber = (num) => {
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "M";
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "K";
  } else {
    return num.toString();
  }
};

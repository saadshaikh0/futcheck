export const calculateChemistry = (squad, formation, manager) => {
  // Mapping of rarity IDs to names
  const RARITY_ID_TO_NAME = {
    12: "Icon",
    72: "Hero",
    // Add other rarity IDs as needed
  };

  // Initialize chemistry points for each player
  const chemistryPoints = {};

  // Arrays to hold players who can contribute to chemistry
  const contributingPlayers = [];

  // Count occurrences of club, league, and nation
  const leagueCount = {};
  const clubCount = {};
  const nationCount = {};

  // Collect all leagues in the squad for Icon calculations
  const leaguesInSquad = new Set();

  // Iterate over the players and their positions
  for (let i = 0; i < formation.length; i++) {
    const player = squad[i];
    const position = formation[i].position;

    if (player && player.position && player.position.includes(position)) {
      // Player is assigned to a position they can play
      chemistryPoints[player.id] = 0;
      contributingPlayers.push(player);

      const rarityName = RARITY_ID_TO_NAME[player.rarity];

      // Update counts based on rarity
      if (rarityName === "Hero") {
        // Heroes count normally towards league and club, double towards nation
        leagueCount[player.leagueid] = (leagueCount[player.leagueid] || 0) + 2;
        clubCount[player.teamid] = (clubCount[player.teamid] || 0) + 1;
        nationCount[player.nation] = (nationCount[player.nation] || 0) + 1; // Double count for nation
        leaguesInSquad.add(player.leagueid);
      } else if (rarityName === "Icon") {
        // Icons count normally towards nation and club
        nationCount[player.nation] = (nationCount[player.nation] || 0) + 2;
        clubCount[player.teamid] = (clubCount[player.teamid] || 0) + 1;
        // Collect leagues for later double counting
        leaguesInSquad.add(player.leagueid);
      } else {
        // Regular players
        leagueCount[player.leagueid] = (leagueCount[player.leagueid] || 0) + 1;
        clubCount[player.teamid] = (clubCount[player.teamid] || 0) + 1;
        nationCount[player.nation] = (nationCount[player.nation] || 0) + 1;
        leaguesInSquad.add(player.leagueid);
      }
    } else if (player) {
      // Player is assigned to a position they cannot play
      chemistryPoints[player.id] = 0; // No chemistry contribution
    }
    // If there's no player assigned, do nothing
  }

  // Update league counts for Icons (they count double towards any league)
  contributingPlayers.forEach((player) => {
    const rarityName = RARITY_ID_TO_NAME[player.rarity];
    if (rarityName === "Icon") {
      leaguesInSquad.forEach((leagueId) => {
        leagueCount[leagueId] = (leagueCount[leagueId] || 0) + 1; // Icons add 2 to each league
      });
    }
  });

  // Function to increment chemistry points for a player
  const incrementChemistry = (playerId, points) => {
    chemistryPoints[playerId] += points;
    // Max chemistry from this step is 3 (before manager bonus)
    chemistryPoints[playerId] = Math.min(chemistryPoints[playerId], 3);
  };

  // Calculate chemistry points for each contributing player
  contributingPlayers.forEach((player) => {
    const rarityName = RARITY_ID_TO_NAME[player.rarity];

    // Start with 0 chemistry points
    chemistryPoints[player.id] = 0;

    if (rarityName === "Hero" || rarityName === "Icon") {
      chemistryPoints[player.id] = 3; // Full chemistry
    } else {
      // Club Chemistry
      const clubPlayers = clubCount[player.teamid];
      if (clubPlayers >= 7) {
        incrementChemistry(player.id, 3);
      } else if (clubPlayers >= 4) {
        incrementChemistry(player.id, 2);
      } else if (clubPlayers >= 2) {
        incrementChemistry(player.id, 1);
      }

      // Nation Chemistry
      const nationPlayers = nationCount[player.nation];
      if (nationPlayers >= 8) {
        incrementChemistry(player.id, 3);
      } else if (nationPlayers >= 5) {
        incrementChemistry(player.id, 2);
      } else if (nationPlayers >= 2) {
        incrementChemistry(player.id, 1);
      }

      // League Chemistry
      const leaguePlayers = leagueCount[player.leagueid];
      if (leaguePlayers >= 8) {
        incrementChemistry(player.id, 3);
      } else if (leaguePlayers >= 5) {
        incrementChemistry(player.id, 2);
      } else if (leaguePlayers >= 3) {
        incrementChemistry(player.id, 1);
      }
    }

    // Manager Bonus
    let managerBonusApplied = false;
    if (manager) {
      if (
        player.leagueid === manager.leagueid ||
        player.nation === manager.nation
      ) {
        chemistryPoints[player.id] += 1;
        managerBonusApplied = true;
      }
    }

    // Cap total chemistry per player at 4 (including manager bonus)
    if (managerBonusApplied) {
      chemistryPoints[player.id] = Math.min(chemistryPoints[player.id], 4);
    } else {
      chemistryPoints[player.id] = Math.min(chemistryPoints[player.id], 3);
    }
  });

  // Calculate total chemistry, capped at 33
  let totalChemistry = Object.values(chemistryPoints).reduce(
    (sum, points) => sum + points,
    0
  );
  totalChemistry = Math.min(totalChemistry, 33);

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

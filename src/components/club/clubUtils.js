export const calculateRatingsCount = (players) => {
  const ratingsCount = players.reduce((acc, player) => {
    acc[player.rating] = (acc[player.rating] || 0) + 1;
    return acc;
  }, {});

  const sortedRatingsArray = Object.entries(ratingsCount)
    .sort((a, b) => b[0] - a[0])
    .map(([rating, count]) => ({
      name: rating,
      value: count,
    }));

  return sortedRatingsArray;
};

export const calculateClubValue = (players) => {
  const result = players.reduce(
    (acc, player) => {
      let player_value = player.latest_price;
      acc.total_value += player_value;
      if (!player.untradeable) {
        acc.tradeable_value += player_value;
      } else {
        acc.untradeable_value += player_value;
      }
      return acc;
    },
    { total_value: 0, tradeable_value: 0, untradeable_value: 0 }
  );

  return result;
};
export const formatLargeNumber = (number) => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + "K";
  } else {
    return number;
  }
};
export const calculateRarityDistribution = (players) => {
  const rarityDistribution = {
    Gold: { rare: 0, common: 0 },
    Silver: { rare: 0, common: 0 },
    Bronze: { rare: 0, common: 0 },
  };

  players.forEach((player) => {
    if (player.rating >= 75) {
      if (player.rarity === 1) {
        rarityDistribution.Gold.rare += 1;
      } else {
        rarityDistribution.Gold.common += 1;
      }
    } else if (player.rating >= 65) {
      if (player.rarity === 1) {
        rarityDistribution.Silver.rare += 1;
      } else {
        rarityDistribution.Silver.common += 1;
      }
    } else {
      if (player.rarity === 1) {
        rarityDistribution.Bronze.rare += 1;
      } else {
        rarityDistribution.Bronze.common += 1;
      }
    }
  });

  return Object.keys(rarityDistribution).map((key) => ({
    name: key,
    rare: rarityDistribution[key].rare,
    common: rarityDistribution[key].common,
  }));
};

export const calculateCommonSBCs = (players) => {
  let goldRareCount = 0;
  let goldCommonCount = 0;

  players.forEach((player) => {
    if (player.rating >= 75) {
      if (player.rarity === 1) {
        goldRareCount += 1;
      } else {
        goldCommonCount += 1;
      }
    }
  });

  const totalGoldCount = goldRareCount + goldCommonCount;

  const sbcCounts = {
    "82+ Pick": 0,
    "TOTS Crafting Upgrade": 0,
    "Premium SA & CAF Upgrade": 0,
    "Gold Upgrade": 0,
  };

  // Calculate how many times each SBC can be completed
  sbcCounts["82+ Pick"] = Math.min(
    Math.floor(totalGoldCount / 8),
    Math.floor(goldRareCount / 2)
  );

  sbcCounts["TOTS Crafting Upgrade"] = Math.min(
    Math.floor(totalGoldCount / 11),
    Math.floor(goldRareCount / 1)
  );

  sbcCounts["Premium SA & CAF Upgrade"] = Math.floor(goldRareCount / 11);

  sbcCounts["Gold Upgrade"] = Math.floor(totalGoldCount / 11);
  let data = [];
  Object.keys(sbcCounts).forEach((key) => {
    data.push({ name: key, value: sbcCounts[key] });
  });
  return data;
};

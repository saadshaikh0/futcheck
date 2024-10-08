import { format, isToday, isSameDay, subDays } from "date-fns";

export const filterDataByZoomLevel = (data, zoomLevel) => {
  const today = new Date();

  switch (zoomLevel) {
    case "Today":
      return data.filter((item) => isToday(new Date(item.time)));

    case "Daily":
      return Object.values(
        data.reduce((acc, item) => {
          const date = new Date(item.time).toISOString().split("T")[0]; // YYYY-MM-DD format
          if (!acc[date]) {
            acc[date] = { time: date, price: 0, count: 0 };
          }
          acc[date].price += Number(item.price);
          acc[date].count += 1;
          return acc;
        }, {})
      ).map((item) => ({
        time: item.time,
        price: (item.price / item.count).toFixed(2), // Average price per day
      }));

    case "7 days (Hourly)":
      const sevenDaysAgo = subDays(today, 7);
      return data.filter((item) => new Date(item.time) >= sevenDaysAgo);

    default:
      return [];
  }
};
function calculateEMA(prices, period) {
  const k = 2 / (period + 1);
  let emaArray = [];
  let ema = prices[0]; // start with the first price as initial EMA
  emaArray.push(ema);

  for (let i = 1; i < prices.length; i++) {
    ema = prices[i] * k + ema * (1 - k); // EMA formula
    emaArray.push(ema);
  }
  return emaArray;
}

export const calculateMomentum = (priceHistory) => {
  const prices = priceHistory.map((item) => item.price);

  const shortEMA = calculateEMA(prices, 3);
  const longEMA = calculateEMA(prices, 8);

  // Calculate the differences between the latest and previous values
  const recentPriceDifference =
    prices[prices.length - 1] - prices[prices.length - 2];
  const shortEMADifference =
    shortEMA[shortEMA.length - 1] - shortEMA[shortEMA.length - 2];
  const longEMADifference =
    longEMA[longEMA.length - 1] - longEMA[longEMA.length - 2];

  // Check if the recent price has been stable for the last 2 hours (no significant change)
  const isStable =
    Math.abs(prices[prices.length - 1] - prices[prices.length - 2]) < 0.01 &&
    Math.abs(prices[prices.length - 2] - prices[prices.length - 3]) < 0.01; // Threshold for stability

  // Determine if the momentum is going up based on both short and long EMA trends
  const isMomentumUp =
    !isStable && // Momentum can't be up if the price is stable
    recentPriceDifference > 0 &&
    shortEMADifference > 0 &&
    longEMADifference > 0 &&
    shortEMA[shortEMA.length - 1] > longEMA[longEMA.length - 1];

  // Return "stable" if price has been stable, otherwise momentum up/down
  if (isStable) {
    return "stable"; // The price has been stable
  }

  return isMomentumUp ? "up" : "down"; // Return momentum up or down
};
export const getBestWindowToBuyAndSell = (priceHistory) => {
  // Define the 4-hour windows
  const windows = {
    "00:00 - 04:00": [],
    "04:00 - 08:00": [],
    "08:00 - 12:00": [],
    "12:00 - 16:00": [],
    "16:00 - 20:00": [],
    "20:00 - 00:00": [],
  };

  // Group prices into the appropriate window based on time
  priceHistory.forEach((data) => {
    const date = new Date(data.time);
    const hour = date.getUTCHours();

    if (hour >= 0 && hour < 4) {
      windows["00:00 - 04:00"].push(Number(data.price));
    } else if (hour >= 4 && hour < 8) {
      windows["04:00 - 08:00"].push(Number(data.price));
    } else if (hour >= 8 && hour < 12) {
      windows["08:00 - 12:00"].push(Number(data.price));
    } else if (hour >= 12 && hour < 16) {
      windows["12:00 - 16:00"].push(Number(data.price));
    } else if (hour >= 16 && hour < 20) {
      windows["16:00 - 20:00"].push(Number(data.price));
    } else if (hour >= 20 && hour < 24) {
      windows["20:00 - 00:00"].push(Number(data.price));
    }
  });

  // Calculate the average price for each window
  const windowAverages = Object.keys(windows).map((window) => {
    const prices = windows[window];
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length || 0; // Handle divide by zero
    return { window, avgPrice };
  });

  // Find the window with the lowest and highest average price
  let bestBuyWindow = null;
  let bestSellWindow = null;
  let minAvgPrice = Infinity;
  let maxAvgPrice = -Infinity;

  windowAverages.forEach(({ window, avgPrice }) => {
    if (avgPrice < minAvgPrice) {
      minAvgPrice = avgPrice;
      bestBuyWindow = window;
    }
    if (avgPrice > maxAvgPrice) {
      maxAvgPrice = avgPrice;
      bestSellWindow = window;
    }
  });

  return {
    bestBuyWindow,
    bestSellWindow,
    minAvgPrice: parseInt(minAvgPrice),
    maxAvgPrice: parseInt(maxAvgPrice),
  };
};

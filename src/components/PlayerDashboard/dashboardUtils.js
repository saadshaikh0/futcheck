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

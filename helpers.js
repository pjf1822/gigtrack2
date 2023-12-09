import Toast from "react-native-root-toast";
import { colors } from "./theme";

// format the data
export const generateSections = (dataList) => {
  const now = new Date();
  const currentMonth = now.getUTCMonth();
  const currentYear = now.getUTCFullYear(); // Get current year

  // Function to calculate the "weight" of a month r elative to the current month and year
  const monthWeight = (date) => {
    const yearDiff = date.getUTCFullYear() - currentYear;
    const monthIndex = date.getUTCMonth();
    return yearDiff * 12 + monthIndex - currentMonth;
  };

  return dataList
    .reduce((acc, item) => {
      const date = new Date(item.date);
      const year = date.getUTCFullYear();
      const month = date.toLocaleString("en-US", { month: "long" });

      if (date > now) {
        let upcomingSection = acc.find((sec) => sec.month === "Upcoming Dates");

        if (!upcomingSection) {
          upcomingSection = { month: "Upcoming Dates", data: [] };
          acc.unshift(upcomingSection);
        }
        upcomingSection.data.push(item);
        upcomingSection.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      } else {
        const section = acc.find(
          (sec) => sec?.year === year && sec?.month === month
        );
        if (section) {
          section?.data?.push(item);
        } else {
          acc.push({
            year: year,
            month: month,
            data: [item],
            weight: monthWeight(date),
          });
        }
      }
      return acc;
    }, [])
    .sort((a, b) => b.weight - a.weight);
};

export const showToast = (message, position, backgroundColor) => {
  return Toast.show(message, {
    duration: Toast.durations.LONG,
    position,
    backgroundColor,
    textColor: colors.beige,
    opacity: 1,
  });
};

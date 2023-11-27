// format the data
export const generateSections = (dataList) => {
  const now = new Date();
  const currentMonth = now.getUTCMonth();
  const currentYear = now.getUTCFullYear(); // Get current year

  // Function to calculate the "weight" of a month relative to the current month and year
  const monthWeight = (date) => {
    const monthIndex = date.getUTCMonth();
    const yearDiff = date.getUTCFullYear() - currentYear;
    return monthIndex - currentMonth + 12 * yearDiff;
  };

  return dataList
    .reduce((acc, item) => {
      const date = new Date(item.date);
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
        const section = acc.find((sec) => sec?.month === month);
        if (section) {
          section?.data?.push(item);
        } else {
          acc.push({
            month: month,
            data: [item],
            weight: monthWeight(date),
          });
        }
      }
      return acc;
    }, [])
    .sort((a, b) => b.weight - a.weight); // Sort sections based on the weight
};

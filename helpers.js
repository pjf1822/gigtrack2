// format the data
const generateSections = (dataList) => {
  const now = new Date();
  const currentMonth = now.getUTCMonth(); // Get current month as a number

  // Function to calculate the "weight" of a month relative to the current month
  const monthWeight = (month) => {
    const monthIndex = new Date(`${month} 1, 2000`).getUTCMonth();
    return (monthIndex + 12 - currentMonth) % 12;
  };

  return dataList
    .reduce((acc, item) => {
      const date = new Date(item.date);
      const month = date.toLocaleString("default", { month: "long" });
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
        const section = acc.find((sec) => sec.month === month);
        if (section) {
          section.data.push(item);
        } else {
          acc.push({
            month: month,
            data: [item],
            weight: monthWeight(month),
          });
        }
      }

      return acc;
    }, [])
    .sort((a, b) => b.weight - a.weight); // Sort sections based on the weight
};

// SECTION HEADERS
import { View, Text, StyleSheet } from "react-native";

export const RenderSectionHeader = ({ section }) => {
  const headerStyle =
    section.month === "Upcoming Dates"
      ? styles.upcomingHeader
      : styles.defaultHeader;

  return (
    <View style={[styles.headerContainer, headerStyle]}>
      {section.month !== "Upcoming Dates" ? (
        <Text style={styles.headerText}>
          {section.month} / {section.data[0].date.slice(2, 4)}
        </Text>
      ) : (
        <Text style={styles.headerText}>{section.month} </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

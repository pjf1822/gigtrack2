// SECTION HEADERS
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme";

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
    borderBottomColor: colors.blue,
    borderTopColor: colors.blue,
    borderTopWidth: 1,
  },
  headerText: {
    fontSize: 18,
    color: colors.blue,
  },

  defaultHeader: {
    backgroundColor: colors.terraCotta,
  },
  upcomingHeader: {
    backgroundColor: colors.green,
  },
});

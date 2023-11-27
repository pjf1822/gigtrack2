import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SectionList,
  StyleSheet,
} from "react-native";

import { ListItem, Badge } from "@rneui/themed";

export const HomePageListItem = ({ item, navigation }) => {
  const itemDate = new Date(item.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to compare dates only

  const dayOfMonth = itemDate.getUTCDate();
  const monthNumber = itemDate.getUTCMonth() + 1; // Add 1 to get the correct month number
  const year = itemDate.getUTCFullYear();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Details", { itemId: item._id })}
    >
      <ListItem bottomDivider topDivider>
        <ListItem.Content style={{ maxWidth: 400 }}>
          {itemDate > today ? (
            <View style={styles.dates}>
              <Text>{monthNumber}</Text>
              <Text>/</Text>
              <Text>{dayOfMonth}</Text>
              <Text>/</Text>
              <Text>{year.toString()}</Text>
            </View>
          ) : (
            <View>
              <Text>
                {monthNumber}/{dayOfMonth}
                {`/${year}`}
              </Text>
            </View>
          )}
        </ListItem.Content>
        <ListItem.Content>
          <ListItem.Title>{item?.employer}</ListItem.Title>
        </ListItem.Content>
        {/* <ListItem.Content>
          <ListItem.Title>{item?.rate}</ListItem.Title>
        </ListItem.Content> */}
        {itemDate <= today && (
          <View style={styles?.badges}>
            <Badge
              status={item?.paid ? "success" : "error"}
              value={item?.paid ? "paid" : "not paid"}
            />
            <Badge
              status={item?.invoiced ? "success" : "error"}
              value={item?.invoiced ? "Invoiced" : "Not Invoiced"}
            />
          </View>
        )}

        <Text>Edit</Text>
        <ListItem.Chevron
          style={{
            alignSelf: "center",
            transform: "translateY(4px)",
          }}
        />
      </ListItem>
    </TouchableOpacity>
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
  badges: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  dates: {
    display: "flex",
    flexDirection: "row",
  },
  upcomingHeader: {
    backgroundColor: "#f0f0f0",
  },
  defaultHeader: {
    backgroundColor: "#807e7e",
  },
});

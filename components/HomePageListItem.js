import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme";
import { ListItem, Badge, Icon, Button } from "@rneui/themed";
import { handleDeleteGig } from "../gigUtils";

export const HomePageListItem = ({ item, navigation, getAllGigs }) => {
  const itemDate = new Date(item.date);
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0); // Reset time to compare dates only
  itemDate.setUTCHours(0, 0, 0, 0);
  const dayOfMonth = itemDate.getUTCDate();
  const monthNumber = itemDate.getUTCMonth() + 1;
  const year = itemDate.getUTCFullYear();

  return (
    <ListItem.Swipeable
      leftContent={(reset) => (
        <Button
          title="Edit"
          onPress={() => navigation.navigate("Details", { itemId: item._id })}
          buttonStyle={{
            minHeight: "100%",
            backgroundColor: colors.green,
            color: colors.beige,
          }}
        />
      )}
      rightContent={(reset) => (
        <Button
          title="Delete"
          onPress={() =>
            handleDeleteGig(item._id, "HomePage", navigation, getAllGigs)
          }
          icon={{ name: "delete", color: colors.beige }}
          buttonStyle={{
            minHeight: "100%",
            backgroundColor: colors.terraCotta,
            color: colors.beige,
          }}
        />
      )}
      bottomDivider
      topDivider
      containerStyle={{
        backgroundColor: colors.beige,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <ListItem.Content style={{ maxWidth: 80, flex: 2 }}>
        {itemDate > today ? (
          <View style={styles.dateWrapper}>
            <Text style={styles.datesFont}>{monthNumber}</Text>
            <Text style={styles.datesFont}>/</Text>
            <Text style={styles.datesFont}>{dayOfMonth}</Text>
            <Text style={styles.datesFont}>/</Text>
            <Text style={styles.datesFont}>{year.toString()}</Text>
          </View>
        ) : (
          <View style={styles.dateWrapper}>
            <Text style={styles.datesFont}>
              {monthNumber}/{dayOfMonth}
            </Text>
          </View>
        )}
      </ListItem.Content>
      <ListItem.Content style={{ flex: 3 }}>
        <ListItem.Title
          style={[
            {
              display: "flex",
              flexDirection: "row",
              textAlign: "left",
              color: colors.blue,
              fontSize: itemDate < today ? 13 : 16,
            },
          ]}
        >
          {item?.employer}
        </ListItem.Title>
      </ListItem.Content>
      {item?.rate && itemDate < today && (
        <ListItem.Content style={{ flex: 2 }}>
          <ListItem.Title style={styles.datesFont}>
            {item?.rate}$
          </ListItem.Title>
        </ListItem.Content>
      )}

      {itemDate <= today && (
        <ListItem.Content style={[styles.badges, { flex: 2.6 }]}>
          <Badge
            value={item?.paid ? "Paid" : "Not Paid"}
            badgeStyle={{
              backgroundColor: item?.paid ? colors.green : colors.terraCotta,
              padding: 2,
              marginBottom: 4,
            }}
          />
          <Badge
            value={item?.invoiced ? "Invoiced" : "Not Invoiced"}
            badgeStyle={{
              padding: 2,

              backgroundColor: item?.invoiced
                ? colors.green
                : colors.terraCotta,
            }}
          />
        </ListItem.Content>
      )}
    </ListItem.Swipeable>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    borderBottomWidth: 1,
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
  dateWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  datesFont: {
    fontSize: 15,
    color: colors.blue,
  },
  editFont: {
    transform: [{ translateY: 3 }],
  },
});

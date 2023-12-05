import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { colors, regFont } from "../theme";
import { ListItem, Badge, Button } from "@rneui/themed";
import { handleDeleteGig } from "../gigUtils";

export const HomePageListItem = ({ item, navigation, getAllGigs }) => {
  const itemDate = new Date(item.date);
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  itemDate.setUTCHours(0, 0, 0, 0);
  const dayOfMonth = itemDate.getUTCDate();
  const monthNumber = itemDate.getUTCMonth() + 1;
  const year = itemDate.getUTCFullYear();

  return (
    <ListItem.Swipeable
      leftContent={(reset) => (
        <Button
          title="Edit"
          onPress={() => {
            navigation.navigate("Details", { itemId: item._id });
            reset();
          }}
          buttonStyle={{
            minHeight: "100%",
            backgroundColor: colors.green,
            color: colors.beige,
          }}
          titleStyle={{
            fontFamily: regFont.fontFamily,
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
          titleStyle={{
            fontFamily: regFont.fontFamily,
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

              ...(Platform.OS === "ios" && Platform.isPad
                ? { fontSize: 20 }
                : { fontSize: itemDate < today ? 14 : 16 }),
              fontFamily: regFont.fontFamily,
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
              fontFamily: regFont?.fontFamily,
              ...(Platform.OS === "ios" && Platform.isPad
                ? { transform: [{ scale: 1.2 }] }
                : {}),
            }}
          />
          <Badge
            value={item?.invoiced ? "Invoiced" : "Not Invoiced"}
            badgeStyle={{
              padding: 2,
              backgroundColor: item?.invoiced
                ? colors.green
                : colors.terraCotta,
              fontFamily: regFont.fontFamily,
              ...(Platform.OS === "ios" && Platform.isPad
                ? { transform: [{ scale: 1.2 }] }
                : {}),
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
    fontFamily: regFont.fontFamily,
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
    ...(Platform.OS === "ios" && Platform.isPad
      ? { fontSize: 18 }
      : { fontSize: 14 }),

    color: colors.blue,
    fontFamily: regFont.fontFamily,
  },

  editFont: {
    transform: [{ translateY: 3 }],
  },
});

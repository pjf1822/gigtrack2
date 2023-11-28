import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../theme";
import { ListItem, Badge, Icon } from "@rneui/themed";

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
      <ListItem
        bottomDivider
        topDivider
        containerStyle={{
          backgroundColor: colors.beige,
          display: "flex",
        }}
      >
        <ListItem.Content style={{ maxWidth: 80 }}>
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
                {`/${year}`}
              </Text>
            </View>
          )}
        </ListItem.Content>
        <ListItem.Content>
          <ListItem.Title
            style={[
              {
                display: "flex",
                flexDirection: "row",
                textAlign: "left",
              },
              styles.datesFont,
            ]}
          >
            {item?.employer}
          </ListItem.Title>
        </ListItem.Content>
        {/* <ListItem.Content>
          <ListItem.Title>{item?.rate}</ListItem.Title>
        </ListItem.Content> */}
        {itemDate <= today && (
          <View style={styles?.badges}>
            <Badge
              value={item?.paid ? "paid" : "not paid"}
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
          </View>
        )}

        <Text style={[styles.datesFont, styles.editFont]}>Edit</Text>
        <Icon
          name="chevron-right"
          style={{
            alignSelf: "center",
            color: colors.blue,
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
    transform: [{ translateX: 10 }],
  },
});

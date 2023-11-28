import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../theme";
import { ListItem, Badge, Icon } from "@rneui/themed";

export const HomePageListItem = ({ item, navigation }) => {
  const itemDate = new Date(item.date);
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0); // Reset time to compare dates only
  itemDate.setUTCHours(0, 0, 0, 0);
  const dayOfMonth = itemDate.getUTCDate();
  const monthNumber = itemDate.getUTCMonth() + 1;
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

        <ListItem.Content
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1.5,
            justifyContent: "flex-end",
          }}
        >
          <Text style={[styles.datesFont, styles.editFont]}>Edit</Text>
          <Icon
            name="chevron-right"
            style={{
              alignSelf: "center",
              color: colors.blue,
            }}
          />
        </ListItem.Content>
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
    transform: [{ translateY: 3 }],
  },
});

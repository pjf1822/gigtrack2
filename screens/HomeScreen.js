import {
  View,
  Text,
  TouchableOpacity,
  SectionList,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import "react-native-gesture-handler";
import { ListItem, Badge } from "@rneui/themed";
import { fetchGigs } from "../api";
import { CreateNewGig } from "../components/CreateNewGig";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
  const [sections, setSections] = useState([]);
  const [allGigs, setAllGigs] = useState([]);

  const getAllGigs = async () => {
    try {
      const data = await fetchGigs();

      const filteredData = data.map((item) => {
        const { __v, ...rest } = item;
        return rest;
      });

      setAllGigs(filteredData);
    } catch (error) {
      console.error(
        "An error occurred while fetching the transactions:",
        error
      );
    }
  };

  // EFFECT TO RUN THE INITAL API CALL
  useEffect(() => {
    getAllGigs();
  }, []);

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
          let upcomingSection = acc.find(
            (sec) => sec.month === "Upcoming Dates"
          );

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

  useEffect(() => {
    if (allGigs.length > 0) {
      const generatedSections = generateSections(allGigs);
      setSections(generatedSections);
    }
  }, [allGigs]);

  // SECTION HEADERS
  const renderSectionHeader = ({ section }) => {
    const headerStyle =
      section.month === "Upcoming Dates"
        ? styles.upcomingHeader
        : styles.defaultHeader;

    return (
      <View style={[styles.headerContainer, headerStyle]}>
        <Text style={styles.headerText}>{section.month}</Text>
      </View>
    );
  };
  useFocusEffect(
    useCallback(() => {
      getAllGigs();
    }, [])
  );

  // EACH ITEM
  renderItem = ({ item, section, index }) => {
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
                  {year !== today.getUTCFullYear() ? `/${year}` : ""}
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

  return (
    <View>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />

      <CreateNewGig getAllGigs={getAllGigs} />
    </View>
  );
}

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

import { View, Text, SectionList, StyleSheet } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import "react-native-gesture-handler";
import { fetchGigs } from "../api";
import { CreateNewGig } from "../components/CreateNewGig";
import { useFocusEffect } from "@react-navigation/native";
import { generateSections } from "../helpers";
import { HomePageListItem } from "../components/HomePageListItem";

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

  useEffect(() => {
    if (allGigs.length > 0) {
      const generatedSections = generateSections(allGigs);
      setSections(generatedSections);
    }
  }, [allGigs]);

  // SECTION HEADERS
  const renderSectionHeader = ({ section }) => {
    console.log(section);
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
  useFocusEffect(
    useCallback(() => {
      getAllGigs();
    }, [])
  );

  return (
    <View>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <HomePageListItem item={item} navigation={navigation} />
        )}
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

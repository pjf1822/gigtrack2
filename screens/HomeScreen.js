import { View, SectionList } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import "react-native-gesture-handler";
import { fetchGigs } from "../api";
import { CreateNewGig } from "../components/CreateNewGig";
import { useFocusEffect } from "@react-navigation/native";
import { generateSections } from "../helpers";
import { HomePageListItem } from "../components/HomePageListItem";
import { RenderSectionHeader } from "../components/RenderSectionHeader";

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
        renderSectionHeader={RenderSectionHeader}
      />
      <CreateNewGig getAllGigs={getAllGigs} />
    </View>
  );
}

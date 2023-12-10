import { View, SectionList } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import "react-native-gesture-handler";
import { fetchGigs } from "../api";
import { CreateNewGig } from "../components/CreateNewGig";
import { useFocusEffect } from "@react-navigation/native";
import { generateSections } from "../helpers";
import { HomePageListItem } from "../components/HomePageListItem";
import { RenderSectionHeader } from "../components/RenderSectionHeader";
import { colors } from "../theme";
import NoGigs from "../components/NoGigs";
import { useUser } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const [sections, setSections] = useState([]);
  const [allGigs, setAllGigs] = useState([]);
  const { user } = useUser();

  const getAllGigs = async () => {
    try {
      console.log(user?.uid);
      const data = await fetchGigs(user?.uid);

      const filteredData = data?.map((item) => {
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
    AsyncStorage.setItem("firstTimeUser", "false")
      .then(() => {})
      .catch((error) => {
        console.error("Error setting firstTimeUSer in AsyncStorage:", error);
      });
  }, []);

  useEffect(() => {
    const generatedSections = generateSections(allGigs);
    setSections(generatedSections);
  }, [allGigs]);

  useFocusEffect(
    useCallback(() => {
      getAllGigs();
    }, [])
  );

  return (
    <View style={{ backgroundColor: colors.beige, flex: 1 }}>
      {allGigs.length === 0 && <NoGigs />}
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <HomePageListItem
            item={item}
            navigation={navigation}
            getAllGigs={getAllGigs}
          />
        )}
        renderSectionHeader={RenderSectionHeader}
      />
      <CreateNewGig getAllGigs={getAllGigs} allGigs={allGigs} />
    </View>
  );
}

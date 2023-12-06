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
import Toast from "react-native-root-toast";

export default function HomeScreen({ navigation }) {
  const [sections, setSections] = useState([]);
  const [allGigs, setAllGigs] = useState([]);
  const { user } = useUser();

  const getAllGigs = async () => {
    try {
      const data = await fetchGigs(user?.email);

      const filteredData = data?.map((item) => {
        const { __v, ...rest } = item;
        return rest;
      });

      if (filteredData.length === 1) {
        let toast = Toast.show("Swipe each gig to edit or delete!", {
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
          backgroundColor: colors.green,
          textColor: colors.beige,
          opacity: 1,
        });
      }
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
        ListFooterComponent={<CreateNewGig getAllGigs={getAllGigs} />}
      />
    </View>
  );
}

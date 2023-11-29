import { View } from "react-native";
import React, { useState, useEffect } from "react";
import Toast from "react-native-root-toast";
import { fetchSingleGig, updateGig } from "../api";
import { useNavigation } from "@react-navigation/native";
import MainGigForm from "../components/MainGigForm";
import { colors } from "../theme";

const DetailScreen = ({ route }) => {
  const { itemId } = route.params;
  const [pageData, setPageData] = useState({});
  const navigation = useNavigation();

  const getSingleGig = async () => {
    try {
      const data = await fetchSingleGig(itemId);
      setPageData(data);
    } catch (error) {
      console.error(
        "An error occurred while fetching the transactions:",
        error
      );
    }
  };

  useEffect(() => {
    getSingleGig();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: colors.blue,
      }}
    >
      <MainGigForm
        formType={"update"}
        employer={pageData?.employer}
        date={pageData?.date}
        invoiced={pageData?.invoiced}
        paid={pageData?.paid}
        rate={pageData?.rate}
        itemId={itemId}
        navigation={navigation}
      />
    </View>
  );
};

export default DetailScreen;

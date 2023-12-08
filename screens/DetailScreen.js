import { View } from "react-native";
import React, { useState, useEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import MainGigForm from "../components/MainGigForm";
import { colors } from "../theme";
import { getSingleGig } from "../gigUtils";

const DetailScreen = ({ route }) => {
  const { itemId } = route.params;
  const [pageData, setPageData] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    getSingleGig(itemId, setPageData);
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

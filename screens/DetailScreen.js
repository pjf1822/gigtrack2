import { View } from "react-native";
import React, { useState, useEffect } from "react";
import Toast from "react-native-root-toast";
import { Button } from "@rneui/themed";
import { deleteGig, fetchSingleGig, updateGig } from "../api";
import { useNavigation } from "@react-navigation/native";
import MainGigForm from "../components/MainGigForm";

const DetailScreen = ({ route }) => {
  const { itemId } = route.params;
  const [pageData, setPageData] = useState({});
  const navigation = useNavigation();

  const handleUpdateGig = async (values) => {
    try {
      const response = await updateGig(itemId, values);
      if (response.message === "Gig updated successfully!") {
        let toast = Toast.show("Gig updated!", {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
        setTimeout(() => {
          navigation.removeListener;
          navigation.goBack();
        }, 1000);
      }
    } catch (error) {
      let toast = Toast.show("Could not update", {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
      });
    }
  };
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
  const handleDeleteGig = async (_id) => {
    try {
      const response = await deleteGig(_id);
      if (response.message === "Gig deleted successfully!") {
        let toast = Toast.show("Gig deleted!", {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
        setTimeout(() => {
          navigation.removeListener;
          navigation.goBack();
        }, 1000);
      }
    } catch (error) {
      let toast = Toast.show("Could not delete", {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
      });
    }
  };
  useEffect(() => {
    getSingleGig();
  }, []);

  return (
    <View
      style={{
        flex: 0.8,
        justifyContent: "space-between",
      }}
    >
      <MainGigForm
        formType={"update"}
        handleUpdateGig={handleUpdateGig}
        employer={pageData.employer}
        date={pageData.date}
        invoiced={pageData.invoiced}
        paid={pageData.paid}
      />
      <Button
        buttonStyle={{
          backgroundColor: "rgba(214, 61, 57, 1)",
          marginTop: 20,
        }}
        onPress={() => handleDeleteGig(itemId)}
        title="Delete Gig"
      />
    </View>
  );
};

export default DetailScreen;

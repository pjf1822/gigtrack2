import { useState } from "react";
import { Button, Overlay } from "@rneui/themed";
import { View, StyleSheet } from "react-native";
import MainGigForm from "./MainGigForm";
import { createGig } from "../api";
import { colors } from "../theme";
import Toast from "react-native-root-toast";

export const CreateNewGig = ({ getAllGigs }) => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const handleCreateGig = async (values) => {
    if (values.rate === "") {
      delete values.rate;
    }
    try {
      const response = await createGig(values);
      console.log(response.message);
      if (response.message === "Gig created successfully!") {
        let toast = Toast.show("Gig created!", {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
        setTimeout(() => {}, 1000);
      }
      await getAllGigs();
      toggleOverlay();
    } catch (error) {
      console.error("Error creating gig:", error);
    }
  };

  return (
    <View>
      <Button
        title="Add New Gig"
        onPress={toggleOverlay}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
      />
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlay}
      >
        <MainGigForm
          getAllGigs={getAllGigs}
          formType={"create"}
          toggleOverlay={toggleOverlay}
          employer={""}
          handleCreateGig={handleCreateGig}
        />
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
    backgroundColor: colors.green,
    color: colors.beige,
  },
  buttonText: {
    color: colors.beige,
  },
  overlay: {
    width: "93%",
    maxHeight: "93%",
    backgroundColor: colors.blue,
    borderRadius: "10%",
  },
});

import { useState } from "react";
import { Button, Overlay } from "@rneui/themed";
import { View, StyleSheet } from "react-native";
import MainGigForm from "./MainGigForm";
import { createGig } from "../api";

export const CreateNewGig = ({ getAllGigs }) => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const handleCreateGig = async (values) => {
    try {
      const response = await createGig(values);
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
  },
  overlay: {
    width: "90%",
    maxHeight: "90%",
  },
});

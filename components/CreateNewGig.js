import { useState } from "react";
import { Button, Overlay } from "@rneui/themed";
import { View, StyleSheet, Platform, Text } from "react-native";
import MainGigForm from "./MainGigForm";
import { colors, regFont } from "../theme";

export const CreateNewGig = ({ getAllGigs, allGigs }) => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
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
          allGigs={allGigs}
          formType={"create"}
          toggleOverlay={toggleOverlay}
          employer={""}
        />
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
    marginBottom: 40,
    backgroundColor: colors.green,
    color: colors.beige,
  },
  buttonText: {
    fontSize: Platform.OS === "ios" && Platform.isPad ? 30 : 18,
    fontFamily: regFont.fontFamily,
    color: colors.beige,
  },
  overlay: {
    width: "93%",
    maxHeight: "93%",
    backgroundColor: colors.blue,
    borderRadius: Platform.OS === "ios" && Platform.isPad ? "10%" : 0,
  },
});

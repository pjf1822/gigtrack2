import { useState } from "react";
import { Button, Overlay } from "@rneui/themed";
import { View, StyleSheet, Platform } from "react-native";
import MainGigForm from "./MainGigForm";
import { colors, regFont } from "../theme";

export const CreateNewGig = ({ getAllGigs }) => {
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
    backgroundColor: colors.green,
    color: colors.beige,
  },
  buttonText: {
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

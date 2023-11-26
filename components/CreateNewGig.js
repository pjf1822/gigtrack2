import { useState } from "react";
import { Button, Overlay } from "@rneui/themed";
import { View, StyleSheet } from "react-native";
import MainGigForm from "./MainGigForm";

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
    backgroundColor: "#919191",
  },
});

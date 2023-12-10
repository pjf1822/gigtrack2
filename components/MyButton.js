import { Platform, Text, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../theme";

const MyButton = ({ isDisabled, onPress, text }) => {
  const buttonStyles = [
    isDisabled ? styles.disabledButton : styles.button,
    {
      borderWidth: 3,
      borderColor: isDisabled ? colors.terraCotta : colors.beige,
    },
  ];
  const textStyles = [
    isDisabled ? styles.buttonDisabledText : styles.buttonText,
  ];
  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.green,
    paddingHorizontal: 8,
    color: colors.beige,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    outline: "none",
    borderRadius: 10,
    ...(Platform.OS === "ios" && Platform.isPad
      ? { minWidth: "75%", height: 55 }
      : { minWidth: "100%", height: 40 }),
  },
  disabledButton: {
    backgroundColor: colors.beige,

    paddingHorizontal: 8,
    color: colors.terraCotta,
    borderRadius: 10,
    outline: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...(Platform.OS === "ios" && Platform.isPad
      ? { minWidth: "75%", height: 55 }
      : { minWidth: "100%", height: 40 }),
  },
  buttonText: {
    color: colors.beige,
    fontWeight: "bold",
    ...(Platform.OS === "ios" && Platform.isPad
      ? { fontSize: 22 }
      : { fontSize: 16 }),
  },
  buttonDisabledText: {
    color: colors.terraCotta,
    fontWeight: "bold",
    ...(Platform.OS === "ios" && Platform.isPad
      ? { fontSize: 22 }
      : { fontSize: 16 }),
  },
});

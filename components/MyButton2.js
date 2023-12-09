import { Platform, Text, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors, regFont } from "../theme";

const MyButton2 = ({ onPress, text, textColor }) => {
  return (
    <TouchableOpacity style={styles.touchableWrapper} onPress={onPress}>
      <Text style={[styles.touchable, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default MyButton2;

const styles = StyleSheet.create({
  touchableWrapper: {
    backgroundColor: colors.beige,
    marginBottom: 25,
    padding: 12,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  touchable: {
    ...(Platform.OS === "ios" && Platform.isPad
      ? { fontSize: 25 }
      : { fontSize: 15 }),
    fontFamily: regFont.fontFamily,
  },
});

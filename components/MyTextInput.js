import React from "react";
import { TextInput, StyleSheet, Platform } from "react-native";
import { colors } from "../theme";

const MyTextInput = ({
  value,
  placeholder,
  onChangeText,
  placeholderTextColor = "black",
  secureTextEntry = false,
}) => {
  return (
    <TextInput
      style={value !== "" ? styles.input : styles.inputEmpty}
      placeholder={placeholder}
      onChangeText={onChangeText}
      placeholderTextColor={placeholderTextColor}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: colors.blue,
    borderWidth: 2,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: colors.beige,
    borderRadius: 10,
    ...(Platform.OS === "ios" && Platform.isPad
      ? { minWidth: "75%", height: 55, fontSize: 22 }
      : { minWidth: "100%", height: 40, fontSize: 16 }),
  },
  inputEmpty: {
    ...(Platform.OS === "ios" && Platform.isPad
      ? { minWidth: "75%", height: 55, fontSize: 22 }
      : { minWidth: "100%", height: 40, fontSize: 16 }),
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: colors.beige,
    borderRadius: 10,
  },
});

export default MyTextInput;

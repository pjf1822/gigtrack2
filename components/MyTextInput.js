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
    height: 40,
    borderColor: colors.blue,
    borderWidth: 2,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: colors.beige,
    borderRadius: 10,
    ...(Platform.OS === "ios" && Platform.isPad
      ? { minWidth: "75%" }
      : { minWidth: "100%" }),
  },
  inputEmpty: {
    height: 40,

    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: colors.beige,
    borderRadius: 10,
    ...(Platform.OS === "ios" && Platform.isPad
      ? { minWidth: "75%" }
      : { minWidth: "100%" }),
  },
});

export default MyTextInput;

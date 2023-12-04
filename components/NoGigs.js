import { View, Text } from "react-native";
import React from "react";
import { regFont, colors } from "../theme";

export default function NoGigs() {
  return (
    <View
      style={{
        height: "80%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: regFont.fontFamily,
      }}
    >
      <Text
        style={{
          fontFamily: regFont.fontFamily,
          fontSize: 30,
          color: colors.blue,
        }}
      >
        ADD SOME GIGS!
      </Text>
    </View>
  );
}

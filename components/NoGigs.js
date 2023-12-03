import { View, Text } from "react-native";
import React from "react";
import { regFont } from "../theme";

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
      <Text>ADD SOME GIGS</Text>
    </View>
  );
}

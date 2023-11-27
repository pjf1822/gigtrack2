import React from "react";
import { Header, Icon } from "@rneui/themed";
import { TouchableOpacity } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function HeaderBanner() {
  const navigation = useNavigation();

  return (
    <Header
      containerStyle={{
        paddingTop: heightPercentageToDP(7),
        height: heightPercentageToDP(15),
        backgroundColor: "#3D405B",
      }}
      centerComponent={{
        text: "GIG TRACK",

        style: {
          color: "white",
          fontSize: 28,
        },
      }}
      leftComponent={
        <TouchableOpacity
          style={{ marginTop: 4 }}
          onPress={() => navigation.navigate("Home")}
        >
          <Icon name="home" color="#fff" />
        </TouchableOpacity>
      }
    />
  );
}

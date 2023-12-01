import React from "react";
import { Header, Icon, Text } from "@rneui/themed";
import { TouchableOpacity } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../theme";
import { FIREBASE_AUTH } from "../FirebaseConfig";

export default function HeaderBanner() {
  const navigation = useNavigation();

  const signOut = async () => {
    try {
      await FIREBASE_AUTH.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSignOutAndNavigate = async () => {
    await signOut();
    navigation.navigate("Login");
  };

  return (
    <Header
      containerStyle={{
        paddingTop: heightPercentageToDP(7),
        height: heightPercentageToDP(15),
        backgroundColor: colors.blue,
        borderBottomColor: colors.blue,
        borderBottomWidth: 3,
      }}
      centerComponent={{
        text: "GIG TRACK",

        style: {
          color: colors.beige,
          fontSize: 28,
        },
      }}
      leftComponent={
        <TouchableOpacity
          style={{ marginTop: 4 }}
          onPress={() => navigation.navigate("Home")}
        >
          <Icon name="home" color={colors.beige} />
        </TouchableOpacity>
      }
      rightComponent={
        <TouchableOpacity
          style={{ marginTop: 4 }}
          onPress={handleSignOutAndNavigate}
        >
          <Text style={{ color: colors.terraCotta }}>Sign Out</Text>
        </TouchableOpacity>
      }
    />
  );
}

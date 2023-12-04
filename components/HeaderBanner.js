import React from "react";
import { Header, Icon, Image } from "@rneui/themed";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { colors, regFont } from "../theme";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { useUser } from "../UserContext";
import Toast from "react-native-root-toast";

export default function HeaderBanner() {
  const navigation = useNavigation();
  const { user } = useUser();

  const signOut = async () => {
    try {
      await FIREBASE_AUTH.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSignOutAndNavigate = async () => {
    await signOut();
    let toast = Toast.show("Signed out successfully!", {
      duration: Toast.durations.LONG,
      position: Toast.positions.TOP,
      backgroundColor: colors.green,
      textColor: colors.beige,
      opacity: 1,
    });
    setTimeout(() => {}, 1000);
    navigation.navigate("Login");
  };

  return (
    <Header
      containerStyle={{
        paddingTop: heightPercentageToDP(5),
        height: heightPercentageToDP(14),
        backgroundColor: colors.blue,
        borderBottomColor: colors.blue,
        borderBottomWidth: 3,
        display: user ? "flex" : "none",
      }}
    >
      <TouchableOpacity
        style={{
          marginTop: 4,
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon name="home" color={colors.green} />
      </TouchableOpacity>

      <View style={styles.centerComponentContainer}>
        <Image
          source={require("../assets/logo-color.png")}
          style={{
            width: 290,
            height: 80,
          }}
        />
      </View>

      <View
        style={{
          marginTop: 4,
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: colors.green,
            fontFamily: regFont.fontFamily,
            marginBottom: 5,
          }}
        >
          {user && user?.displayName}
        </Text>
        <TouchableOpacity onPress={handleSignOutAndNavigate}>
          <Text style={[styles.text, regFont.fontFamily]}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </Header>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.terraCotta,
    fontFamily: regFont.fontFamily,
  },
});

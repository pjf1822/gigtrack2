import React from "react";
import { Header, Icon, Image } from "@rneui/themed";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { colors, regFont } from "../theme";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { useUser } from "../UserContext";
import Toast from "react-native-root-toast";
import { showToast } from "../helpers";

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
    showToast("Signed out successfully!", Toast.positions.TOP, colors.green);
    setTimeout(() => {}, 1000);
    navigation.navigate("Login");
  };

  return (
    <Header
      containerStyle={{
        paddingTop:
          Platform.OS === "ios"
            ? Platform.isPad
              ? heightPercentageToDP(5)
              : heightPercentageToDP(8)
            : heightPercentageToDP(2),
        height: heightPercentageToDP(15),
        backgroundColor: colors.blue,
        borderBottomColor: colors.blue,
        borderBottomWidth: 3,
        display: user ? "flex" : "none",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.iconWrapper}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon
            size={Platform.OS === "ios" && Platform.isPad ? 40 : undefined}
            name="home"
            color={colors.green}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Options")}>
          <Icon
            size={Platform.OS === "ios" && Platform.isPad ? 40 : undefined}
            style={
              Platform.OS === "ios" && Platform.isPad
                ? { marginLeft: 17 }
                : { marginLeft: 5 }
            }
            name="settings"
            color={colors.green}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.imageWrapper}>
        <Image
          source={require("../assets/logo-color.png")}
          style={{
            ...(Platform.OS === "ios" && Platform.isPad
              ? { width: 400, height: 100 }
              : { width: 200, height: 50 }),
          }}
        />
      </View>
      <View style={styles.signoutWrapper}>
        {user.displayName && (
          <Text
            style={[
              styles.text,
              Platform.OS === "ios" && Platform.isPad && { fontSize: 22 },
            ]}
          >
            {user && user?.displayName}
          </Text>
        )}

        <TouchableOpacity onPress={handleSignOutAndNavigate}>
          <Text
            style={[
              styles.text,
              Platform.OS === "ios" && Platform.isPad && { fontSize: 22 },
            ]}
          >
            Sign Out
          </Text>
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
  iconWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  imageWrapper: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signoutWrapper: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

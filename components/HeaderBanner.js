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
      }}
    >
      <View style={styles.iconWrapper}>
        <TouchableOpacity
          style={{
            ...(Platform.OS === "ios" && Platform.isPad
              ? { transform: [{ translateY: -9 }] }
              : {}),
          }}
          onPress={() => navigation.navigate("Home")}
        >
          <Icon
            size={Platform.OS === "ios" && Platform.isPad ? 40 : undefined}
            style={
              Platform.OS === "ios" && Platform.isPad ? { marginLeft: 20 } : {}
            }
            name="home"
            color={colors.green}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 4,
            height: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            ...(Platform.OS === "ios" && Platform.isPad
              ? { transform: [{ translateY: -9 }] }
              : {}),
          }}
          onPress={() => navigation.navigate("Options")}
        >
          <Icon
            size={Platform.OS === "ios" && Platform.isPad ? 40 : undefined}
            style={
              Platform.OS === "ios" && Platform.isPad
                ? { marginLeft: 17 }
                : { marginLeft: 5, transform: "translateY(-2px)" }
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
              ? { width: 390, height: 70 }
              : { width: 220, height: 50 }),
          }}
        />
      </View>

      <View style={styles.signoutWrapper}>
        {user.displayName && (
          <Text
            style={{
              color: colors.green,
              fontFamily: regFont.fontFamily,
              marginBottom: 5,
              ...(Platform.OS === "ios" && Platform.isPad
                ? { fontSize: 25 }
                : {}),
            }}
          >
            {user && user?.displayName}
          </Text>
        )}

        <TouchableOpacity onPress={handleSignOutAndNavigate}>
          <Text
            style={[
              styles.text,
              { fontFamily: regFont.fontFamily },

              Platform.OS === "ios" &&
                Platform.isPad && { fontSize: 22, marginTop: 6 },
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
    marginTop: 0,
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "blue",
    justifyContent: "space-evenly",
    minWidth: 100,
  },
  signoutWrapper: {
    flex: 1,
    marginTop: 4,
    ...(Platform.OS === "ios" && Platform.isPad
      ? { transform: [{ translateY: -8 }] }
      : { transform: [{ translateY: -10 }] }),
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: Platform.OS === "ios" && Platform.isPad ? 10 : {},
  },
  imageWrapper: {
    width: "80%",
    overflow: "hidden",
    backgroundColor: "yellow",
    ...(Platform.OS === "ios"
      ? Platform.isPad
        ? { transform: [{ translateY: 9 }] }
        : { transform: [{ translateY: -3 }] }
      : { transform: [{ translateY: 20 }] }),
  },
});

import React from "react";
import { Header, Icon } from "@rneui/themed";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../theme";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { useUser } from "../UserContext";
import Toast from "react-native-root-toast";

export default function HeaderBanner() {
  const navigation = useNavigation();
  const { user } = useUser();
  console.log(user, "this is the user");

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
    });
    setTimeout(() => {}, 1000);
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
        display: user ? "flex" : "none",
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
        <View>
          <TouchableOpacity
            style={{ marginTop: 4 }}
            onPress={handleSignOutAndNavigate}
          >
            <Text style={styles.text}>Sign Out</Text>
          </TouchableOpacity>
          <Text style={{ marginBottom: 10, color: colors.beige }}>
            {user && user?.displayName}
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.terraCotta,
  },
});

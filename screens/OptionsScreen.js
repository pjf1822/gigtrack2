import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, regFont } from "../theme";
import { useUser } from "../UserContext";
import Toast from "react-native-root-toast";
import { sendPasswordResetEmail, updateProfile } from "firebase/auth";

const OptionsScreen = () => {
  const { user, setUser } = useUser();
  const [displayName, setDisplayName] = useState("");

  const updateUserDisplayName = async () => {
    try {
      if (user) {
        await updateProfile(user, {
          displayName: displayName,
        });

        setUser({ ...user, displayName: displayName });

        console.log("Display name updated successfully");
      } else {
        console.error("User object is not available");
      }
    } catch (error) {
      console.error("Error updating display name:", error.message);
    }
  };

  useEffect(() => {
    if (user && user?.displayName) {
      setDisplayName(user?.displayName);
    }
  }, [user]);

  const updatePassword = async () => {
    try {
      await sendPasswordResetEmail(user?.auth, user?.email);
      Toast.show("Password reset email sent. Please check your email.", {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        backgroundColor: colors.green,
        textColor: colors.beige,
        opacity: 1,
      });
    } catch (error) {
      console.log(error.message);
      Toast.show("Something went wrong", {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        backgroundColor: colors.terraCotta,
        textColor: colors.beige,
        opacity: 1,
      });
    }

    console.log("dfd");
  };

  return (
    <View style={styles.optionsPageWrapper}>
      <Text style={styles.header}>Account Details </Text>
      <View style={styles.formWrapper}>
        <View style={styles.entryWrapper}>
          <Text style={styles.label}>Email Account</Text>
          <Text style={styles.text}>whatever.com</Text>
        </View>
        <View style={styles.entryWrapper}>
          <Text style={styles.label}>Display Name</Text>
          <TextInput style={styles.optionsPageTextInput}>
            {user?.displayName}
          </TextInput>
          <TouchableOpacity onPress={updateUserDisplayName}>
            <Text>update display name</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={updatePassword}>
            <Text>update Password</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.deleteAccountText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  optionsPageWrapper: {
    backgroundColor: colors.blue,
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  header: { color: colors.beige, fontSize: 40, fontFamily: regFont.fontFamily },
  label: { color: colors.beige, fontSize: 30, fontFamily: regFont.fontFamily },
  text: { color: colors.beige, fontSize: 25, fontFamily: regFont.fontFamily },
  entryWrapper: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  deleteAccountText: {
    color: colors.terraCotta,
  },
  optionsPageTextInput: {
    height: 40,
    width: "100%",
    borderColor: colors.blue,
    borderWidth: 2,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: colors.beige,
    borderRadius: 10,
    ...(Platform.OS === "ios" && Platform.isPad ? { width: 400 } : {}),
  },
});

export default OptionsScreen;

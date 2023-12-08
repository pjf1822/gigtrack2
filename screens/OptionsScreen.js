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
import { getAuth, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { Overlay } from "@rneui/themed";
import DeleteAccountModal from "../components/DeleteAccountModal";
import { showToast } from "../helpers";
import MyTextInput from "../components/MyTextInput";

const auth = getAuth();

const OptionsScreen = () => {
  const { user, setUser } = useUser();
  const [displayName, setDisplayName] = useState("");
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const updateUserDisplayName = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await updateProfile(currentUser, {
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
      showToast(
        "Password reset email sent. Please check your email.",
        Toast.positions.TOP,
        colors.terraCotta
      );
    } catch (error) {
      console.log(error.message);
      showToast(
        "Something went wrong",
        Toast.positions.BOTTOM,
        colors.terraCotta
      );
    }
  };

  return (
    <View style={styles.optionsPageWrapper}>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlay}
      >
        <DeleteAccountModal
          user={user}
          setUser={setUser}
          toggleOverlay={toggleOverlay}
        />
      </Overlay>
      <Text style={styles.header}>Account Details </Text>
      <View style={styles.formWrapper}>
        <View style={styles.entryWrapper}>
          <Text style={styles.label}>Email Account</Text>
          <Text style={styles.text}>{user?.email}</Text>
        </View>
        <View style={styles.entryWrapper}>
          <View style={styles.entryWrapper}>
            <Text style={styles.label}>Display Name</Text>
            <Text style={styles.text}>{user?.displayName}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={updateUserDisplayName}>
          <Text> Update user name</Text>
        </TouchableOpacity>
        <MyTextInput
          value={displayName}
          placeholder="your new display name"
          onChangeText={(value) => setDisplayName(value)}
        />
        <View
          style={{
            height: "65%",
            display: "flex",
            justifyContent: "flex-start",
            marginTop: 30,
          }}
        >
          <TouchableOpacity
            style={styles.touchableWrapper}
            onPress={updatePassword}
          >
            <Text style={[styles.touchable, { color: colors.green }]}>
              Update Password
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.touchableWrapper,
              Platform.OS === "ios" && Platform.isPad
                ? { marginTop: 20 }
                : { marginTop: 0 },
            ]}
            onPress={toggleOverlay}
          >
            <Text style={[styles.touchable, { color: colors.terraCotta }]}>
              Delete Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  optionsPageWrapper: {
    backgroundColor: colors.blue,
    height: "100%",
    display: "flex",
    paddingLeft: 20,
  },
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  header: {
    color: colors.beige,
    fontSize: 40,
    fontFamily: regFont.fontFamily,
    marginBottom: 20,
  },
  label: {
    color: colors.beige,
    fontSize: 30,
    fontFamily: regFont.fontFamily,
    marginBottom: 8,
  },
  text: { color: colors.green, fontSize: 25, fontFamily: regFont.fontFamily },
  entryWrapper: {
    paddingTop: 15,
    paddingBottom: 5,
  },
  deleteAccountText: {
    fontSize: 25,
    fontFamily: regFont.fontFamily,
  },
  touchableWrapper: {
    backgroundColor: colors.beige,
    marginBottom: 25,
    padding: 12,
    borderRadius: 25,
    display: "flex",
    alignItems: "center",
  },

  touchable: {
    ...(Platform.OS === "ios" && Platform.isPad
      ? { fontSize: 25 }
      : { fontSize: 15 }),
    fontFamily: regFont.fontFamily,
  },
  overlay: {
    width: "93%",
    maxHeight: "93%",
    backgroundColor: colors.blue,
    borderRadius: "10%",
  },
});

export default OptionsScreen;

import { View, Text, StyleSheet, TextInput, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { colors, regFont } from "../theme";
import { useUser } from "../UserContext";
import Toast from "react-native-root-toast";
import { getAuth, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { Overlay } from "@rneui/themed";
import DeleteAccountModal from "../components/DeleteAccountModal";
import { showToast } from "../helpers";
import MyButton2 from "../components/MyButton2";

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
      <View
        style={{
          height: 2,
          backgroundColor: colors.beige,
          width: "110%",
          transform: "translateX(-20px)",
        }}
      ></View>
      <View style={styles.formWrapper}>
        <View style={styles.entryWrapper}>
          <Text style={styles.label}>Email Account:</Text>
          <Text style={styles.text}>{user?.email}</Text>
        </View>
        <View style={styles.entryWrapper}>
          <Text style={styles.label}>Display Name:</Text>
          <Text style={styles.text}>{user?.displayName}</Text>
        </View>
        <View
          style={{
            height: "65%",
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
            width: "50%",
          }}
        >
          <View>
            <TextInput
              placeholder="Your new display name"
              value={displayName}
              onChangeText={(value) => setDisplayName(value)}
              style={[styles.input, { fontFamily: regFont.fontFamily }]}
            />
            <MyButton2
              onPress={updateUserDisplayName}
              text="Update Username"
              textColor={colors.green}
            />
          </View>
          <View style={{ paddingTop: 80 }}>
            <MyButton2
              onPress={updatePassword}
              text="Update Password"
              textColor={colors.green}
            />
            <MyButton2
              onPress={toggleOverlay}
              text="Delete Account"
              textColor={colors.terraCotta}
            />
          </View>
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
    width: "100%",
  },
  header: {
    color: colors.beige,
    fontSize: 35,
    fontFamily: regFont.fontFamily,
    marginBottom: 20,
  },
  label: {
    color: colors.beige,
    fontSize: 30,
    fontFamily: regFont.fontFamily,
    marginBottom: 5,
  },
  text: { color: colors.green, fontSize: 25, fontFamily: regFont.fontFamily },
  entryWrapper: {
    paddingTop: 15,
    paddingBottom: 5,
    width: "100%",
  },
  deleteAccountText: {
    fontSize: 25,
    fontFamily: regFont.fontFamily,
  },
  overlay: {
    width: "93%",
    maxHeight: "93%",
    backgroundColor: colors.blue,
    borderRadius: "10%",
  },
  input: {
    height: 40,
    borderColor: colors.green,
    borderWidth: 2,
    marginBottom: 12,
    padding: 12,
    backgroundColor: colors.beige,
    borderRadius: 10,
  },
});

export default OptionsScreen;

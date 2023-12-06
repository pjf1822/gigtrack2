import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import Toast from "react-native-root-toast";
import { colors } from "../theme";
import {
  EmailAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  deleteUser,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { deleteAllGigsByEmail } from "../api";

const DeleteAccountModal = ({ user, setUser, toggleOverlay }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const navigation = useNavigation();

  // if (!email === "" || !password === "") {
  //   const credentials = EmailAuthProvider.credential(email, password);
  //   const response = await signInWithEmailAndPassword(
  //     auth,
  //     email,
  //     password
  //   );
  //   await reauthenticateWithCredential(currentUser, credentials);
  // }
  const deleteAccount = async () => {
    try {
      const currentUser = auth?.currentUser;
      if (email !== "" && password !== "") {
        // If email and password are provided, reauthenticate before deletion
        const credentials = EmailAuthProvider.credential(email, password);
        await signInWithEmailAndPassword(auth, email, password);
        await reauthenticateWithCredential(currentUser, credentials);
      }
      await deleteUser(currentUser);
      setUser(null);
      Toast.show("Account Deleted!", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor: colors.green,
        textColor: colors.beige,
        opacity: 1,
      });
      await deleteAllGigsByEmail(currentUser?.email);

      toggleOverlay();
      navigation.navigate("Signup");
    } catch (error) {
      console.error("Error deleting account:", error);

      if (error.message.includes("auth/requires-recent-login")) {
        Toast.show("Please try again with email and password filled out", {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
          backgroundColor: colors.terraCotta,
          textColor: colors.beige,
          opacity: 1,
        });
      } else {
        Toast.show("Could not delete account", {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          backgroundColor: colors.terraCotta,
          textColor: colors.beige,
          opacity: 1,
        });
      }
    }
  };

  return (
    <View style={{}}>
      {/* <TextInput
        style={styles.inputStyle}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Enter your email"
      />
      <TextInput
        style={styles.inputStyle}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Enter your password"
        secureTextEntry={true}
      /> */}
      <Text
        style={{
          color: colors.beige,
          width: "100%",
          textAlign: "center",
        }}
      >
        ARE YOU SURE ?
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity
          style={{
            height: 120,
            // width: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={deleteAccount}
        >
          <Text
            style={{
              color: colors.terraCotta,
              width: "100%",
            }}
          >
            YES
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={toggleOverlay}
        >
          <Text
            style={{
              color: colors.beige,
              width: "100%",
            }}
          >
            NO
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeleteAccountModal;

const styles = StyleSheet.create({
  inputStyle: {
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

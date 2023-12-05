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

  const deleteAccount = async () => {
    try {
      if (user) {
        // const credentials = EmailAuthProvider.credential(email, password);
        // await signInWithEmailAndPassword(auth, email, password);
        // await deleteUser(user);
        // await reauthenticateWithCredential(user, credentials);

        await deleteUser(auth.currentUser);
        setUser(null);
        toggleOverlay();
        Toast.show("Account Deleted!", {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          backgroundColor: colors.green,
          textColor: colors.beige,
          opacity: 1,
        });
        await deleteAllGigsByEmail(user?.email);

        setTimeout(() => {
          navigation.navigate("Signup");
        }, 1000);

        Toast.show("Account Deleted Succesfully", {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          backgroundColor: colors.green,
          textColor: colors.beige,
          opacity: 1,
        });
      } else {
        console.error("User object is not available");
      }
    } catch (error) {
      console.error("Error deleting account:", error.message);
      Toast.show("Could not delete account", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor: colors.terraCotta,
        textColor: colors.beige,
        opacity: 1,
      });
    }
  };

  return (
    <View>
      <TextInput
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
      />
      <TouchableOpacity onPress={deleteAccount}>
        <Text>ARE YOU SURE</Text>
      </TouchableOpacity>
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

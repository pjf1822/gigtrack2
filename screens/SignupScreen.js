import { View, StyleSheet, Button } from "react-native";
import React, { useState } from "react";
import { useUser } from "../UserContext";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import Toast from "react-native-root-toast";
import { colors } from "../theme";
import { createUserWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [displayName, setDisplayName] = useState("");

  const auth = FIREBASE_AUTH;
  const { setUser } = useUser();
  const navigation = useNavigation();

  const isSignupDisabled = !email || !displayName || !password || !password2;

  const signUp = async () => {
    if (password !== password2) {
      let toast = Toast.show("Passwords dont match", {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        type: "error",
      });
      console.log("Passwords do not match");
      return;
    }

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        displayName
      );
      console.log(response, "the sign in response");
      const userCredentials = JSON.stringify({
        email: response?.user?.email,
        uid: response?.user?.uid,
        displayName: response?.user?.displayName,
      });
      await AsyncStorage.setItem("userCredentials", userCredentials);
      setUser(response.user);
    } catch (error) {
      console.log(error.message, "this is the error message");
      if (error.message === "Firebase: Error (auth/invalid-email).") {
        let toast = Toast.show("Invalid Email", {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
          type: "error",
        });
      } else if (
        error.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        let toast = Toast.show(
          "Password should be at least 6 characters long",
          {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            type: "error",
          }
        );
      } else {
        let toast = Toast.show(error.message, {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
          type: "error",
        });
      }
    }
  };

  return (
    <View style={{ marginTop: 100 }}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.terraCotta}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="User name"
        placeholderTextColor={colors.terraCotta}
        onChangeText={(text) => setDisplayName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={colors.terraCotta}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Type Your Password Again"
        onChangeText={(text) => setPassword2(text)}
        secureTextEntry={true}
        placeholderTextColor={colors.terraCotta}
      />
      <Button title="Signup" disabled={isSignupDisabled} onPress={signUp} />
      <Button
        title="Got to the Login Page"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Platform,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useUser } from "../UserContext";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import Toast from "react-native-root-toast";
import { colors } from "../theme";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { showToast } from "../helpers";

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
    if (isSignupDisabled) {
      showToast(
        "Please fill out all of the fields!",
        Toast.positions.BOTTOM,
        colors.terraCotta
      );

      return;
    }
    if (password !== password2) {
      showToast(
        "Passwords don't match",
        Toast.positions.TOP,
        colors.terraCotta
      );

      return;
    }

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userWithDisplayName = { ...response.user, displayName };

      await updateProfile(response.user, {
        displayName: displayName,
      });
      setUser(userWithDisplayName);

      const userCredentials = JSON.stringify({
        email: response?.user?.email,
        uid: response?.user?.uid,
        displayName: response?.user?.displayName,
      });

      await AsyncStorage.setItem("userCredentials", userCredentials);
      showToast("Account created!", Toast.positions.CENTER, colors.green);

      navigation.navigate("Home");
    } catch (error) {
      if (error.message === "Firebase: Error (auth/invalid-email).") {
        showToast("Invalid Email", Toast.positions.TOP, colors.terraCotta);
      } else if (
        error.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        showToast(
          "Passwords should be at least 6 characters long",
          Toast.positions.TOP,
          colors.terraCotta
        );
      } else if (
        error.message === "Firebase: Error (auth/network-request-failed)."
      ) {
        showToast(
          "Passwords should be at least 6 characters long",
          Toast.positions.TOP,
          colors.terraCotta
        );
      } else if (
        error.message === "Firebase: Error (auth/email-already-in-use)."
      ) {
        showToast(
          "An account under that name already exists",
          Toast.positions.TOP,
          colors.terraCotta
        );
      } else {
        showToast(error.message, Toast.positions.TOP, colors.terraCotta);
      }
    }
  };

  return (
    <View
      style={{
        paddingTop: 180,
        display: "flex",
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: colors.blue,
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Image
        source={require("../assets/logo-no-background.png")}
        style={{
          width: "60%",
          height: 80,
          borderRadius: 10,
        }}
        resizeMode="contain"
      />
      <View
        style={{
          width: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          style={email !== "" ? styles.input : styles.inputEmpty}
          placeholder="Email"
          placeholderTextColor={colors.terraCotta}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={displayName !== "" ? styles.input : styles.inputEmpty}
          placeholder="User name"
          placeholderTextColor={colors.terraCotta}
          onChangeText={(text) => setDisplayName(text)}
        />
        <TextInput
          style={password !== "" ? styles.input : styles.inputEmpty}
          placeholder="Password"
          placeholderTextColor={colors.terraCotta}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <TextInput
          style={password2 !== "" ? styles.input : styles.inputEmpty}
          placeholder="Type Your Password Again"
          onChangeText={(text) => setPassword2(text)}
          secureTextEntry={true}
          placeholderTextColor={colors.terraCotta}
        />
        <TouchableOpacity
          style={[
            isSignupDisabled ? styles.disabledButton : styles.button,
            {
              borderWidth: 3,
              borderColor: isSignupDisabled ? colors.terraCotta : colors.beige,
            },
          ]}
          onPress={signUp}
        >
          <Text
            style={[
              isSignupDisabled ? styles.buttonDisabledText : styles.buttonText,
            ]}
          >
            Signup
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginBottom: 40,
          width: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={{ color: colors.beige }}>Go to Login Page</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  input: {
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
  inputEmpty: {
    height: 40,
    width: "100%",
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: colors.beige,
    borderRadius: 10,
    ...(Platform.OS === "ios" && Platform.isPad ? { width: 400 } : {}),
  },
  button: {
    backgroundColor: colors.green,
    height: 40,
    width: "100%",
    paddingHorizontal: 8,
    color: colors.beige,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    outline: "none",
    borderRadius: 10,
    ...(Platform.OS === "ios" && Platform.isPad ? { width: 400 } : {}),
  },
  disabledButton: {
    backgroundColor: colors.beige,
    height: 40,
    width: "100%",
    paddingHorizontal: 8,
    color: colors.terraCotta,
    borderRadius: 10,
    outline: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...(Platform.OS === "ios" && Platform.isPad ? { width: 400 } : {}),
  },
  buttonDisabledText: {
    color: colors.terraCotta,
    fontWeight: "bold",
  },
  buttonText: {
    color: colors.beige,
    fontWeight: "bold",
  },
});

import { View, Image } from "react-native";
import React, { useState } from "react";
import { useUser } from "../UserContext";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import Toast from "react-native-root-toast";
import { colors } from "../theme";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { showToast } from "../helpers";
import MyTextInput from "../components/MyTextInput";
import MyButton from "../components/MyButton";
import LoginSignup from "../components/LoginSignup";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [displayName, setDisplayName] = useState("");

  const auth = FIREBASE_AUTH;
  const { setUser } = useUser();
  const navigation = useNavigation();

  const isSignupDisabled = !email || !password || !password2;

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
    <LoginSignup
      loginOrSignup={"Signup"}
      email={email}
      password={password}
      displayName={displayName}
      password2={password2}
      setEmail={setEmail}
      setPassword={setPassword}
      setDisplayName={setDisplayName}
      setPassword2={setPassword2}
      formFunction={signUp}
      functionDisabled={isSignupDisabled}
    />
  );
};

export default SignupScreen;

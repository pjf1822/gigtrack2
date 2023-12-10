import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useUser } from "../UserContext";
import Toast from "react-native-root-toast";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../theme";
import { showToast } from "../helpers";

import LoginSignup from "../components/LoginSignup";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = FIREBASE_AUTH;
  const { setUser } = useUser();
  const navigation = useNavigation();

  const isLoginDisabled = !email || !password;

  const signIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response?.user?.email) {
        showToast("Sign-in Successful!", Toast.positions.TOP, colors.green);
        setTimeout(() => {}, 1000);
      }

      const userCredentials = JSON.stringify({
        email: response?.user?.email,
        uid: response?.user?.uid,
      });
      await AsyncStorage.setItem("userCredentials", userCredentials);
      setUser(response.user);
      navigation.navigate("Home");
    } catch (error) {
      console.log("Sign-in error:", error.message);

      showToast(
        "Sign-in failed. Check your credentials",
        Toast.positions.TOP,
        colors.terraCotta
      );
    }
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);

      showToast(
        "Sent a reset email successfully!",
        Toast.positions.BOTTOM,
        colors.green
      );
    } catch (error) {
      if (
        error.message === "Firebase: Error (auth/missing-email)." ||
        "Firebase: Error (auth/invalid-email)."
      ) {
        showToast(
          "We don't have an account with this email!",
          Toast.positions.BOTTOM,
          colors.terraCotta
        );
      }
    }
  };
  return (
    <LoginSignup
      loginOrSignup={"Login"}
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      formFunction={signIn}
      functionDisabled={isLoginDisabled}
      handleForgotPassword={handleForgotPassword}
    />
  );
};

export default LoginScreen;

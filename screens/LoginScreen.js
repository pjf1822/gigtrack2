import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
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
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../theme";
import { showToast } from "../helpers";
import MyTextInput from "../components/MyTextInput";
import MyButton from "../components/MyButton";

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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
            width: "61%",
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
          <MyTextInput
            value={email}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor={colors.terraCotta}
          />

          <MyTextInput
            value={password}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor={colors.terraCotta}
            secureTextEntry={true}
          />

          <MyButton
            isDisabled={isLoginDisabled}
            onPress={signIn}
            text="Login"
          />
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password</Text>
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
          <MyButton
            onPress={() => navigation.navigate("Signup")}
            text="Go to Signup Page"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  forgotPasswordText: {
    color: colors.terraCotta,
    fontSize: 14,
    textAlign: "center",
    marginTop: 15,
  },
});

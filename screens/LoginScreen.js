import { View, TextInput, StyleSheet, Text, Image } from "react-native";
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
        let toast = Toast.show("Sign-in successful!", {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
          backgroundColor: colors.green,
          textColor: colors.beige,
          opacity: 1,
        });

        setTimeout(() => {}, 1000);
      }

      const userCredentials = JSON.stringify({
        email: response?.user?.email,
        uid: response?.user?.uid,
      });
      await AsyncStorage.setItem("userCredentials", userCredentials);
      setUser(response.user);
    } catch (error) {
      console.log("Sign-in error:", error.message);

      let toast = Toast.show("Sign-in failed. Check your credentials.", {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: colors.terraCotta,
        textColor: colors.beige,
        opacity: 1,
      });
    }
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);

      let toast = Toast.show("Sent a reset email successfully!", {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: colors.green,
        textColor: colors.beige,
        opcaity: 1,
      });
    } catch (error) {
      console.error("Password reset error:", error.message);
      if (
        error.message === "Firebase: Error (auth/missing-email)." ||
        "Firebase: Error (auth/invalid-email)."
      ) {
        let toast = Toast.show("We dont have an account with this email", {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
          backgroundColor: colors.terraCotta,
          textColor: colors.beige,
          opcaity: 1,
        });
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
      <View style={{ width: "80%" }}>
        <TextInput
          style={email !== "" ? styles.input : styles.inputEmpty}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor={colors.terraCotta}
        />
        <TextInput
          style={password !== "" ? styles.input : styles.inputEmpty}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor={colors.terraCotta}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={[isLoginDisabled ? styles.disabledButton : styles.button]}
          onPress={signIn}
        >
          <Text
            style={
              isLoginDisabled ? styles.buttonDisabledText : styles.buttonText
            }
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: 40, width: "80%" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={{ color: colors.beige }}>Go to Signup Page</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

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
  },
  inputEmpty: {
    height: 40,
    width: "100%",
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: colors.beige,
    borderRadius: 10,
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
  },
  buttonDisabledText: {
    color: colors.terraCotta,
    fontWeight: "bold",
  },
  buttonText: {
    color: colors.beige,
    fontWeight: "bold",
  },
  forgotPasswordText: {
    color: colors.terraCotta,
    fontSize: 14,
    textAlign: "center",
    marginTop: 15,
  },
});

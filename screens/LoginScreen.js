import { View, TextInput, StyleSheet, Button, Text } from "react-native";
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
        paddingTop: 100,
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: colors.beige,
      }}
    >
      <View>
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
      <View style={{ marginBottom: 40 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.signupButtonText}>Go to Signup Page</Text>
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
    fontFamily: "Inter-Black",
  },
  inputEmpty: {
    height: 40,
    width: "100%",
    borderColor: colors.terraCotta,
    borderWidth: 2,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: colors.beige,
  },
  button: {
    backgroundColor: colors.green,
    height: 40,
    width: "100%",
    borderWidth: 4,
    paddingHorizontal: 8,
    borderColor: colors.blue,
    color: colors.beige,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: colors.beige,
    height: 40,
    width: "100%",
    borderWidth: 4,
    paddingHorizontal: 8,
    borderColor: colors.terraCotta,
    color: colors.terraCotta,
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
    fontFamily: "Inter-Black",
  },
  forgotPasswordText: {
    color: colors.terraCotta,
    fontSize: 14,
    textAlign: "center",
    marginTop: 15,
  },
});

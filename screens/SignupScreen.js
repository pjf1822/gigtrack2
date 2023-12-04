import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import React, { useState } from "react";
import { useUser } from "../UserContext";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import Toast from "react-native-root-toast";
import { colors } from "../theme";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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
    if (isSignupDisabled) {
      let toast = Toast.show("Please fill out all of the fields", {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: colors.terraCotta,
        textColor: colors.beige,
        opacity: 1,
      });
      return;
    }
    if (password !== password2) {
      let toast = Toast.show("Passwords dont match", {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: colors.terraCotta,
        textColor: colors.beige,
        opacity: 1,
      });
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
      let toast = Toast.show("Account created!", {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: colors.green,
        textColor: colors.beige,
        opacity: 1,
      });
    } catch (error) {
      if (error.message === "Firebase: Error (auth/invalid-email).") {
        let toast = Toast.show("Invalid Email", {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
          backgroundColor: colors.terraCotta,
          textColor: colors.beige,
          opacity: 1,
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
            backgroundColor: colors.terraCotta,
            textColor: colors.beige,
            opacity: 1,
          }
        );
      } else {
        console.log(error.message, "thi si the firbase problem");
        let toast = Toast.show(error.message, {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
          backgroundColor: colors.terraCotta,
          textColor: colors.beige,
          opacity: 1,
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
          style={[isSignupDisabled ? styles.disabledButton : styles.button]}
          onPress={signUp}
        >
          <Text
            style={
              isSignupDisabled ? styles.buttonDisabledText : styles.buttonText
            }
          >
            Signup
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 40, width: "80%" }}>
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
});

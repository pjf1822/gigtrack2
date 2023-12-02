import { View, TextInput, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { Button } from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useUser } from "../UserContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = FIREBASE_AUTH;
  const { setUser } = useUser();

  const signIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const userCredentials = JSON.stringify({
        email: response?.user?.email,
        uid: response?.user?.uid,
      });
      await AsyncStorage.setItem("userCredentials", userCredentials);
      setUser(response.user);
    } catch (error) {
      console.log(error);
    }
  };
  const signUp = async () => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userCredentials = JSON.stringify({
        email: response?.user?.email,
        uid: response?.user?.uid,
      });
      await AsyncStorage.setItem("userCredentials", userCredentials);
      setUser(response.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ marginTop: 100 }}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" onPress={signIn} />
      <Button title="Signup" onPress={signUp} />
    </View>
  );
};

export default LoginScreen;

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

import { View, Text, Image, StyleSheet, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import React from "react";
import MyTextInput from "./MyTextInput";
import { useNavigation } from "@react-navigation/native";
import MyButton from "./MyButton";
import { colors } from "../theme";

const LoginSignup = ({
  loginOrSignup,
  email,
  password,
  setEmail,
  setPassword,
  formFunction,
  displayName = "",
  setDisplayName = () => {},
  password2 = "",
  setPassword2 = () => {},
  functionDisabled,
  handleForgotPassword = () => {},
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.signupFormWrapper}>
      <Image
        source={require("../assets/logo-no-background.png")}
        style={{
          width: "60%",
          height: 170,
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
        {loginOrSignup === "Signup" && (
          <MyTextInput
            value={displayName}
            placeholder="User name"
            onChangeText={(text) => setDisplayName(text)}
            placeholderTextColor={"black"}
          />
        )}

        <MyTextInput
          value={password}
          placeholder="Password"
          placeholderTextColor={colors.terraCotta}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        {loginOrSignup === "Signup" && (
          <MyTextInput
            value={password2}
            placeholder="Type Your Password Again"
            onChangeText={(text) => setPassword2(text)}
            secureTextEntry={true}
            placeholderTextColor={colors.terraCotta}
          />
        )}

        <MyButton
          isDisabled={functionDisabled}
          onPress={formFunction}
          text={loginOrSignup === "Login" ? "Login" : "Sign up"}
        />
        {loginOrSignup === "Login" && (
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password</Text>
          </TouchableOpacity>
        )}
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
          onPress={() =>
            navigation.navigate(loginOrSignup === "Login" ? "Signup" : "Login")
          }
          text={`Go to ${loginOrSignup === "Login" ? "Signup" : "Login"} Page`}
        />
      </View>
    </View>
  );
};

export default LoginSignup;

const styles = StyleSheet.create({
  forgotPasswordText: {
    color: colors.terraCotta,
    fontSize: 14,
    textAlign: "center",
    marginTop: 15,
    ...(Platform.OS === "ios" && Platform.isPad
      ? { fontSize: 22 }
      : { fontSize: 16 }),
  },
  signupFormWrapper: {
    paddingTop: 180,
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.blue,
    alignItems: "center",
    flexDirection: "column",
  },
});

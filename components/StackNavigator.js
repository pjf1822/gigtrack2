import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import LoginScreen from "../screens/LoginScreen";
import { useUser } from "../UserContext";
import SignupScreen from "../screens/SignupScreen";
import OptionsScreen from "../screens/OptionsScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const { user } = useUser();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!user ? (
        <>
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Signup">
            {(props) => <SignupScreen {...props} />}
          </Stack.Screen>
        </>
      ) : (
        <Stack.Screen name="Home" component={HomeScreen} />
      )}
      <Stack.Screen name="Details" component={DetailScreen} />
      <Stack.Screen name="Options" component={OptionsScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;

import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import { useUser } from "../UserContext";
import OptionsScreen from "../screens/OptionsScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const { user } = useUser();
  const [firstTimeUser, setFirstTimeUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("firstTimeUser").then((value) => {
      setFirstTimeUser(value !== null ? false : true);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
      />
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!user ? (
        <>
          {firstTimeUser ? (
            <>
              <Stack.Screen name="Signup">
                {(props) => <SignupScreen {...props} />}
              </Stack.Screen>
              <Stack.Screen name="Login">
                {(props) => <LoginScreen {...props} />}
              </Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen name="Login">
                {(props) => <LoginScreen {...props} />}
              </Stack.Screen>
              <Stack.Screen name="Signup">
                {(props) => <SignupScreen {...props} />}
              </Stack.Screen>
            </>
          )}
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

import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBanner from "./components/HeaderBanner";
import { useState, useEffect } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { UserProvider, useUser } from "./UserContext";
import StackNavigator from "./components/StackNavigator";
import { colors } from "./theme";
import * as Font from "expo-font";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  // SPLASH SCREEN THINGS

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Mont: require("./assets/Montserrat/static/Montserrat-Regular.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.beige }}>
      <RootSiblingParent>
        <NavigationContainer>
          <UserProvider>
            <MainContent />
          </UserProvider>
        </NavigationContainer>
      </RootSiblingParent>
    </SafeAreaView>
  );
}

const MainContent = () => {
  const { user } = useUser();

  return (
    <>
      {user && <HeaderBanner />}
      <StackNavigator />
    </>
  );
};

const Loader = () => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.blue,
    }}
  >
    <ActivityIndicator size="large" color={colors.green} />
  </View>
);

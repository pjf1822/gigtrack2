import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBanner from "./components/HeaderBanner";
import * as SplashScreen from "expo-splash-screen";
import { useState, useEffect, useCallback } from "react";
import { Image, ActivityIndicator, View } from "react-native";
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
        // Pre-load fonts, make any API calls you need to do here
        // await Font.loadAsync(Entypo.font);

        await Font.loadAsync({
          Mont: require("./assets/Montserrat/static/Montserrat-Regular.ttf"),
        });
        // await new Promise((resolve) => setTimeout(resolve, 400));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

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

const SplashScreenImage = ({ source, resizeMode }) => (
  <Image source={source} resizeMode={resizeMode} />
);

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

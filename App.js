import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBanner from "./components/HeaderBanner";
import * as SplashScreen from "expo-splash-screen";
import { useState, useEffect, useCallback } from "react";
import { Image } from "react-native";
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
        await new Promise((resolve) => setTimeout(resolve, 400));
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
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <SplashScreenImage
        source={require("./assets/logo-color.png")}
        resizeMode="center"
      />
    );
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

import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBanner from "./components/HeaderBanner";
import * as SplashScreen from "expo-splash-screen";
import { useState, useEffect, useCallback } from "react";
import { Image } from "react-native";
import { UserProvider } from "./UserContext";
import StackNavigator from "./components/StackNavigator";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  // SPLASH SCREEN THINGS
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
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
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    // Customize the SplashScreenImage component with your image source
    return (
      <SplashScreenImage
        source={require("./assets/hijab.jpg")}
        resizeMode="contain"
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F4F1DE" }}>
      <RootSiblingParent>
        <NavigationContainer>
          <UserProvider>
            <HeaderBanner />

            <StackNavigator />
          </UserProvider>
        </NavigationContainer>
      </RootSiblingParent>
    </SafeAreaView>
  );
}

const SplashScreenImage = ({ source, resizeMode }) => (
  <Image
    source={source}
    resizeMode={resizeMode}
    style={{ flex: 1, width: undefined, height: undefined }}
  />
);

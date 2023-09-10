// Packages Imports (from node_modules)
import { NavigationContainer, LinkingOptions } from "@react-navigation/native";
import * as SplashScreeen from "expo-splash-screen";
import { FadeIn } from "react-native-reanimated";

// Local Imports (components/types/utils)
import AnimatedView from "../components/Animated/AnimatedView";
import AuthNavigator from "../navigation/AuthNavigator";

// Named Imports
import { AppStackParamsList } from "../navigation/NavigationTypes";
import { ChildrenProps } from "../types/GlobalTypes";
import { useAppSelector } from "../store/reduxHooks";

// functional component for NavigationProvider
function NavigationProvider(props: ChildrenProps) {
  // Destructuring props
  const { children } = props;

  // get the theme
  const theme = useAppSelector(state => state.theme);

  // hides the splash screen when the app is ready
  const onAppReady = () => SplashScreeen.hideAsync();

  const config: LinkingOptions<AppStackParamsList>["config"] = {
    screens: {},
  };

  const linking = {
    prefixes: ["https://socio.com/", "socio://"],
    config,
  };

  // render
  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AnimatedView onLayout={onAppReady} style={{ flex: 1 }} entering={FadeIn}>
        <AuthNavigator />
        {children}
      </AnimatedView>
    </NavigationContainer>
  );
}

// exports
export default NavigationProvider;

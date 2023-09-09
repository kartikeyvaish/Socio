// Packages Imports
import { useEffect } from "react";
import { Appearance, Platform, StatusBar, StatusBarStyle, StyleSheet } from "react-native";
import { Portal, Provider as PaperProvider } from "react-native-paper";
import * as NavigationBar from "expo-navigation-bar";

// Local Imports
import themeActions from "../store/theme/actions";

// Named imports
import { ChildrenProps } from "../types/GlobalTypes";
import { useAppDispatch, useAppSelector } from "../store/reduxHooks";

// function component for ThemeProvider
function ThemeProvider(props: ChildrenProps) {
  // Destructuring props
  const { children } = props;

  // Holds the Redux State
  const theme = useAppSelector(state => state.theme);

  // Dispatcher to call actions on the store
  const dispatcher = useAppDispatch();

  // Bar Style
  const barStyle: StatusBarStyle = theme.dark === false ? "dark-content" : "light-content";

  // StatusBar background color
  const barBackgroundColor = theme.colors.background;

  // Change/Set navigation bar colors according to the theme
  useEffect(() => {
    // Change the navigation bar color on Android, if the theme changes
    if (Platform.OS === "android") NavigationBar.setBackgroundColorAsync(theme.colors.background);
  }, [theme]);

  // Light/Dark mode change listener
  useEffect(() => {
    // Subscribe to changes
    const subscription = Appearance.addChangeListener(({ colorScheme }: any) =>
      dispatcher(themeActions.changeMode(colorScheme))
    );

    // on unmount remove the listener
    return () => {
      if (subscription.remove !== undefined) subscription.remove();
    };
  }, []);

  // render
  return (
    <>
      {/* StatusBar */}
      <StatusBar barStyle={barStyle} backgroundColor={barBackgroundColor} animated={true} />

      {/* React Native Paper Theme */}
      <PaperProvider>
        <Portal>
          {/* children components */}
          {children}
        </Portal>
      </PaperProvider>
    </>
  );
}

// exports
export default ThemeProvider;

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

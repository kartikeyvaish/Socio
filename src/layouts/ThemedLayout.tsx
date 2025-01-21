// Packages Imports
import React, { useEffect } from 'react';
import { Appearance, Platform, StatusBar, StatusBarStyle } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

// Local Imports
import useAppFocus from '../hooks/useAppFocus';

// Named imports
import { ChildrenProps } from '../types/global';
import { themeSlice } from '../store/feature/themeSlice';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';

// function component for ThemedLayout
function ThemedLayout(props: ChildrenProps) {
  // Destructuring props
  const { children } = props;

  // Holds the Redux State
  const theme = useAppSelector((state) => state.theme);

  // Dispatcher to call actions on the store
  const dispatcher = useAppDispatch();

  // Bar Style
  const barStyle: StatusBarStyle = theme.dark === false ? 'dark-content' : 'light-content';

  // StatusBar background color
  const barBackgroundColor = theme.colors.background;

  // Change/Set navigation bar colors according to the theme
  useEffect(() => {
    // Change the navigation bar color on Android, if the theme changes
    if (Platform.OS === 'android') NavigationBar.setBackgroundColorAsync(theme.colors.background);
  }, [theme]);

  const appFocused = useAppFocus();

  // Light/Dark mode change listener
  useEffect(() => {
    // Subscribe to changes
    const subscription = Appearance.addChangeListener((preferences) => {
      if (appFocused === 'active') {
        dispatcher(themeSlice.actions.toggleThemeByColorScheme(preferences.colorScheme));
      }
    });

    // on unmount remove the listener
    return () => {
      if (typeof subscription.remove === 'function') subscription.remove();
    };
  }, [appFocused]);

  // render
  return (
    <>
      <StatusBar barStyle={barStyle} backgroundColor={barBackgroundColor} animated={true} />

      {children}
    </>
  );
}

// exports
export default ThemedLayout;

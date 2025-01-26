// Packages Imports
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

// Auth Navigator Screen Params
export type AuthStackParamsList = {
  LoginScreen: undefined;
};

// App Navigator Screen Params
export type AppStackParamsList = {
  HomeScreen: undefined;
};

// Tab Navigator Screen Params
export type TabsParamsList = {};

// Props for Auth Navigator's Screens
export type AuthScreenProps<Screen extends keyof AuthStackParamsList> = StackScreenProps<
  AuthStackParamsList,
  Screen
>;

// Props for App Navigator's Screens
export type AppScreenProps<Screen extends keyof AppStackParamsList> = StackScreenProps<
  AppStackParamsList,
  Screen
>;

// Props for App Navigator's Screens
export type TabScreenProps<Screen extends keyof TabsParamsList> = BottomTabScreenProps<
  TabsParamsList,
  Screen
>;

// Screen Names types for AuthNavigator
export type AuthScreenNamesTypes = {
  [key in keyof AuthStackParamsList]: any;
};

// Screen Names types for AppNavigator
export type AppScreenNamesTypes = {
  [key in keyof AppStackParamsList]: any;
};

// Packages Imports (from node_modules)
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { Image } from 'expo-image';

// Local Imports (components/types/utils)
import colorPallete from '../constants/colorPallete';
import HomeScreen from '../screens/HomeScreen';
import Icon from '../components/Icon';
import ProfileScreen from '../screens/profile/ProfileScreen';

// Named Imports
import { DEFAULT_USER_IMAGE } from '../constants/ui';
import { TabsParamsList } from './types';
import { useAppSelector } from '../store/storeHooks';

// interface for BottomTabNavigator component
export interface BottomTabNavigatorProps {}

// Create TabNavigator
const Tab = createBottomTabNavigator<TabsParamsList>();

// functional component for BottomTabNavigator
function BottomTabNavigator(props: BottomTabNavigatorProps) {
  // Destructuring props
  const {} = props;

  const { colors } = useAppSelector((state) => state.theme);

  const { user } = useAppSelector((state) => state.auth);

  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    headerTintColor: colors.text,
    headerTransparent: true,
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.text,
    tabBarActiveBackgroundColor: colors.background,
    tabBarInactiveBackgroundColor: colors.background
  };

  // render
  return (
    <Animated.View style={{ flex: 1 }}>
      <Tab.Navigator initialRouteName="HomeTabScreen" id={undefined} screenOptions={screenOptions}>
        <Tab.Screen
          name={'HomeTabScreen'}
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <Icon
                family={'Ionicons'}
                name={focused ? 'home' : 'home-outline'}
                color={color}
                size={24}
              />
            )
          }}
        />
        <Tab.Screen
          name={'ProfileScreen'}
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Me',
            tabBarIcon: ({ focused }) => (
              <Image
                source={{ uri: user?.profile_picture || DEFAULT_USER_IMAGE }}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: focused ? 1 : 0,
                  borderColor: colorPallete.primary
                }}
              />
            )
          }}
        />
      </Tab.Navigator>
    </Animated.View>
  );
}

// exports
export default BottomTabNavigator;

// styles for BottomTabNavigator
const styles = StyleSheet.create({
  container: {}
});

import React from "react";
import { View, StyleSheet } from "react-native";
import { Easing } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";

import Avatar from "./../components/Avatar";
import ChangePassword from "../screens/ChangePassword";
import Chats from "./../screens/Chats";
import ChatRoom from "./../screens/ChatRoom";
import ColorPallete from "../config/ColorPallete";
import Comments from "../screens/Comments";
import CreatePost from "../screens/CreatePost";
import DiscoverScreen from "../screens/DiscoverScreen";
import EditProfile from "./../screens/EditProfile";
import FollowRequests from "../screens/FollowRequests";
import Followers from "./../screens/Followers";
import Following from "./../screens/Following";
import HomeScreen from "../screens/HomeScreen";
import Icon from "../components/Icon";
import Likes from "../screens/Likes";
import Notifications from "../screens/Notifications";
import NewChatScreen from "../screens/NewChatScreen";
import NewPostScreen from "../screens/NewPostScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PersonProfile from "../screens/PersonProfile";
import PostDetails from "../screens/PostDetails";
import Settings from "../screens/Settings";
import ScreenNames from "./ScreenNames";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const PeopleTabs = createMaterialTopTabNavigator();

function BottomTabs() {
  const { colors, dark } = useTheme();
  const ProfilePicture = useSelector(
    (state) => state.AuthState.User.ProfilePicture
  );

  return (
    <Tab.Navigator
      screenOptions={{
        style: {
          backgroundColor: colors.background,
          borderTopWidth: 0,
          elevation: 20,
        },
        headerShown: false,
        showLabel: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        activeTintColor: colors.primary,
        inactiveTintColor: colors.text,
        tabStyle: {
          borderColor: colors.background,
        },
        tabBarStyle: {
          backgroundColor: dark ? ColorPallete.black : ColorPallete.white,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          height: 60,
          elevation: 20,
          overflow: "hidden",
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              Name="Ionicons"
              IconName={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="DiscoverScreen"
        component={DiscoverScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon Name="Feather" IconName="search" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="NewPostScreen"
        component={NewPostScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <LinearGradient
              colors={["rgba(0,0,0,.5)", "transparent"]}
              style={styles.MiddleCard}
              start={[0, 1]}
              end={[1, 0]}
            >
              <Icon
                Name="AntDesign"
                IconName={focused ? "pluscircle" : "pluscircleo"}
                color={"white"}
              />
            </LinearGradient>
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              Name="FontAwesome"
              IconName={focused ? "bell" : "bell-o"}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerTitle: "Profile",
          headerStyle: {
            borderBottomWidth: 0,
            elevation: 0,
          },
          tabBarIcon: ({ color, focused }) => (
            <Avatar
              uri={ProfilePicture}
              borderColor={color}
              showBorder={focused}
              size={30}
              borderWidth={2}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function ListPeople(props) {
  return (
    <PeopleTabs.Navigator
      tabBarPosition="top"
      backBehavior="none"
      initialRouteName={props?.route?.params?.initialRoute || "Followers"}
    >
      <PeopleTabs.Screen
        name="Followers"
        component={Followers}
        initialParams={{ ...props?.route?.params } || {}}
      />
      <PeopleTabs.Screen
        name="Following"
        component={Following}
        initialParams={props?.route?.params || {}}
      />
    </PeopleTabs.Navigator>
  );
}

function AppNavigator() {
  const { colors } = useTheme();

  const timingConfig = {
    animation: "timing",
    config: {
      duration: 200,
      easing: Easing.linear,
    },
  };

  const Horizantal = {
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    transitionSpec: {
      open: timingConfig,
      close: timingConfig,
    },
  };

  const HeaderBarConfig = {
    headerShown: true,
    headerTintColor: colors.text,
    headerStyle: {
      backgroundColor: colors.background,
    },
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeTabs" component={BottomTabs} />
        <Stack.Screen
          name={ScreenNames.CreatePost}
          component={CreatePost}
          options={({ route }) => ({
            ...HeaderBarConfig,
            ...Horizantal,
            title: "New Post",
          })}
        />
        <Stack.Screen
          name={ScreenNames.PersonProfile}
          component={PersonProfile}
          options={({ route }) => ({
            ...HeaderBarConfig,
            ...Horizantal,
            title: route.params.title,
          })}
        />
        <Stack.Screen
          name={ScreenNames.PostDetails}
          component={PostDetails}
          options={({ route }) => ({
            ...HeaderBarConfig,
            ...Horizantal,
            title: route.params.title,
          })}
        />
        <Stack.Screen
          name={ScreenNames.FollowRequests}
          component={FollowRequests}
          options={({ route }) => ({
            ...HeaderBarConfig,
            ...Horizantal,
            title: "Follow Requests",
          })}
        />
        <Stack.Screen
          name={ScreenNames.Chats}
          component={Chats}
          options={({ route }) => ({
            ...HeaderBarConfig,
            ...Horizantal,
            title: "Chats",
          })}
        />
        <Stack.Screen
          name={ScreenNames.ChatRoom}
          component={ChatRoom}
          options={({ route }) => ({
            ...HeaderBarConfig,
            ...Horizantal,
            title: route.params.title,
          })}
        />
        <Stack.Screen
          name={ScreenNames.NewChatScreen}
          component={NewChatScreen}
          options={({ route }) => ({
            ...HeaderBarConfig,
            ...Horizantal,
            title: "New Message",
          })}
        />
        <Stack.Screen
          name={ScreenNames.ListPeople}
          component={ListPeople}
          options={({ route }) => ({
            ...HeaderBarConfig,
            ...Horizantal,
            title: "People",
          })}
        />
        <Stack.Screen
          name={ScreenNames.Comments}
          component={Comments}
          options={({ route }) => ({
            ...HeaderBarConfig,
            ...Horizantal,
          })}
        />
        <Stack.Screen
          name={ScreenNames.Likes}
          component={Likes}
          options={({ route }) => ({
            ...HeaderBarConfig,
            ...Horizantal,
          })}
        />
        <Stack.Screen
          name={ScreenNames.EditProfile}
          component={EditProfile}
          options={({ route }) => ({
            ...HeaderBarConfig,
            ...Horizantal,
            title: "Edit Profile",
          })}
        />
        <Stack.Screen
          name={ScreenNames.Settings}
          component={Settings}
          options={({ route }) => ({
            ...HeaderBarConfig,
            ...Horizantal,
            title: ScreenNames.Settings,
          })}
        />
        <Stack.Screen
          name={ScreenNames.ChangePassword}
          component={ChangePassword}
          options={({ route }) => ({
            ...HeaderBarConfig,
            ...Horizantal,
            title: "Change Password",
          })}
        />
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  MiddleCard: {
    backgroundColor: ColorPallete.primary,
    padding: 10,
    borderRadius: 15,
  },
});

export default AppNavigator;

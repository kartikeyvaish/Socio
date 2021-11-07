import React from "react";
import { View } from "react-native";
import { Easing } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";

import Avatar from "./../components/Avatar";
import ChangePassword from "../screens/ChangePassword";
import Chats from "./../screens/Chats";
import ChatRoom from "./../screens/ChatRoom";
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

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const PeopleTabs = createMaterialTopTabNavigator();

function BottomTabs() {
  const { colors } = useTheme();
  const ProfilePicture = useSelector((state) => state.User.ProfilePicture);

  return (
    <Tab.Navigator
      screenOptions={{
        style: {
          backgroundColor: colors.background,
          borderTopWidth: 0,
          elevation: 10,
        },
        headerShown: false,
        showLabel: false,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: colors.background,
        tabBarInactiveBackgroundColor: colors.background,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        activeTintColor: colors.primary,
        inactiveTintColor: colors.text,
        tabStyle: {
          borderColor: colors.background,
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
            <Icon
              Name="AntDesign"
              IconName={focused ? "pluscircle" : "pluscircleo"}
              color={color}
            />
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
          name="CreatePost"
          component={CreatePost}
          options={({ route }) => ({
            ...HeaderBarConfig,
            ...Horizantal,
            title: "New Post",
          })}
        />
        <Stack.Screen
          name="PersonProfile"
          component={PersonProfile}
          options={({ route }) => ({
            ...HeaderBarConfig,
            ...Horizantal,
            title: route.params.title,
          })}
        />
        <Stack.Screen
          name="PostDetails"
          component={PostDetails}
          options={({ route }) => ({
            ...HeaderBarConfig,
            ...Horizantal,
            title: route.params.title,
          })}
        />
        <Stack.Screen
          name="FollowRequests"
          component={FollowRequests}
          options={({ route }) => ({
            ...HeaderBarConfig,
            ...Horizantal,
            title: "Follow Requests",
          })}
        />
        <Stack.Screen
          name="Chats"
          component={Chats}
          options={({ route }) => ({
            ...HeaderBarConfig,
            ...Horizantal,
            title: "Chats",
          })}
        />
        <Stack.Screen
          name="ChatRoom"
          component={ChatRoom}
          options={({ route }) => ({
            ...HeaderBarConfig,
            ...Horizantal,
            title: route.params.title,
          })}
        />
        <Stack.Screen
          name="NewChatScreen"
          component={NewChatScreen}
          options={({ route }) => ({
            ...HeaderBarConfig,
            ...Horizantal,
            title: "New Message",
          })}
        />
        <Stack.Screen
          name="ListPeople"
          component={ListPeople}
          options={({ route }) => ({
            ...HeaderBarConfig,
            ...Horizantal,
            title: "People",
          })}
        />
        <Stack.Screen
          name="Comments"
          component={Comments}
          options={({ route }) => ({
            ...HeaderBarConfig,
            ...Horizantal,
          })}
        />
        <Stack.Screen
          name="Likes"
          component={Likes}
          options={({ route }) => ({
            ...HeaderBarConfig,
            ...Horizantal,
          })}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={({ route }) => ({
            ...HeaderBarConfig,
            ...Horizantal,
            title: "Edit Profile",
          })}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={({ route }) => ({
            ...HeaderBarConfig,
            ...Horizantal,
            title: "Settings",
          })}
        />
        <Stack.Screen
          name="ChangePassword"
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

export default AppNavigator;

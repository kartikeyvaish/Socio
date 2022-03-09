// Packages Imports
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { useTheme } from "@react-navigation/native";

// Screen imports
import AboutScreen from "../screens/Misc/AboutScreen";
import AccountScreen from "../screens/Misc/AccountScreen";
import AppearanceScreen from "../screens/Misc/AppearanceScreen";
import ChangePasswordScreen from "../screens/Auth/ChangePasswordScreen";
import ChatsScreen from "../screens/Chats/ChatsScreen";
import CreatePostScreen from "../screens/NewPost/CreatePostScreen";
import CommentsScreen from "../screens/Comments/CommentsScreen";
import EditProfileScreen from "../screens/Profile/EditProfileScreen";
import FollowersScreen from "../screens/Profile/FollowersScreen";
import FollowingScreen from "../screens/Profile/FollowingScreen";
import LikesScreen from "../screens/Likes/LikesScreen";
import NewCameraPostScreen from "../screens/NewPost/NewCameraPostScreen";
import NewStoryScreen from "../screens/Stories/NewStoryScreen";
import PersonProfileScreen from "../screens/Profile/PersonProfileScreen";
import PostDetailsScreen from "../screens/NewPost/PostDetailsScreen";
import PushNotificationsScreen from "../screens/Misc/PushNotificationsScreen";
import SecurityScreen from "../screens/Misc/SecurityScreen";
import SettingsScreen from "../screens/Misc/SettingsScreen";
import StoryFeedScreen from "../screens/Stories/StoryFeedScreen";
import StoryViewsScreen from "../screens/Stories/StoryViewsScreen";
import TabNavigator from "./TabNavigator";
import ViewOwnStoryScreen from "../screens/Stories/ViewOwnStoryScreen";

// Types/components/Navigators imports
import AnimatedView from "../components/AnimatedView";
import { AuthStackParamsList } from "./NavigationProps";
import ScreenNames from "./ScreenNames";
import ChatRoomScreen from "../screens/Chats/ChatRoomScreen";
import NewChatScreen from "../screens/Chats/NewChatScreen";
import VideoPlayerScreen from "../screens/Chats/VideoPlayerScreen";
import ImageViewerScreen from "../screens/Chats/ImageViewerScreen";
import ChatRoomHeader from "../components/ChatRoomHeader";
import AppIcon from "../components/AppIcon";

// Create a Stack Navigator
const Stack = createStackNavigator<AuthStackParamsList>();

// function for simple header constructor
const simpleHeader = (title: string) => ({
  headerTitle: title,
});

// function for slideIn/header constructor
const slideInHeaderAnimation = (title: string) => ({
  headerTitle: title,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
});

// Function for AppNavigator
function AppNavigator() {
  const { colors } = useTheme();

  const screenOptions: StackNavigationOptions = {
    headerStyle: { backgroundColor: colors.background },
  };

  // Render
  return (
    <AnimatedView>
      <Stack.Navigator screenOptions={screenOptions}>
        {/* App Screens */}
        <Stack.Screen
          name={ScreenNames.HomeScreen}
          options={{ headerShown: false }}
          component={TabNavigator}
        />
        <Stack.Screen
          name={ScreenNames.SettingScreen}
          component={SettingsScreen}
          options={slideInHeaderAnimation("Settings")}
        />
        <Stack.Screen
          name={ScreenNames.AppearanceScreen}
          component={AppearanceScreen}
          options={slideInHeaderAnimation("Appearance")}
        />
        <Stack.Screen
          name={ScreenNames.ChangePasswordScreen}
          component={ChangePasswordScreen}
          options={slideInHeaderAnimation("Change Password")}
        />
        <Stack.Screen
          name={ScreenNames.SecurityScreen}
          component={SecurityScreen}
          options={slideInHeaderAnimation("Security")}
        />
        <Stack.Screen
          name={ScreenNames.PushNotificationsScreen}
          component={PushNotificationsScreen}
          options={slideInHeaderAnimation("Push Notifications")}
        />
        <Stack.Screen
          name={ScreenNames.AboutScreen}
          component={AboutScreen}
          options={slideInHeaderAnimation("About Socio")}
        />
        <Stack.Screen
          name={ScreenNames.EditProfileScreen}
          component={EditProfileScreen}
          options={simpleHeader("Edit Profile")}
        />
        <Stack.Screen
          name={ScreenNames.CreatePostScreen}
          component={CreatePostScreen}
          options={simpleHeader("New Post")}
        />
        <Stack.Screen
          name={ScreenNames.PostDetailsScreen}
          component={PostDetailsScreen}
          options={simpleHeader("Post")}
        />
        <Stack.Screen
          name={ScreenNames.AccountScreen}
          component={AccountScreen}
          options={simpleHeader("My Account")}
        />
        <Stack.Screen
          name={ScreenNames.NewCameraPostScreen}
          component={NewCameraPostScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenNames.ViewOwnStoryScreen}
          component={ViewOwnStoryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenNames.NewStoryScreen}
          component={NewStoryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenNames.ChatsScreen}
          component={ChatsScreen}
          options={simpleHeader("Chats")}
        />
        <Stack.Screen
          name={ScreenNames.ChatRoomScreen}
          component={ChatRoomScreen}
          options={props => ({
            headerShown: true,
            headerTitle: () => <ChatRoomHeader {...props.route.params} />,
          })}
        />
        <Stack.Screen
          name={ScreenNames.StoryFeedScreen}
          component={StoryFeedScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenNames.CommentsScreen}
          component={CommentsScreen}
          options={simpleHeader("Comments")}
        />
        <Stack.Screen
          name={ScreenNames.LikesScreen}
          component={LikesScreen}
          options={simpleHeader("Likes")}
        />
        <Stack.Screen
          name={ScreenNames.VideoPlayerScreen}
          component={VideoPlayerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenNames.ImageViewerScreen}
          component={ImageViewerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenNames.NewChatScreen}
          component={NewChatScreen}
          options={simpleHeader("New Chat")}
        />
        <Stack.Screen
          name={ScreenNames.StoryViewsScreen}
          component={StoryViewsScreen}
          options={simpleHeader("Story Views")}
        />
        <Stack.Screen
          name={ScreenNames.PersonProfileScreen}
          component={PersonProfileScreen}
          options={props => ({
            headerTitle: props.route.params.username ?? "Profile",
            headerShown: true,
          })}
        />
        <Stack.Screen
          name={ScreenNames.FollowingScreen}
          component={FollowingScreen}
          options={{
            ...simpleHeader("Following"),
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={ScreenNames.FollowersScreen}
          component={FollowersScreen}
          options={{
            ...simpleHeader("Followers"),
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </AnimatedView>
  );
}

// Exporting AppNavigator
export default AppNavigator;

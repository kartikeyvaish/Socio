// Import Types
import { AppScreenNamesTypes, AuthScreenNamesTypes, TabScreenNamesTypes } from "./NavigationProps";

// AuthNavigator
const AuthScreen: AuthScreenNamesTypes = {
    IntroductionScreen: "IntroductionScreen",
    LoginScreen: "LoginScreen",
    SignUpScreen: "SignUpScreen",
    EmailSignUpScreen: "EmailSignUpScreen",
    EmailOTPSignUpVerifyScreen: "EmailOTPSignUpVerifyScreen",
    ForgotPasswordEmailResetScreen: "ForgotPasswordEmailResetScreen",
    ForgotPasswordOTPVerifyScreen: "ForgotPasswordOTPVerifyScreen",
    ResetPasswordScreen: "ResetPasswordScreen",
}

// AppNavigator
const AppScreen: AppScreenNamesTypes = {
    HomeScreen: "HomeScreen",
    SettingScreen: "SettingScreen",
    AppearanceScreen: "AppearanceScreen",
    ChangePasswordScreen: "ChangePasswordScreen",
    SecurityScreen: "SecurityScreen",
    PushNotificationsScreen: "PushNotificationsScreen",
    AboutScreen: "AboutScreen",
    EditProfileScreen: "EditProfileScreen",
    CreatePostScreen: "CreatePostScreen",
    AccountScreen: "AccountScreen",
    FollowingScreen: "FollowingScreen",
    FollowersScreen: "FollowersScreen",
    PersonProfileScreen: "PersonProfileScreen",
    PostDetailsScreen: "PostDetailsScreen",
    CommentsScreen: "CommentsScreen",
    LikesScreen: "LikesScreen",
    NewCameraPostScreen: "NewCameraPostScreen",
    StoryFeedScreen: "StoryFeedScreen",
    NewStoryScreen: "NewStoryScreen",
    StoryViewsScreen: "StoryViewsScreen",
    ViewOwnStoryScreen: "ViewOwnStoryScreen",
    ChatsScreen: "ChatsScreen",
    ChatRoomScreen: "ChatRoomScreen",
    NewChatScreen: "NewChatScreen",
    VideoPlayerScreen: "VideoPlayerScreen",
    ImageViewerScreen: "ImageViewerScreen",
}

// TabBarNavigator
const TabScreen: TabScreenNamesTypes = {
    HomeTabScreen: "HomeTabScreen",
    SearchTabScreen: "SearchTabScreen",
    NewPostTabScreen: "NewPostTabScreen",
    FollowRequestsTabScreen: "FollowRequestsTabScreen",
    ProfileTabScreen: "ProfileTabScreen",
}

export default {
    ...AuthScreen, ...AppScreen, ...TabScreen
};
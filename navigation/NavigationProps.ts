import { StyleProp, ViewStyle } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";

// Utils/Types imports
import { SelectedFileProps } from "../types/HooksTypes";
import { PostProps } from "../types/PostTypes";

// Auth Navigator Screen Params
export type AuthStackParamsList = {
    // Auth Stack Screens
    IntroductionScreen: {
        PushToken?: string;
    };
    LoginScreen: undefined;
    SignUpScreen: {
        email?: string;
        name?: string;
        profile_picture?: SelectedFileProps;
        PushToken?: string;
    };
    EmailOTPSignUpVerifyScreen: {
        email: string;
        otp_id: string;
    };
    EmailSignUpScreen: undefined;
    ForgotPasswordEmailResetScreen: undefined;
    ForgotPasswordOTPVerifyScreen: {
        otp_id: string;
        email: string;
    };
    ResetPasswordScreen: {
        email: string;
        reset_request_id: string;
    }
};

// App Navigator Screen Params
export type AppStackParamsList = {
    // App Stack Screens
    HomeScreen: undefined;
    SettingScreen: undefined;
    AppearanceScreen: undefined;
    ChangePasswordScreen: undefined;
    SecurityScreen: undefined;
    PushNotificationsScreen: undefined;
    AboutScreen: undefined;
    EditProfileScreen: {
        name?: string;
        username?: string;
        bio?: string;
        profile_picture?: string;
        email?: string;
    };
    CreatePostScreen: SelectedFileProps;
    AccountScreen: undefined;
    FollowingScreen: { user_id?: string };
    FollowersScreen: { user_id?: string };
    PersonProfileScreen: { user_id?: string, name?: string, username?: string };
    PostDetailsScreen: PostProps;
    CommentsScreen: { post_id: string } & PostProps;
    LikesScreen: { post_id: string };
    NewCameraPostScreen: undefined;
    StoryFeedScreen: { index?: number };
    NewStoryScreen: undefined;
    StoryViewsScreen: { story_id: string };
    ViewOwnStoryScreen: { story_id: string };
    ChatsScreen: undefined;
    ChatRoomScreen: { chat_id: string, username: string, profile_picture: string, onCallPress: () => void };
    NewChatScreen: undefined;
    VideoPlayerScreen: { uri: string };
    ImageViewerScreen: { uri: string };
};

// Tab Navigator Screen Params
export type TabsParamsList = {
    // Tab Stack Screens
    HomeTabScreen: undefined;
    ProfileTabScreen: undefined;
    SearchTabScreen: undefined;
    NewPostTabScreen: undefined;
    FollowRequestsTabScreen: undefined;
};

// interface for TabBarCard
export interface TabBarCardProps {
    onPress: () => void;
    onLongPress?: () => void;
    style?: StyleProp<ViewStyle>;
    label?: string;
    customComponent?: any;
    badgeCount?: string | number;
}

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

// Screen Names types for TabNavigator
export type TabScreenNamesTypes = {
    [key in keyof TabsParamsList]: any;
};



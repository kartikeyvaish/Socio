// Packages Imports
import { ActivityIndicatorProps, ColorValue, GestureResponderEvent, ScrollViewProps, StyleProp, TextInputProps, TextProps, TextStyle, ViewProps, ViewStyle } from "react-native";
import { ImageStyle } from "react-native-fast-image";
import Animated from "react-native-reanimated";

// Other Types
import { ChildrenProps, SeperateMarginProps } from "./GlobalTypes";
import { PostFileProps, PostProps } from "./PostTypes";
import { ReactNativePaperButtonProps, ReactNativePaperSnackbarProps, ReactNativePaperTextInputProps } from "./PaperTypes";
import { VideoProps } from "expo-av";
import { EachStoryItemProps } from "../store/stories/types";
import { ChatItemProps, MessageProps } from "../store/chats/types";
import { GestureEvent, PanGestureHandlerEventPayload } from "react-native-gesture-handler";

// interface for AlertDialogProps
export interface AlertDialogProps {
    dialogTitle?: string;
    dialogTitleProps?: AppTextProps;
    subTitle?: string;
    subTitleProps?: AppTextProps;
    firstButtonText?: string;
    firstButtonOnPress?: () => void;
    firstButtonProps?: MenuCardProps;
    secondButtonText?: string;
    secondButtonOnPress?: () => void;
    secondButtonProps?: MenuCardProps;
}

// AnimatedText Props interface
export interface AnimatedTextProps
    extends AppTextProps,
    Animated.AnimateProps<any> { }

// AnimatedView Props interface
export interface AnimatedViewProps extends Animated.AnimateProps<ViewStyle>, ChildrenProps {
    style?: StyleProp<ViewStyle>;
}

// type for AppButton  
export type AppButtonProps = {
    title?: string;
    children?: any;
    height?: number;
    roundness?: number;
    backgroundColor?: string;
    color?: string;
    elevation?: number;
} & Omit<ReactNativePaperButtonProps, 'children'> & ChildrenProps & SeperateMarginProps;

// interface for AppContainer
export interface AppContainerProps extends ChildrenProps {
    style?: StyleProp<ViewStyle>;
    backgroundColor?: ColorValue;
}

// interface for AppScrollContainer
export interface AppScrollContainerProps extends ChildrenProps, AppContainerProps, ScrollViewProps {
    onRefresh?: () => void;
    refreshing?: boolean;
}

// interface for AppForm
export interface AppFormProps {
    initialValues: {};
    onSubmit: (values: {}) => void;
    validationSchema: any;
    children?: any;
}

// interface for AppFormField
export interface AppFormFieldProps extends AppTextInputProps {
    title: string;
}

// interface for AppHeaderProps
export interface AppHeaderProps extends AppTextProps {
    badgeCount?: number;
    onMessageIconPress?: () => void;
    onNewIconPress?: () => void;
}

// AppHeaderBar interface
export interface AppHeaderBarProps {
    title?: string;
    onIconPress?: () => void;
    backgroundColor?: ColorValue;
    isHeaderVisible?: boolean;
    titleColor?: ColorValue;
    style?: StyleProp<ViewStyle>;
}

// AppIcon props interface
export interface AppIconProps extends SeperateMarginProps {
    name?: any;
    family?: string;
    color?: ColorValue;
    size?: number;
    onPress?: ((event: GestureResponderEvent) => void) | any;
    loading?: boolean;
    style?: StyleProp<TextStyle>;
}

// interface for AppIconButton
export interface AppIconButtonProps {
    containerStyle?: StyleProp<ViewStyle>;
    iconProps?: AppIconProps;
    onPress?: ((event: GestureResponderEvent) => void) | any;
    size?: number;
    backgroundColor?: string;
    loading?: boolean;
}

// AppImage interface
export interface AppImageProps {
    size?: number;
    uri?: string;
    style?: StyleProp<ImageStyle>;
    resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
    onPress?: () => void;
    borderRadius?: number;
    borderColor?: ColorValue;
    borderWidth?: number;
    showBorder?: boolean;
    backgroundColor?: string;
}

// interface for AppLoading
export interface AppLoadingProps {
    visible?: boolean;
    loadingText?: string;
    loadingTextProps?: AppTextProps;
    indicatorProps?: ActivityIndicatorProps;
    containerStyles?: StyleProp<ViewStyle>;
}

// interface for Submit Button
export interface AppSubmitButtonProps extends AppButtonProps {
    CustomButton?: React.ComponentType<any>;
}

// interface for AppSnackBarProps
export interface AppSnackBarProps extends Omit<ReactNativePaperSnackbarProps, "children"> {
    text?: string;
    backgroundColor?: string;
}

// interface for AppText
export interface AppTextProps extends TextProps, SeperateMarginProps {
    text?: string;
    color?: ColorValue;
    size?: number;
    family?: string;
}

// final type for AppButton 
export type AppTextInputProps = Omit<ReactNativePaperTextInputProps, 'error'> & {
    error?: string;
    helperTextProps?: HelperTextProps;
    containerStyle?: StyleProp<ViewStyle>;
    leftIconProps?: AppIconProps;
    rightIconProps?: AppIconProps;
    controlled?: boolean;
    roundness?: number;
    showHelper?: boolean;
};


// interface for AppVideo
export interface AppVideoProps extends VideoProps { }

// interface for AppView
export interface AppViewProps extends ViewProps {
    flex?: number;
    justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around";
    alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
    flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
}

// interface for BackDropProps
export interface BackDropProps {
    style?: any;
    children?: any;
    onBackDropPress?: any;
    visible?: boolean;
}

// interface for BottomSheet
export interface BottomSheetProps extends ChildrenProps {
    visible: boolean;
    onClosePress?: () => void;
    onBackdropPress?: () => void;
}

// interface for ChatsCard
export interface ChatsCardProps extends ChatItemProps {
    onPress?: () => void;
    onSwipeableClose?: () => void;
    onSwipeableOpen?: () => void;
    currentSelected?: string;
    onDeletePress?: () => void;
}

// interface for ChoosePicture component
export interface ChoosePictureProps {
    uri?: string;
    onPickPress?: () => void;
    onRemovePress?: () => void;
    showRemoveIcon?: boolean;
}

// interface for CommentsKeyboardProps
export interface CommentsKeyboardProps {
    value?: string;
    controlled?: boolean;
    profile_picture?: string;
    containerStyles?: StyleProp<ViewStyle>;
    textInputStyles?: StyleProp<TextStyle>;
    inputProps?: TextInputProps;
    postLabel?: string;
    labelTextProps?: AppTextProps;
    emojies?: string[];
    onChangeText?: (text: string) => void;
    onSubmit?: () => void;
}

// interface for Cases of Follow Buttons
export interface FollowButtonCasesProps {
    private_profile?: string;
    you_follow_user?: boolean;
    user_follows_you?: boolean;
    you_sent_request?: boolean;
    user_sent_request?: boolean;
    you_sent_request_id?: string;
    user_sent_request_id?: string;
}

// interface for GetProfileResponse
export interface FollowButtonsProps extends FollowButtonCasesProps {
    onFollowPress?: () => void;
    onUnFollowPress?: () => void;
    onAcceptPress?: () => void;
    onRejectPress?: () => void;
    onMessagePress?: () => void;
}

// interface for GetProfileResponse
export interface GetProfileResponseInterface extends FollowButtonsProps {
    name?: string;
    username?: string;
    profile_picture?: string;
    bio?: string;
    followers_count?: number;
    following_count?: number;
    posts?: Array<PostProps>;
}

// interface for HelperText
export interface HelperTextProps {
    text?: string;
    type?: "error" | "info";
    visible?: boolean;
    padding?: "none" | "normal";
    style?: StyleProp<TextStyle>;
}

// interface for LikeButton
export interface LikeButtonProps {
    isLiked: boolean;
    onLikePress?: () => void;
    onUnLikePress?: () => void;
    size?: number;
}

// interface for MenuCard
export interface MenuCardProps extends AppTextProps {
    containerStyle?: StyleProp<ViewStyle>;
    onPress?: () => void;
    icon?: AppIconProps;
}

// interface for SendMessageCard
export interface MessageCardProps extends MessageProps {
    upper_date?: string;
    onVideoMessagePress?: () => void;
    onImageMessagePress?: () => void;
    showRead?: boolean;
    gestureHandler?: (event: GestureEvent<PanGestureHandlerEventPayload>) => void;
    animatedStyle?: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>;
}

// interface for NameAndLocationCard
export interface NameAndLocationProps {
    name?: string;
    location?: string;
    profile_picture?: string;
    onNamePress?: () => void;
    onLocationPress?: () => void;
    showMenuIcon?: boolean;
    onMenuIconPress?: () => void;
}

// interface for PeopleCard
export interface PeopleCardProps {
    profile_picture?: string;
    title?: string;
    onTitlePress?: () => void;
    subtitle?: string;
    onSubtitlePress?: () => void;
    firstButtonTitle?: string;
    firstButtonOnPress?: () => void;
    secondButtonTitle?: string;
    secondButtonOnPress?: () => void;
    firstButtonProps?: TextButtonProps;
    secondButtonProps?: TextButtonProps;
    buttonContainerStyle?: StyleProp<ViewStyle>;
    imageProps?: AppImageProps;
}

// interface for PlaybackStatus
export interface PlaybackStatus {
    androidImplementation?: string;
    isLoaded?: boolean;
    uri?: string;
    progressUpdateIntervalMillis?: number;
    durationMillis?: number;
    positionMillis?: number;
    playableDurationMillis?: number;
    seekMillisToleranceBefore?: number;
    seekMillisToleranceAfter?: number;
    shouldPlay?: boolean;
    isPlaying?: boolean;
    isBuffering?: boolean;
    rate?: number;
    shouldCorrectPitch?: boolean;
    volume?: number;
    isMuted?: boolean;
    isLooping?: boolean;
    didJustFinish?: boolean;
}

// post video props
export interface PostVideoProps {
    current_viewable_item?: any;
    onVideoPress?: () => void;
    isMuted?: boolean;
}

// interface for PostVideoCard
export interface PostVideoCardProps extends PostVideoProps, PostFileProps {
    local_uri?: string;
}

// interface for SearchQueryCard
export interface SearchQueryCardProps {
    name?: string;
    username?: string;
    profile_picture?: string;
    onPress?: () => void;
    onRemovePress?: () => void;
    removeVisible?: boolean;
}

// interface for SheetMenuCard
export interface SheetMenuCardProps extends Omit<AppTextProps, "onPress"> {
    onPress?: (pointerInside: boolean) => void;
    containerStyle?: StyleProp<ViewStyle>;
}

// interface for StatsCard
export interface StatsCardProps {
    title?: string;
    subtitle?: string;
    onPress?: () => void;
}

// interface for TextButton
export interface TextButtonProps {
    text?: string;
    onPress?: () => void;
    backgroundColor?: string;
    color?: string;
    containerStyles?: StyleProp<ViewStyle>;
}
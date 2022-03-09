// Packages Imports
import { useTheme } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  TextInput,
  TextStyle,
  StyleProp,
  ViewStyle,
  TextInputProps,
} from "react-native";
import { TouchableRipple } from "react-native-paper";

// Local Imports
import AppIcon from "./AppIcon";
import AppText from "./AppText";
import ColorPallete from "../constants/ColorPallete";
import FontNames from "../constants/FontNames";
import IconNames from "../constants/IconNames";

// interface for ChatKeyboard
export interface ChatKeyboardProps {
  value?: string;
  controlled?: boolean;
  onChangeText?: (text: string) => void;
  onCameraPress?: () => void;
  onImagePickerPress?: () => void;
  onMicrophonePress?: () => void;
  onSendPress?: () => void;
  onFileSendPress?: () => void;
  inputProps?: TextInputProps;
  iconColor?: string;
  keyboardBorderColor?: string;
  showIcons?: boolean;
  showSendButton?: boolean;
  textInputColor?: string;
  keyboardBackgroundColor?: string;
  keyboardVisible?: boolean;
}

// function component for ChatKeyboard
function ChatKeyboard(props: ChatKeyboardProps) {
  // Destructuring props
  const {
    value,
    controlled = true,
    onChangeText,
    onCameraPress,
    onImagePickerPress,
    onMicrophonePress,
    onSendPress,
    onFileSendPress,
    inputProps,
    iconColor = undefined,
    keyboardBorderColor = undefined,
    showIcons = true,
    showSendButton = true,
    textInputColor = undefined,
    keyboardBackgroundColor = undefined,
    keyboardVisible = true,
  } = props;

  // Get the theme
  const { colors, dark } = useTheme();

  // final styles for text input
  const finalTextInputStyles: StyleProp<TextStyle> = [
    styles.textInput,
    {
      color: textInputColor ? textInputColor : colors.text,
    },
  ];

  // final containerStyles
  const finalContainerStyles: StyleProp<ViewStyle> = [
    styles.container,
    {
      borderColor: keyboardBorderColor
        ? keyboardBorderColor
        : dark
        ? ColorPallete.lightBlack
        : ColorPallete.lightGrey,
      backgroundColor: keyboardBackgroundColor ? keyboardBackgroundColor : colors.background,
    },
  ];

  // render
  return !keyboardVisible ? null : (
    <View style={finalContainerStyles}>
      <TouchableRipple onPress={onCameraPress} borderless style={styles.cameraRippleContainer}>
        <View style={styles.cameraIconContainer}>
          <AppIcon family={IconNames.Feather} name="camera" size={28} color={ColorPallete.white} />
        </View>
      </TouchableRipple>

      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="Type a Message"
          placeholderTextColor={colors.text}
          multiline={true}
          style={finalTextInputStyles}
          onChangeText={onChangeText}
          selectionColor={colors.primary}
          {...(controlled ? { value } : {})}
          {...inputProps}
        />
      </View>

      <View style={styles.iconsContainer}>
        {!value ? (
          showIcons ? (
            <>
              <TouchableRipple onPress={onMicrophonePress} borderless style={styles.iconRipple}>
                <AppIcon family={IconNames.Feather} name="mic" size={28} color={iconColor} />
              </TouchableRipple>

              <TouchableRipple onPress={onImagePickerPress} borderless style={styles.iconRipple}>
                <AppIcon family={IconNames.Feather} name="image" size={28} color={iconColor} />
              </TouchableRipple>
            </>
          ) : null
        ) : showSendButton ? (
          <AppText
            text="Send"
            color={ColorPallete.primary}
            marginLeft={10}
            marginRight={10}
            family={FontNames.InterBold}
            onPress={onSendPress}
          />
        ) : null}

        {!showSendButton ? (
          <TouchableRipple onPress={onFileSendPress} borderless style={styles.iconRipple}>
            <AppIcon family={IconNames.Feather} name="send" size={28} color={iconColor} />
          </TouchableRipple>
        ) : null}
      </View>
    </View>
  );
}

// exports
export default ChatKeyboard;

// styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: ColorPallete.lightGrey,
    borderRadius: 30,
    marginBottom: 10,
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  textInputContainer: {
    flex: 1,
    height: "auto",
    marginLeft: 15,
    marginRight: 10,
    alignSelf: "center",
  },
  textInput: {
    textAlign: "left",
    textAlignVertical: "center",
    height: "auto",
    maxHeight: 150,
    fontSize: 16,
    width: "100%",
    fontFamily: FontNames.InterRegular,
  },
  cameraIconContainer: {
    backgroundColor: ColorPallete.primary,
    padding: 8,
    borderRadius: 100,
  },
  cameraRippleContainer: {
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 5,
  },
  iconRipple: { borderRadius: 100, padding: 8, marginRight: 5 },
});

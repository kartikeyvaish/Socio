// Packages Imports
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTheme } from "@react-navigation/native";

// Local Imports
import AppImage from "./AppImage";
import AppText from "./AppText";
import { CommentsKeyboardProps } from "../types/ComponentTypes";
import ColorPallete from "../constants/ColorPallete";
import FontNames from "../constants/FontNames";

// Constants
const sample_emojis = ["❤️", "🙌", "🔥", "👏", "😥", "😍", "😲", "😂"];

// function component for CommentsKeyboard
function CommentsKeyboard(props: CommentsKeyboardProps) {
  // Destructuring props
  const {
    profile_picture,
    containerStyles,
    textInputStyles,
    inputProps,
    postLabel = "Post",
    labelTextProps,
    emojies = sample_emojis,
    onChangeText,
    controlled = true,
    value = "",
    onSubmit,
  } = props;

  // Get the theme
  const { colors } = useTheme();

  // final styles for whole container
  const finalContainerStyles: StyleProp<ViewStyle> = [
    {
      width: "100%",
      elevation: 10,
      backgroundColor: colors.background,
      borderTopColor: ColorPallete.grey,
      borderTopWidth: StyleSheet.hairlineWidth,
    },
    containerStyles,
  ];

  // final styles for text input
  const finalTextInputStyles: StyleProp<TextStyle> = [
    {
      textAlign: "left",
      textAlignVertical: "center",
      height: "auto",
      maxHeight: 150,
      color: colors.text,
      fontSize: 16,
      fontFamily: FontNames.InterRegular,
    },
    textInputStyles,
  ];

  // render
  return (
    <View style={finalContainerStyles}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.emojiesContainer}
        keyboardShouldPersistTaps="always"
      >
        {emojies.map((emoji, index) => (
          <AppText key={index} text={emoji} size={25} onPress={() => onChangeText(value + emoji)} />
        ))}
      </ScrollView>

      <View style={styles.keyboardContainer}>
        <AppImage uri={profile_picture} size={40} borderRadius={40} style={styles.profilePicture} />

        <View style={styles.textInputContainer}>
          <TextInput
            placeholder="Add a comment.."
            placeholderTextColor={colors.text}
            multiline={true}
            style={finalTextInputStyles}
            onChangeText={onChangeText}
            {...(controlled ? { value } : {})}
            {...inputProps}
          />
        </View>

        <View style={styles.postButton}>
          <AppText
            text={postLabel}
            size={15}
            color={ColorPallete.primary}
            onPress={value?.length > 0 ? onSubmit : null}
            style={{ opacity: value?.length > 0 ? 1 : 0.5 }}
            {...labelTextProps}
          />
        </View>
      </View>
    </View>
  );
}

// exports
export default CommentsKeyboard;

// styles
const styles = StyleSheet.create({
  emojiesContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "grey",
    borderBottomColor: "grey",
  },
  keyboardContainer: {
    padding: 5,
    flexDirection: "row",
  },
  profilePicture: {
    alignSelf: "flex-end",
    borderRadius: 40,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  postButton: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  textInputContainer: { flex: 1, height: "auto", padding: 5 },
});

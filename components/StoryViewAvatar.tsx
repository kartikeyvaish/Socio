// Packages Imports
import { View, StyleSheet, Pressable } from "react-native";

// Local Imports
import AppImage from "./AppImage";
import AppText from "./AppText";
import ColorPallete from "../constants/ColorPallete";
import AppIcon from "./AppIcon";
import IconNames from "../constants/IconNames";
import { useTheme } from "@react-navigation/native";

// interface for StoryViewAvatar
export interface StoryViewAvatarProps {
  profile_picture?: string;
  username?: string;
  onAvatarPress?: () => void;
  showIcon?: boolean;
  showBorder?: boolean;
  showLabel?: boolean;
  imageSize?: number;
  borderColor?: string;
}

// function component for StoryViewAvatar
function StoryViewAvatar(props: StoryViewAvatarProps) {
  // Destructuring props
  const {
    profile_picture,
    username,
    onAvatarPress,
    showBorder = true,
    showIcon,
    showLabel = true,
    imageSize = 60,
    borderColor = ColorPallete.primary,
  } = props;

  const { dark, colors } = useTheme();

  // render
  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.imageContainer,
          {
            borderWidth: showBorder ? 2 : 0,
            borderColor: borderColor,
            width: imageSize + 10,
            height: imageSize + 10,
            borderRadius: (imageSize + 10) / 2,
          },
        ]}
        onPress={onAvatarPress}
      >
        <View
          style={{
            width: imageSize,
            height: imageSize,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: dark ? ColorPallete.lightBlack : ColorPallete.lightGrey,
          }}
        >
          <AppImage uri={profile_picture} borderRadius={imageSize / 2} />
        </View>

        {showIcon ? (
          <View style={styles.iconContainer}>
            <AppIcon
              family={IconNames.AntDesign}
              name="pluscircle"
              color={ColorPallete.primary}
              size={20}
            />
          </View>
        ) : null}
      </Pressable>

      {showLabel ? <AppText text={username} marginTop={10} numberOfLines={1} /> : null}
    </View>
  );
}

// exports
export default StoryViewAvatar;

// styles
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    maxWidth: 100,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  iconContainer: {
    position: "absolute",
    bottom: 1,
    right: 1,
    padding: 2,
    backgroundColor: ColorPallete.white,
    borderRadius: 100,
  },
});

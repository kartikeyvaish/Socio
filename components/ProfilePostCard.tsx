// Packages Imports
import { StyleSheet, StyleProp, ViewStyle, Pressable, View } from "react-native";

// Component imports
import AppImage from "./AppImage";
import ColorPallete from "../constants/ColorPallete";
import Layout from "../constants/Layout";
import { PostFileProps } from "../types/PostTypes";
import { TouchableRipple } from "react-native-paper";

// interface for ProfilePostCard
export interface ProfilePostCardProps extends PostFileProps {
  style?: StyleProp<ViewStyle>;
  onCardPress?: () => void;
}

// function component for ProfilePostCard
function ProfilePostCard(props: ProfilePostCardProps) {
  // Destructuring props
  const { uri, style, onCardPress } = props;

  // containerStyles
  const containerStyle: StyleProp<ViewStyle> = [styles.container, style];

  // render
  return (
    <TouchableRipple style={containerStyle} onPress={onCardPress}>
      <AppImage uri={uri} />
    </TouchableRipple>
  );
}

// exports
export default ProfilePostCard;

// styles
const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: ColorPallete.white,
    width: Layout.window.width / 3,
    height: Layout.window.width / 3,
  },
});

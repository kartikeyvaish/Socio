// Packages Imports (from node_modules)
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { RectButton } from "react-native-gesture-handler";

// Local Imports (components/types/utils)
import AnimatedView from "../Animated/AnimatedView";
import AppIcon from "../App/AppIcon";
import AppImage from "../App/AppImage";
import ColorPallete from "../../constants/ColorPallete";

// Named Imports
import { DEVICE_WIDTH } from "../../constants/DeviceConstants";

// interface for PostListCard component
export interface PostListCardProps {
  blurhash?: string;
  coverImage?: string;
  containerStyle?: StyleProp<ViewStyle>;
  isSingleVideoPost?: boolean;
  isGroupPost?: boolean;
  onPress?: () => void;
  showBorder?: boolean;
}

// functional component for PostListCard
function PostListCard(props: PostListCardProps) {
  // Destructuring props
  const {
    containerStyle = {},
    isSingleVideoPost = true,
    onPress,
    coverImage,
    blurhash,
    isGroupPost,
  } = props;

  const containerStyles: StyleProp<ViewStyle> = [
    styles.container,
    containerStyle,
  ];

  // render
  return (
    <AnimatedView style={containerStyles}>
      <AppImage source={{ uri: coverImage }} placeholder={blurhash} />

      <RectButton style={StyleSheet.absoluteFillObject} onPress={onPress} />

      {isGroupPost ? (
        <AppIcon
          family="MaterialCommunityIcons"
          name="card-multiple"
          size={20}
          color={ColorPallete.white}
          style={styles.videoIcon}
        />
      ) : isSingleVideoPost ? (
        <AppIcon
          family="Feather"
          name="video"
          size={20}
          color={ColorPallete.white}
          style={styles.videoIcon}
        />
      ) : null}
    </AnimatedView>
  );
}

// exports
export default PostListCard;

// styles for PostListCard
const styles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH / 3,
    height: DEVICE_WIDTH / 3,
    borderWidth: 1,
    borderColor: ColorPallete.white,
  },
  videoIcon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
});

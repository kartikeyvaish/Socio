// Packages Imports
import { View, StyleSheet, Pressable } from "react-native";

// Local Imports
import AppImage from "./AppImage";
import AppIcon from "./AppIcon";
import ColorPallete from "../constants/ColorPallete";
import IconNames from "../constants/IconNames";

// interface for MessageImageCard
export interface MessageImageCardProps {
  onMessagePress?: () => void;
  uri?: string;
  showIcon?: boolean;
  maxWidth?: number;
}

// function component for MessageImageCard
function MessageImageCard(props: MessageImageCardProps) {
  // Destructuring props
  const { onMessagePress, uri, showIcon, maxWidth } = props;

  // imageStyles
  const imageStyles = [
    styles.image,
    {
      width: maxWidth - 20,
      height: maxWidth - 20,
    },
  ];

  // render
  return (
    <View style={styles.container}>
      <Pressable onPress={onMessagePress}>
        <AppImage uri={uri} borderRadius={10} style={imageStyles} />
      </Pressable>

      {showIcon ? (
        <View style={styles.iconContainer}>
          <AppIcon
            family={IconNames.AntDesign}
            name="play"
            color={ColorPallete.primary}
            size={50}
            onPress={onMessagePress}
          />
        </View>
      ) : null}
    </View>
  );
}

// exports
export default MessageImageCard;

// styles
const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center" },
  iconContainer: {
    backgroundColor: ColorPallete.white,
    borderRadius: 100,
    position: "absolute",
  },
  image: {
    marginBottom: 10,
  },
});

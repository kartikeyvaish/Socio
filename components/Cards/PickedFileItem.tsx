// Packages Imports (from node_modules)
import { StyleSheet, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

// Local Imports (components/types/utils)
import AnimatedView from "../Animated/AnimatedView";
import AppIcon from "../App/AppIcon";
import AppImage from "../App/AppImage";
import AppText from "../App/AppText";
import AppView from "../App/AppView";
import ColorPallete from "../../constants/ColorPallete";

// Named Imports
import { PickedFileProps } from "../../types/AppTypes";

// interface for PickedFileItem component
export interface PickedFileItemProps {
  file: PickedFileProps;
  onPress?: () => void;
  onRemovePress?: () => void;
}

// functional component for PickedFileItem
function PickedFileItem(props: PickedFileItemProps) {
  // Destructuring props
  const { file, onPress, onRemovePress } = props;

  // render
  return (
    <AnimatedView style={styles.container}>
      <AppView style={styles.fileContainer}>
        <AppImage
          source={{ uri: file?.thumbnail?.uri ? file.thumbnail.uri : file.uri }}
        />

        <RectButton onPress={onPress} style={styles.overlayContainer}>
          {file.fileType === "video" ? (
            <AppIcon
              family="Feather"
              name="video"
              size={40}
              color={ColorPallete.white}
            />
          ) : null}

          {file.fileType === "video" ? (
            <AppText
              text="02:09"
              style={styles.durationText}
              color={ColorPallete.white}
              fontFamily="PoppinsBold"
              size={14}
            />
          ) : null}
        </RectButton>
      </AppView>

      <AppIcon
        family="Entypo"
        name="circle-with-cross"
        style={styles.removeIcon}
        size={30}
        color={ColorPallete.white}
        onPress={onRemovePress}
      />
    </AnimatedView>
  );
}

function ItemGapper() {
  return <View style={styles.seperator} />;
}

// exports
PickedFileItem.ItemGapper = ItemGapper;
export default PickedFileItem;

// styles for PickedFileItem
const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  seperator: {
    width: 20,
    height: "100%",
  },
  removeIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  fileContainer: {
    overflow: "hidden",
    borderRadius: 10,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  durationText: {
    position: "absolute",
    bottom: 8,
    right: 8,
  },
});

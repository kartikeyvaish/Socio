// Packages Imports (from node_modules)
import { StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";

// Local Imports (components/types/utils)
import AppIcon from "../App/AppIcon";
import AppText from "../App/AppText";
import AppView from "../App/AppView";
import ColorPallete from "../../constants/ColorPallete";

// interface for NewPostInitialButton component
export interface NewPostInitialButtonProps {
  onPress?: () => void;
}

// functional component for NewPostInitialButton
function NewPostInitialButton(props: NewPostInitialButtonProps) {
  // Destrcuture props
  const { onPress } = props;

  return (
    <AppView style={styles.container}>
      <RectButton style={styles.rippleButton} onPress={onPress}>
        <AppIcon
          family="AntDesign"
          name="plus"
          size={40}
          margins={{ bottom: 20 }}
          color={ColorPallete.white}
        />
        <AppText
          text={`Tap to choose a\nphoto/video to post.`}
          margins={{ left: 20, right: 20 }}
          style={{ textAlign: "center" }}
          color={ColorPallete.white}
        />
      </RectButton>
    </AppView>
  );
}

// exports
export default NewPostInitialButton;

// styles for NewPostInitialButton
const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center" },
  rippleButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    maxWidth: "80%",
    alignSelf: "center",
    borderRadius: 8,
    borderColor: ColorPallete.primary,
    borderWidth: 1 - StyleSheet.hairlineWidth,
    backgroundColor: ColorPallete.primary,
  },
});

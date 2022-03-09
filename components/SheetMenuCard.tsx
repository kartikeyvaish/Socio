// Packages Imports
import { StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";

// component types imports
import AppText from "./AppText";
import ColorPallete from "../constants/ColorPallete";
import { SheetMenuCardProps } from "../types/ComponentTypes";

// function component for SheetMenuCard
function SheetMenuCard(props: SheetMenuCardProps) {
  // Destructuring props
  const { onPress, containerStyle, ...otherProps } = props;

  // render
  return (
    <RectButton style={[styles.container, containerStyle]} onPress={onPress}>
      <AppText text="Delete" color={ColorPallete.danger} size={20} {...otherProps} />
    </RectButton>
  );
}

// exports
export default SheetMenuCard;

// styles
const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    justifyContent: "center",
  },
});

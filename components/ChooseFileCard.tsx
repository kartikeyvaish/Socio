// Packages Imports
import { StyleSheet } from "react-native";
import { TouchableRipple } from "react-native-paper";

// Local Imports
import AppIcon from "./AppIcon";
import AppText from "./AppText";
import { AppIconProps, AppTextProps } from "../types/ComponentTypes";
import ColorPallete from "../constants/ColorPallete";
import FontNames from "../constants/FontNames";

// interface for ChooseFileCard
export interface ChoooseFileCardProps {
  onPress?: () => void;
  text?: string;
  textProps?: AppTextProps;
  iconProps?: AppIconProps;
}

// function component for ChooseFileCard
function ChooseFileCard(props: ChoooseFileCardProps) {
  // Destructuring props
  const { onPress, text, textProps, iconProps } = props;

  // render
  return (
    <TouchableRipple style={styles.pickerContainer} onPress={onPress}>
      <>
        <AppText
          text={text}
          size={20}
          family={FontNames.InterBold}
          marginBottom={10}
          {...textProps}
        />
        <AppIcon size={28} {...iconProps} />
      </>
    </TouchableRipple>
  );
}

// exports
export default ChooseFileCard;

// styles
const styles = StyleSheet.create({
  pickerContainer: {
    padding: 20,
    borderWidth: 1,
    borderColor: ColorPallete.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    minWidth: 100,
  },
});

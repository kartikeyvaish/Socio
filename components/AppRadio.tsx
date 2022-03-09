// Local Imports
import AppIcon from "./AppIcon";
import ColorPallete from "../constants/ColorPallete";
import IconNames from "../constants/IconNames";

// interface for AppRadio
export interface AppRadioProps {
  checked?: boolean;
  onPress?: () => void;
}

// function component for AppRadio
function AppRadio(props: AppRadioProps) {
  // Destructuring props
  const { checked, onPress } = props;

  // render
  return (
    <AppIcon
      family={checked ? IconNames.AntDesign : IconNames.Entypo}
      name={checked ? "checkcircle" : "circle"}
      size={25}
      color={checked ? ColorPallete.primary : undefined}
      onPress={onPress}
    />
  );
}

// exports
export default AppRadio;

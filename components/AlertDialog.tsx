// Packages Imports
import { View, StyleSheet, Pressable, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native";

// Local Imports
import { AlertDialogProps } from "../types/ComponentTypes";
import AppText from "./AppText";
import ColorPallete from "../constants/ColorPallete";
import FontNames from "../constants/FontNames";
import Layout from "../constants/Layout";
import MenuCard from "./MenuCard";

// Constants
const ScreenWidth = Layout.window.width;

// function component for AlertDialog
function AlertDialog(props: AlertDialogProps) {
  // Destructuring props
  const {
    dialogTitle,
    subTitle,
    firstButtonText,
    secondButtonText,
    firstButtonProps,
    secondButtonProps,
    firstButtonOnPress,
    secondButtonOnPress,
  } = props;

  // Get the theme from the context
  const { dark } = useTheme();

  const containerStyles: StyleProp<ViewStyle> = [
    styles.container,
    { backgroundColor: dark ? ColorPallete.lightBlack : ColorPallete.white },
  ];

  // render
  return (
    <View style={containerStyles}>
      <Pressable style={{ width: "100%", alignItems: "center", padding: 15 }} onPress={null}>
        <AppText
          text={dialogTitle}
          size={18}
          family={FontNames.InterBold}
          style={{ textAlign: "center" }}
        />
        <AppText
          text={subTitle}
          family={FontNames.PoppinsRegular}
          style={{ textAlign: "center" }}
        />
      </Pressable>

      <MenuCard
        text={firstButtonText}
        color={ColorPallete.primary}
        family={FontNames.PoppinsMedium}
        containerStyle={{ width: "100%", alignItems: "center", padding: 10 }}
        onPress={firstButtonOnPress}
        {...firstButtonProps}
      />

      <MenuCard
        text={secondButtonText}
        family={FontNames.PoppinsMedium}
        containerStyle={{ width: "100%", alignItems: "center", padding: 10 }}
        onPress={secondButtonOnPress}
        {...secondButtonProps}
      />
    </View>
  );
}

// exports
export default AlertDialog;

// styles
const styles = StyleSheet.create({
  container: {
    width: ScreenWidth * 0.7,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});

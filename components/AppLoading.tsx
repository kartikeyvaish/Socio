// Packages Imports
import { useTheme } from "@react-navigation/native";
import { View, StyleSheet, ActivityIndicator, StyleProp, ViewStyle } from "react-native";

// Local Imports
import { AppLoadingProps } from "../types/ComponentTypes";
import AppText from "./AppText";
import BackDrop from "./BackDrop";
import ColorPallete from "../constants/ColorPallete";
import FontNames from "../constants/FontNames";

// function component for AppLoading
function AppLoading(props: AppLoadingProps) {
  // Destructuring props
  const { visible, loadingText, loadingTextProps, indicatorProps, containerStyles } = props;

  // Get the theme
  const { dark } = useTheme();

  // Construct the final container styles
  const finalContainerStyles: StyleProp<ViewStyle> = [
    styles.container,
    {
      backgroundColor: dark ? ColorPallete.lightBlack : ColorPallete.white,
    },
    containerStyles,
  ];

  // render
  return (
    <BackDrop visible={visible}>
      <View style={finalContainerStyles}>
        <AppText
          text={loadingText}
          size={20}
          family={FontNames.PoppinsRegular}
          marginBottom={20}
          {...loadingTextProps}
        />
        <ActivityIndicator
          animating={true}
          color={ColorPallete.primary}
          size="large"
          {...indicatorProps}
        />
      </View>
    </BackDrop>
  );
}

// exports
export default AppLoading;

// styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
});

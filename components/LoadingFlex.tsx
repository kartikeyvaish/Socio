// Packages Imports
import { View, StyleSheet } from "react-native";

// Local Imports
import AppText from "./AppText";
import { AppTextProps } from "../types/ComponentTypes";
import ColorPallete from "../constants/ColorPallete";

// interface for LoadingFlex
export interface LoadingFlexProps extends AppTextProps {
  containerStyles?: any;
  loadingText?: string;
}

// function component for LoadingFlex
function LoadingFlex(props: LoadingFlexProps) {
  // Destructuring props
  const { containerStyles, loadingText, ...otherProps } = props;

  // render
  return (
    <View style={[styles.emptyContainer, containerStyles]}>
      <AppText
        text={loadingText}
        color={ColorPallete.white}
        size={16}
        marginBottom={20}
        {...otherProps}
      />
    </View>
  );
}

// exports
export default LoadingFlex;

// styles
const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: ColorPallete.black,
  },
});

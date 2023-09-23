// Packages Imports (from node_modules)
import { View, StyleSheet, ActivityIndicator } from "react-native";

// Local Imports (components/types/utils)
import AppText from "./AppText";
import ColorPallete from "../../constants/ColorPallete";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

// interface for AppLoading component
export interface AppLoadingProps {
  loading: boolean;
  loadingText?: string;
}

// functional component for AppLoading
function AppLoading(props: AppLoadingProps) {
  // Destructuring props
  const { loading, loadingText } = props;

  if (!loading) return null;

  // render
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.container}>
      <AppText
        text={loadingText}
        margins={{ bottom: 30 }}
        size={20}
        numberOfLines={1}
        color={ColorPallete.white}
        adjustsFontSizeToFit
      />

      <ActivityIndicator size="large" color={ColorPallete.white} />
    </Animated.View>
  );
}

// exports
export default AppLoading;

// styles for AppLoading
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: ColorPallete.translucent,
    justifyContent: "center",
    alignItems: "center",
  },
});

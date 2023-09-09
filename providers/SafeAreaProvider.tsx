// Packages Imports (from node_modules)
import { useContext } from "react";
import Animated from "react-native-reanimated";
import { SafeAreaView, SafeAreaProvider as SAP } from "react-native-safe-area-context";

// Local Imports (components/types/utils)
import BackgroundColorContext from "../contexts/BackgroundColorContext";
import { ChildrenProps } from "../types/GlobalTypes";

// Create a animated safe area view
const SafeAreaAnimated = Animated.createAnimatedComponent(SafeAreaView);

// functional component for SafeAreaProvider
function SafeAreaProvider(props: ChildrenProps) {
  // Destructuring props
  const { children } = props;

  const { animatedStyles } = useContext(BackgroundColorContext);

  // render
  return (
    <SAP>
      <SafeAreaAnimated style={[{ flex: 1 }, animatedStyles]}>{children}</SafeAreaAnimated>
    </SAP>
  );
}

// exports
export default SafeAreaProvider;

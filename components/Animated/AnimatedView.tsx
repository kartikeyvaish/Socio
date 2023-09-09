// Packages Imports
import Animated, { Layout } from "react-native-reanimated";

// Local imports
import { AnimatedViewProps } from "../../types/ComponentTypes";

// function component for AnimatedView
function AnimatedView(props: AnimatedViewProps) {
  // Destructuring props
  const { children, visible = true, layout } = props;

  // render
  return visible ? (
    <Animated.View layout={layout ? layout : Layout} {...props}>
      {children}
    </Animated.View>
  ) : null;
}

// exports
export default AnimatedView;

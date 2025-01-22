// Packages Imports (from node_modules)
import { ViewProps } from 'react-native';
import Animated, { AnimatedProps, LinearTransition } from 'react-native-reanimated';

// interface for AnimatedView component
export interface AnimatedViewProps extends AnimatedProps<ViewProps> {}

// functional component for AnimatedView
function AnimatedView(props: AnimatedViewProps) {
  // Destructuring props
  const { ...restProps } = props;

  // render
  return <Animated.View layout={LinearTransition} {...restProps} />;
}

// exports
export default AnimatedView;

// Packages Imports (from node_modules)
import Animated, { LinearTransition } from 'react-native-reanimated';

// interface for AnimatedView component
import { FlexViewProps } from '../../types/components';

// functional component for AnimatedView
function AnimatedView(props: FlexViewProps) {
  // Destructuring props
  const { ...restProps } = props;

  // render
  return <Animated.View {...restProps} />;
}

// exports
export default AnimatedView;

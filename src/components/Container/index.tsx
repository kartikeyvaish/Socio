// Packages Imports (from node_modules)
import {
  useDerivedValue,
  useAnimatedStyle,
  interpolateColor,
  withTiming
} from 'react-native-reanimated';

// Local Imports (components/types/utils)
import Flex from '../Flex';

// Named Imports
import { darkTheme, lightTheme } from '../../configs/themes';
import { FlexViewProps } from '../../types/components';
import { useAppSelector } from '../../store/storeHooks';

const darkBackground = darkTheme.colors.background;
const lightBackground = lightTheme.colors.background;

// functional component for Container
function Container(props: FlexViewProps) {
  // Destructuring props
  const { style, ...restProps } = props;

  // Holds the Redux State
  const theme = useAppSelector((state) => state.theme);

  // Background Change Progress Value
  // get isDark or not and interpolate the background Color based on that
  const progress = useDerivedValue(() => {
    return theme.dark ? withTiming(1) : withTiming(0);
  }, [theme.dark]);

  const animatedStyles = useAnimatedStyle(() => {
    // Interpolate the background Color
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [lightBackground, darkBackground]
    );

    return { backgroundColor };
  });

  // render
  return <Flex flex={1} style={[animatedStyles, style]} {...restProps} />;
}

// exports
export default Container;

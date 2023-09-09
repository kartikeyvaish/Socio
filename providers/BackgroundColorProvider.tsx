// Packages Imports (from node_modules)
import {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

// Local Imports (components/types/utils)
import BackgroundColorContext from "../contexts/BackgroundColorContext";

// Named imports
import { ChildrenProps } from "../types/GlobalTypes";
import { darkTheme, lightTheme } from "../constants/Themes";
import { useAppSelector } from "../store/reduxHooks";

// Get both mode's background color
const darkBackground = darkTheme.colors.background;
const lightBackground = lightTheme.colors.background;

// functional component for BackgroundColorProvider
function BackgroundColorProvider(props: ChildrenProps) {
  // Destructuring props
  const { children } = props;

  // Holds the Redux State
  const theme = useAppSelector(state => state.theme);

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
  return (
    <BackgroundColorContext.Provider value={{ animatedStyles }}>
      {children}
    </BackgroundColorContext.Provider>
  );
}

// exports
export default BackgroundColorProvider;

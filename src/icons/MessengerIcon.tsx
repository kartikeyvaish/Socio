// Packages Imports (from node_modules)
import Svg, { SvgProps, Path } from 'react-native-svg';

// Named Imports
import { useAppSelector } from '../store/storeHooks';

// functional component for MessengerIcon
function MessengerIcon(props: SvgProps) {
  // Destrcuturing props
  const { color, ...rest } = props;

  const { colors } = useAppSelector((state) => state.theme);

  const colorValue = color ? color : colors.text;

  // render
  return (
    <Svg width={24} height={24} fill="none" {...rest}>
      <Path
        stroke={colorValue}
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M5.71 19.74a.8.8 0 0 0-.294-.68C3.194 17.265 1.8 14.586 1.8 11.588 1.8 6.217 6.336 1.8 12.01 1.8c5.661 0 10.198 4.417 10.198 9.787 0 5.369-4.547 9.787-10.21 9.787-.941 0-1.835-.12-2.697-.35a.8.8 0 0 0-.459.015l-3.306 1.106.175-2.404Z"
      />
      <Path
        fill={colorValue}
        d="M10.15 8.795c.072.01.133.021.205.032 1.073.229 2.17 1.21 3.014 1.793.47.334.869.303 1.339-.01 1-.688 2.038-1.345 3.062-2.023.278-.188.567-.386.905-.136.374.271.145.563-.048.834-1.013 1.398-2.014 2.795-3.039 4.182-.7.96-1.688 1.095-2.75.417-.735-.48-1.494-.928-2.218-1.428-.482-.334-.88-.292-1.338.02-1.013.689-2.038 1.346-3.063 2.024-.277.187-.567.385-.904.125-.338-.25-.157-.532.024-.793 1.049-1.439 2.086-2.878 3.135-4.317.35-.49 1-.782 1.676-.72Z"
      />
    </Svg>
  );
}

// exports
export default MessengerIcon;

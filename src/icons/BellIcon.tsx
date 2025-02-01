// Packages Imports (from node_modules)
import Svg, { SvgProps, Path } from 'react-native-svg';

// Named Imports
import { useAppSelector } from '../store/storeHooks';

// functional component for BellIcon
function BellIcon(props: SvgProps) {
  // Destrcuturing props
  const { color, ...rest } = props;

  const { colors } = useAppSelector((state) => state.theme);

  const colorValue = color ? color : colors.text;

  // render
  return (
    <Svg width={22} height={24} fill="none" {...rest}>
      <Path
        fill={colorValue}
        d="M10.75 24.001a3 3 0 0 0 3-3h-6a3 3 0 0 0 3 3Zm0-21.123-1.195.242A6.003 6.003 0 0 0 4.75 9c0 .942-.201 3.296-.689 5.613-.24 1.15-.563 2.35-.994 3.387h15.366c-.43-1.038-.753-2.235-.994-3.387-.488-2.317-.689-4.67-.689-5.613a6.003 6.003 0 0 0-4.805-5.88l-1.195-.244v.001Zm9.33 15.123c.335.67.722 1.202 1.17 1.5h-21c.449-.298.835-.83 1.17-1.5 1.35-2.7 1.83-7.68 1.83-9 0-3.63 2.58-6.66 6.008-7.351a1.5 1.5 0 1 1 2.985 0A7.503 7.503 0 0 1 18.25 9c0 1.32.48 6.3 1.83 9Z"
      />
    </Svg>
  );
}

// exports
export default BellIcon;

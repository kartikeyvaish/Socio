// Packages Imports (from node_modules)
import Svg, { SvgProps, Path } from 'react-native-svg';

// Named Imports
import { useAppSelector } from '../store/storeHooks';

// functional component for BackArrowIcon
function BackArrowIcon(props: SvgProps) {
  // Destrcuturing props
  const { color, ...rest } = props;

  const { colors } = useAppSelector((state) => state.theme);

  const colorValue = color ? color : colors.text;

  // render
  return (
    <Svg width={10} height={16} fill="none" {...rest}>
      <Path
        stroke={colorValue}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m8.25 1-7 7 7 7"
      />
    </Svg>
  );
}

// exports
export default BackArrowIcon;

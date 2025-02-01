// Packages Imports (from node_modules)
import Svg, { SvgProps, Path } from 'react-native-svg';

// Named Imports
import { useAppSelector } from '../store/storeHooks';

// functional component for HeartFilledIcon
function HeartFilledIcon(props: SvgProps) {
  // Destrcuturing props
  const { color = '#FF005C', ...rest } = props;

  const { colors } = useAppSelector((state) => state.theme);

  const colorValue = color ? color : colors.text;

  // render
  return (
    <Svg width={24} height={22} fill="none" {...rest}>
      <Path
        fill={colorValue}
        fillRule="evenodd"
        stroke={colorValue}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M16.454 1.25c3.816 0 6.38 3.632 6.38 7.02 0 6.862-10.641 12.48-10.834 12.48-.192 0-10.833-5.618-10.833-12.48 0-3.388 2.564-7.02 6.38-7.02 2.19 0 3.623 1.11 4.453 2.084.83-.975 2.263-2.084 4.454-2.084Z"
        clipRule="evenodd"
      />
    </Svg>
  );
}

// exports
export default HeartFilledIcon;

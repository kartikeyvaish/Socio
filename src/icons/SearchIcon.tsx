// Packages Imports (from node_modules)
import Svg, { SvgProps, Path } from 'react-native-svg';

// Named Imports
import { useAppSelector } from '../store/storeHooks';

// functional component for SearchIcon
function SearchIcon(props: SvgProps) {
  // Destrcuturing props
  const { color, ...rest } = props;

  const { colors } = useAppSelector((state) => state.theme);

  const colorValue = color ? color : colors.text;

  // render
  return (
    <Svg width={24} height={24} fill="none" {...rest}>
      <Path
        fill={colorValue}
        fillRule="evenodd"
        d="M19.75 10c0-5.385-4.365-9.75-9.75-9.75S.25 4.615.25 10s4.365 9.75 9.75 9.75a9.712 9.712 0 0 0 6.344-2.346l5.99 5.99.084.073a.75.75 0 0 0 .976-1.133l-5.99-5.99A9.712 9.712 0 0 0 19.75 10Zm-18 0a8.25 8.25 0 1 1 16.5 0 8.25 8.25 0 0 1-16.5 0Z"
        clipRule="evenodd"
      />
    </Svg>
  );
}

// exports
export default SearchIcon;

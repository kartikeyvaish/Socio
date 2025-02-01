// Packages Imports (from node_modules)
import Svg, { SvgProps, Path } from 'react-native-svg';

// Named Imports
import { useAppSelector } from '../store/storeHooks';

// functional component for CommentsIcon
function CommentsIcon(props: SvgProps) {
  // Destrcuturing props
  const { color, ...rest } = props;

  const { colors } = useAppSelector((state) => state.theme);

  const colorValue = color ? color : colors.text;

  // render
  return (
    <Svg width={22} height={22} fill="none" {...rest}>
      <Path
        stroke={colorValue}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.588}
        d="M2.497 15.762A9.695 9.695 0 0 1 1.25 11 9.75 9.75 0 0 1 11 1.25 9.75 9.75 0 0 1 20.75 11 9.75 9.75 0 0 1 11 20.75a9.696 9.696 0 0 1-4.762-1.247L1.25 20.75l1.247-4.988Z"
        clipRule="evenodd"
      />
    </Svg>
  );
}

// exports
export default CommentsIcon;

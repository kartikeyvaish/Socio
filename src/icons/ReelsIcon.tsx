// Packages Imports (from node_modules)
import Svg, { SvgProps, Path } from 'react-native-svg';

// Named Imports
import { useAppSelector } from '../store/storeHooks';

// functional component for ReelsIcon
function ReelsIcon(props: SvgProps) {
  // Destrcuturing props
  const { color, ...rest } = props;

  const { colors } = useAppSelector((state) => state.theme);

  const colorValue = color ? color : colors.text;

  // render
  return (
    <Svg width={26} height={26} fill="none" {...rest}>
      <Path
        stroke={colorValue}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M23.833 16.25v-6.5c0-5.417-2.166-7.583-7.583-7.583h-6.5c-5.417 0-7.583 2.166-7.583 7.583v6.5c0 5.417 2.166 7.583 7.583 7.583h6.5c5.417 0 7.583-2.166 7.583-7.583ZM2.73 7.702h20.54M9.23 2.285V7.55M16.77 2.285v4.778"
      />
      <Path
        stroke={colorValue}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d="M10.563 15.652v-1.3c0-1.668 1.18-2.35 2.621-1.517l1.127.65 1.127.65c1.44.835 1.44 2.2 0 3.034l-1.127.65-1.127.65c-1.44.834-2.621.151-2.621-1.517v-1.3Z"
      />
    </Svg>
  );
}

// exports
export default ReelsIcon;

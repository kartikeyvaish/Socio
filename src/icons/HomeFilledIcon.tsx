// Packages Imports (from node_modules)
import Svg, { SvgProps, Path } from 'react-native-svg';

// Named Imports
import { useAppSelector } from '../store/storeHooks';

// functional component for HomeFilledIcon
function HomeFilledIcon(props: SvgProps) {
  // Destrcuturing props
  const { color, ...rest } = props;

  const { colors } = useAppSelector((state) => state.theme);

  const colorValue = color ? color : colors.text;

  // render
  return (
    <Svg width={22} height={24} fill="none" {...rest}>
      <Path
        fill={colorValue}
        fillRule="evenodd"
        d="m11.7.286 10 9.801a1 1 0 0 1 .3.714v12.08a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-5.5a3 3 0 0 0-2.824-2.995L11 14.381a3 3 0 0 0-2.995 2.824L8 17.381v5.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.492-.41L0 22.881v-12.08a1 1 0 0 1 .3-.714l10-9.801a1 1 0 0 1 1.4 0Z"
        clipRule="evenodd"
      />
    </Svg>
  );
}

// exports
export default HomeFilledIcon;

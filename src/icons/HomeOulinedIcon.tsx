// Packages Imports (from node_modules)
import Svg, { SvgProps, Path } from 'react-native-svg';

// Named Imports
import { useAppSelector } from '../store/storeHooks';

// functional component for HomeOulinedIcon
function HomeOulinedIcon(props: SvgProps) {
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
        d="M21.7 10.706 11.7.904a1 1 0 0 0-1.4 0l-10 9.802a1 1 0 0 0-.3.714V23.5l.008.09A.5.5 0 0 0 .5 24h8a.5.5 0 0 0 .5-.5V18l.005-.176C9.096 16.249 9.402 15 11 15l.176.005c1.458.085 1.78 1.21 1.82 2.645L13 18v5.5a.5.5 0 0 0 .5.5h8l.09-.008A.5.5 0 0 0 22 23.5V11.42a1 1 0 0 0-.3-.714Zm-20.2.924L11 2.32l9.5 9.311V22.5h-6V18l-.005-.37c-.067-2.43-.953-3.99-3.232-4.122l-.22-.007c-2.492-.001-3.381 1.574-3.535 4.236l-.007.22V22.5H1.5V11.63Z"
        clipRule="evenodd"
      />
    </Svg>
  );
}

// exports
export default HomeOulinedIcon;

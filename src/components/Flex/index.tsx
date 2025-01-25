// Local Imports (components/types/utils)
import AnimatedView from '../AnimatedView';

// interface for Flex component
import { AnimatedViewProps, FlexViewProps } from '../../types/components';

// functional component for Flex
function Flex(props: FlexViewProps) {
  // Destructuring props
  const { flex, align, justify, row, gap, style, ...restProps } = props;

  const flexStyle: AnimatedViewProps['style'] = [
    flex && { flex },
    align && { alignItems: align },
    justify && { justifyContent: justify },
    row && { flexDirection: 'row' },
    gap && { gap },
    style
  ];

  // render
  return <AnimatedView style={flexStyle} {...restProps} />;
}

// exports
export default Flex;

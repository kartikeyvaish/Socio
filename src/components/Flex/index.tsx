// Local Imports (components/types/utils)
import AnimatedView from '../AnimatedView';

// interface for Flex component
import { AnimatedViewProps, FlexViewProps } from '../../types/components';

// functional component for Flex
function Flex(props: FlexViewProps) {
  // Destructuring props
  const { flex, align, justify, row, gap, style, margins, ...restProps } = props;

  // seperate margins
  const seperateMargins = {
    margin: margins?.all,
    marginTop: margins?.top,
    marginRight: margins?.right,
    marginBottom: margins?.bottom,
    marginLeft: margins?.left
  };

  const flexStyle: AnimatedViewProps['style'] = [
    flex && { flex },
    align && { alignItems: align },
    justify && { justifyContent: justify },
    { flexDirection: row ? 'row' : 'column' },
    gap && { gap },
    seperateMargins,
    style
  ];

  // render
  return <AnimatedView style={flexStyle} {...restProps} />;
}

// exports
export default Flex;

// Local Imports (components/types/utils)
import AnimatedView from '../AnimatedView';

// interface for Flex component
import { FlexViewProps } from '../../types/components';

// functional component for Flex
function Flex(props: FlexViewProps) {
  // Destructuring props
  const { flex, align, justify, row, gap, style, ...restProps } = props;

  // render
  return <AnimatedView {...restProps} />;
}

// exports
export default Flex;

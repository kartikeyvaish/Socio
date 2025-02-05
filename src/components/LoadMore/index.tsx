// Local Imports (components/types/utils)
import ContentLoader from '../ContentLoader';
import Flex from '../Flex';

// interface for LoadMore component
export interface LoadMoreProps {
  label: string;
}

// functional component for LoadMore
function LoadMore(props: LoadMoreProps) {
  // Destructuring props
  const { label } = props;

  // render
  return (
    <Flex margins={{ top: 20, bottom: 20 }}>
      <ContentLoader loadingText={label} />
    </Flex>
  );
}

// exports
export default LoadMore;

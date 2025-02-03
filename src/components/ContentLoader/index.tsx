// Packages Imports (from node_modules)
import { ActivityIndicator } from 'react-native';

// Local Imports (components/types/utils)
import AppText from '../AppText';
import Flex from '../Flex';
import colorPallete from '../../constants/colorPallete';

// interface for ContentLoader component
export interface ContentLoaderProps {
  loadingText?: string;
  loading?: boolean;
}

// functional component for ContentLoader
function ContentLoader(props: ContentLoaderProps) {
  // Destructuring props
  const { loadingText = 'Loading...', loading = true } = props;

  // render
  return (
    <Flex flex={1} justify="center" align="center" gap={10}>
      {loading ? <ActivityIndicator size="small" color={colorPallete.primary} /> : null}

      <AppText text={loadingText} size={14} />
    </Flex>
  );
}

// exports
export default ContentLoader;

// Packages Imports (from node_modules)
import { StyleSheet } from 'react-native';
import { StackHeaderProps } from '@react-navigation/stack';

// Local Imports (components/types/utils)
import AppText from '../AppText';
import Flex from '../Flex';
import Icon from '../Icon';

// Named Imports
import { fontFamilies } from '../../constants/ui';

// interface for BackButtonHeader component
export interface BackButtonHeaderProps extends StackHeaderProps {}

// functional component for BackButtonHeader
function BackButtonHeader(props: BackButtonHeaderProps) {
  // Destructuring props
  const { navigation, options } = props;

  // render
  return (
    <Flex row gap={16} style={styles.headerBackContainer} align="center">
      <Icon family="AntDesign" name="arrowleft" size={24} onPress={navigation.goBack} />

      {typeof options.headerTitle === 'string' ? (
        <AppText text={options.headerTitle} size={20} family={fontFamilies.Inter.regular} />
      ) : null}
    </Flex>
  );
}

// exports
export default BackButtonHeader;

// styles for BackButtonHeader
const styles = StyleSheet.create({
  headerBackContainer: { padding: 16, backgroundColor: 'transparent' }
});

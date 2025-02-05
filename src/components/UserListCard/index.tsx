// Packages Imports (from node_modules)
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { RectButton } from 'react-native-gesture-handler';

// Local Imports (components/types/utils)
import AppText from '../AppText';
import Flex from '../Flex';

// Named Imports
import { DEFAULT_USER_IMAGE } from '../../constants/ui';
import { User } from '../../types/model';

// interface for UserListCard component
export interface UserListCardProps extends User {
  onPress?: () => void;
}

// functional component for UserListCard
function UserListCard(props: UserListCardProps) {
  // Destructuring props
  const { first_name, last_name, profile_picture, username, onPress } = props;

  // render
  return (
    <RectButton onPress={onPress}>
      <Flex row gap={12} style={styles.container}>
        <Image
          source={{ uri: profile_picture || DEFAULT_USER_IMAGE }}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />

        <Flex gap={4}>
          <AppText text={`${first_name} ${last_name}`} />
          <AppText text={username} />
        </Flex>
      </Flex>
    </RectButton>
  );
}

// exports
export default UserListCard;

// styles for UserListCard
const styles = StyleSheet.create({
  container: {
    padding: 12,
    alignItems: 'center'
  }
});

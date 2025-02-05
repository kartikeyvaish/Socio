// Packages Imports (from node_modules)
import { StyleSheet, TouchableOpacity } from 'react-native';

// Local Imports (components/types/utils)

// Named Imports
import { Post } from '../../types/model';
import { SCREEN_WIDTH } from '../../constants/ui';
import { Image } from 'expo-image';

// interface for PostMiniCard component
export interface PostMiniCardProps extends Post {
  position: 'left' | 'right' | 'center';
  onPress?: () => void;
}

// functional component for PostMiniCard
function PostMiniCard(props: PostMiniCardProps) {
  // Destructuring props
  const { position, files, onPress } = props;

  let cardStyles =
    position === 'center' ? styles.centerCard : position === 'left' ? styles.leftCard : {};

  let hasMultipleFiles = files.length > 1;

  let firstFile = files[0];

  if (!firstFile) return null;

  let displayImage =
    firstFile.resource_type === 'image' ? firstFile.secure_url : firstFile.thumbnail;

  // render
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.container, cardStyles]}>
      <Image
        placeholder={{ blurhash: firstFile.blurhash }}
        style={styles.image}
        contentFit="cover"
        source={{ uri: displayImage }}
      />
    </TouchableOpacity>
  );
}

// exports
export default PostMiniCard;

// styles for PostMiniCard
const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH / 3,
    height: SCREEN_WIDTH / 3,
    backgroundColor: 'pink',
    borderBottomWidth: 1 - StyleSheet.hairlineWidth,
    borderColor: 'white'
  },
  centerCard: {
    borderRightWidth: 1 - StyleSheet.hairlineWidth,
    borderColor: 'white'
  },
  leftCard: {
    borderRightWidth: 1 - StyleSheet.hairlineWidth,
    borderColor: 'white'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
});

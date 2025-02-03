// Packages Imports (from node_modules)
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import dayjs from 'dayjs';

// Local Imports (components/types/utils)
import AppText from '../AppText';
import Flex from '../Flex';
import LikeButton from '../LikeButton';

// Named Imports
import { Comment } from '../../types/model';
import { DEFAULT_USER_IMAGE, fontFamilies } from '../../constants/ui';

// interface for CommentItem component
export interface CommentItemProps extends Comment {}

// functional component for CommentItem
function CommentItem(props: CommentItemProps) {
  // Destructuring props
  const { content, user, created_at, id } = props;

  // render
  return (
    <Flex row style={styles.container}>
      <Image
        source={{ uri: user.profile_picture || DEFAULT_USER_IMAGE }}
        style={{ width: 32, height: 32, borderRadius: 16, marginTop: 2 }}
      />

      <Flex gap={2}>
        <Flex align="center" row gap={4}>
          <AppText text={user.username} family={fontFamilies.Poppins.medium} size={14} />
          <AppText
            text={dayjs(created_at).format('DD MMM, YYYY hh:mm A')}
            size={11}
            family={fontFamilies.Poppins.regular}
          />
        </Flex>

        <AppText text={content} size={13} />
        <AppText text="Reply" size={12} family={fontFamilies.Poppins.bold} />
      </Flex>

      <Flex
        style={{
          flex: 1,
          alignItems: 'flex-end',
          gap: 4,
          alignSelf: 'center',
          paddingRight: 8
        }}
        align="center"
        justify="center"
      >
        <LikeButton isLiked={false} size={14} />
        {/* <AppText text={dayjs(created_at).format('DD MMM, YYYY hh:mm A')} size={11} /> */}
      </Flex>
    </Flex>
  );
}

// exports
export default CommentItem;

// styles for CommentItem
const styles = StyleSheet.create({
  container: {
    padding: 8,
    alignItems: 'flex-start',
    gap: 8,
    paddingBottom: 12
  }
});

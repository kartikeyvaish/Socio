// Packages Imports (from node_modules)
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import dayjs from 'dayjs';

// Local Imports (components/types/utils)
import AnimatedView from '../AnimatedView';
import AppText from '../AppText';
import Icon from '../Icon';
import LikeButton from '../LikeButton';
import TruncateText from '../TruncateText';

// Named Imports
import { DEFAULT_USER_IMAGE, fontFamilies } from '../../constants/ui';
import type { Post as PostModel } from '../../types/model';

const PROFILE_IMAGE_SIZE = 32;

// interface for Post component
export interface PostProps extends PostModel {}

// functional component for Post
function Post(props: PostProps) {
  // Destructuring props
  const {
    caption,
    comments_enabled,
    created_at,
    files,
    id,
    location,
    user,
    is_liked,
    is_saved,
    total_comments,
    total_likes
  } = props;

  // render
  return (
    <AnimatedView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.userProfileImageContainer}>
          <Image
            source={user.profile_picture ? user.profile_picture : DEFAULT_USER_IMAGE}
            style={styles.avatarImage}
          />
        </View>

        <View style={styles.userDetailsContainer}>
          <AppText text={user.username} family={fontFamilies.Poppins.bold} size={13} />
          <AppText text={location} family={fontFamilies.Poppins.regular} size={11} />
        </View>

        <Icon family="MaterialCommunityIcons" name="dots-vertical" size={20} />
      </View>

      <View style={{ height: 300, backgroundColor: 'pink' }}></View>

      {/* Post Details Section */}
      <View style={styles.postDetailsContainer}>
        <View style={styles.operationsButtonsContainer}>
          <View style={styles.operationsButtonsFirstContainer}>
            <View style={styles.operationIconContainer}>
              <LikeButton isLiked={is_liked} size={26} />
              {total_likes ? (
                <AppText
                  text={total_likes?.toString()}
                  family={fontFamilies.Inter.bold}
                  size={13}
                />
              ) : null}
            </View>

            {comments_enabled ? (
              <View style={styles.operationIconContainer}>
                <Icon family="AntDesign" name="message1" size={24} />
                {total_comments ? (
                  <AppText
                    text={total_comments?.toString()}
                    family={fontFamilies.Inter.bold}
                    size={13}
                  />
                ) : null}
              </View>
            ) : null}

            <Icon family="Feather" name="send" size={26} />
          </View>

          {is_saved ? (
            <Icon family="FontAwesome" name="bookmark" size={26} />
          ) : (
            <Icon family="FontAwesome" name="bookmark-o" size={26} />
          )}
        </View>

        {caption ? (
          <AppText text={user.username} family={fontFamilies.Inter.bold}>
            <TruncateText text={caption ? ` ${caption.repeat(100)}` : ''} />
          </AppText>
        ) : null}

        <AppText
          text={dayjs(created_at).format('DD MMM, YYYY hh:mm A')}
          family={fontFamilies.Inter.regular}
          size={11}
        />
      </View>
    </AnimatedView>
  );
}

// exports
export default Post;

// styles for Post
const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 7,
    paddingBottom: 7
  },
  userProfileImageContainer: {
    width: PROFILE_IMAGE_SIZE,
    height: PROFILE_IMAGE_SIZE,
    borderRadius: PROFILE_IMAGE_SIZE / 2
  },
  userDetailsContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: PROFILE_IMAGE_SIZE / 2
  },
  postDetailsContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    gap: 8
  },
  operationsButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  operationsButtonsFirstContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  operationIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  }
});

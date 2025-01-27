// Packages Imports (from node_modules)
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

// Local Imports (components/types/utils)
import AnimatedView from '../AnimatedView';
import AppText from '../AppText';
import Flex from '../Flex';
import Icon from '../Icon';

// Named Imports
import { DEFAULT_USER_IMAGE, fontFamilies } from '../../constants/ui';
import type { Post as PostModel } from '../../types/model';

// interface for Post component
export interface PostProps extends PostModel {}

// functional component for Post
function Post(props: PostProps) {
  // Destructuring props
  const { caption, comments_enabled, created_at, files, id, is_edited, location, user } = props;

  // render
  return (
    <AnimatedView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.userProfileImageContainer}>
          <Image
            source={user.profile_image ? user.profile_image : DEFAULT_USER_IMAGE}
            style={styles.avatarImage}
          />
        </View>

        <View style={styles.userDetailsContainer}>
          <AppText text={user.username} family={fontFamilies.Inter.bold} size={16} />
          <AppText text={location} size={12} />
        </View>

        <Icon family="MaterialCommunityIcons" name="dots-vertical" size={26} />
      </View>

      {/* Post Details Section */}
      <View style={styles.postDetailsContainer}>
        <View style={styles.operationsButtonsContainer}>
          <Flex row align="center" gap={12}>
            <Icon family="AntDesign" name="hearto" size={26} />
            <Icon family="AntDesign" name="message1" size={24} />
            <Icon family="Feather" name="send" size={26} />
          </Flex>

          <Icon family="Feather" name="bookmark" size={26} />
        </View>

        <AppText text="50 likes" family={fontFamilies.Inter.bold} marginLeft={8} marginTop={8} />

        {caption ? (
          <AppText
            text={user.username}
            family={fontFamilies.Inter.bold}
            marginLeft={8}
            marginTop={8}
          >
            <AppText text={caption ? ` ${caption}` : ''} marginLeft={100} marginTop={8} />
          </AppText>
        ) : null}
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
    paddingRight: 8
  },
  userProfileImageContainer: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2
  },
  userDetailsContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  avatarImage: {
    width: '100%',
    height: '100%'
  },
  postDetailsContainer: {},
  operationsButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 8
  }
});

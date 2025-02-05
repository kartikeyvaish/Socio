// Packages Imports (from node_modules)
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable
} from 'react-native';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { Image } from 'expo-image';
import dayjs from 'dayjs';
import { NavigationProp, useNavigation } from '@react-navigation/native';

// Local Imports (components/types/utils)
import AnimatedView from '../AnimatedView';
import AppText from '../AppText';
import colorPallete from '../../constants/colorPallete';
import Icon from '../Icon';
import LikeButton from '../LikeButton';
import postsApi from '../../api/posts';
import TruncateText from '../TruncateText';
import Video from './Video';

// Named Imports
import { AppStackParamsList } from '../../navigation/types';
import { DEFAULT_USER_IMAGE, fontFamilies, SCREEN_WIDTH } from '../../constants/ui';
import { CommentsContext } from '../../contexts/CommentsDetailsContext';
import { Post as PostModel } from '../../types/model';
import { useAppSelector } from '../../store/storeHooks';

const PROFILE_IMAGE_SIZE = 32;

// interface for Post component
export interface PostProps extends PostModel {
  inView: boolean;
  isMuted: boolean;
  onMediaPress?: () => void;
  showMuteIcon?: boolean;
}

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
    total_likes,
    inView,
    isMuted,
    onMediaPress,
    showMuteIcon
  } = props;

  // Local States
  const [activeIndex, setActiveIndex] = useState(0);
  const [canCache, setCanCache] = useState(false);
  const [likesCount, setLikesCount] = useState(total_likes);
  const [isPostSaved, setIsPostSaved] = useState(is_saved);

  // Hooks
  const { user: currentUser } = useAppSelector((state) => state.auth);
  const { isSheetVisible, showCommentsView } = useContext(CommentsContext);
  const navigation = useNavigation<NavigationProp<AppStackParamsList>>();

  useEffect(() => {
    if (inView) {
      if (!canCache) setCanCache(true);
    }
  }, [inView]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    let currentIndex = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);

    if (currentIndex !== activeIndex) setActiveIndex(currentIndex);
  };

  const commentsCountDisplay = useMemo(() => {
    if (total_comments === 0) return 'No comments';

    if (total_comments === 1) return 'View 1 comment';

    return `View all ${total_comments} comments`;
  }, [total_comments]);

  const onLikePress = useCallback(async () => {
    try {
      setLikesCount((prev) => prev + 1);
      await postsApi.likeAPost(id);
    } catch (error) {}
  }, [id]);

  const onUnlikePress = useCallback(async () => {
    try {
      setLikesCount((prev) => prev - 1);
      await postsApi.unLikeAPost(id);
    } catch (error) {}
  }, [id]);

  const savePost = useCallback(async () => {
    try {
      setIsPostSaved(true);
      await postsApi.savePost(id);
    } catch (error) {}
  }, [id]);

  const unSavePost = useCallback(async () => {
    try {
      setIsPostSaved(false);
      await postsApi.unsavePost(id);
    } catch (error) {}
  }, [id]);

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

        {currentUser.username === user.username ? (
          <Icon family="MaterialCommunityIcons" name="dots-vertical" size={20} />
        ) : null}
      </View>

      {/* Media Files */}
      <View>
        <ScrollView
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          bounces={files.length > 1}
        >
          {files.map((file, index) =>
            file.resource_type === 'image' ? (
              <Pressable onPress={onMediaPress} key={file.id}>
                <Image
                  source={{ uri: file.secure_url }}
                  placeholder={{ blurhash: file.blurhash }}
                  style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH }}
                  contentFit="cover"
                  transition={{ duration: 200, effect: 'cross-dissolve', timing: 'ease-in-out' }}
                />
              </Pressable>
            ) : file.resource_type === 'video' ? (
              <Video
                {...file}
                key={file.id}
                style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH }}
                shouldPlay={!isSheetVisible && inView && activeIndex === index}
                canCache={inView && activeIndex === index && canCache}
                muted={isMuted}
                onPress={onMediaPress}
              />
            ) : null
          )}
        </ScrollView>

        {showMuteIcon ? (
          <AnimatedView entering={FadeIn} exiting={FadeOut} style={styles.muteIconContainer}>
            {isMuted ? (
              <Icon family="Octicons" name="mute" size={14} color={colorPallete.white} />
            ) : (
              <Icon family="Octicons" name="unmute" size={14} color={colorPallete.white} />
            )}
          </AnimatedView>
        ) : null}

        {files.length > 1 ? (
          <AnimatedView entering={FadeIn} exiting={FadeOut} style={styles.paginationCountContainer}>
            <AppText
              text={`${activeIndex + 1}/${files.length}`}
              size={12}
              color={colorPallete.white}
            />
          </AnimatedView>
        ) : null}
      </View>

      {/* Post Details Section */}
      <View style={styles.postDetailsContainer}>
        <View style={styles.operationsButtonsContainer}>
          <View style={styles.operationsButtonsFirstContainer}>
            <View style={styles.operationIconContainer}>
              <LikeButton
                isLiked={is_liked}
                size={26}
                onLikePress={onLikePress}
                onUnLikePress={onUnlikePress}
              />
              {likesCount ? (
                <AppText
                  onPress={() => navigation.navigate('LikesListingScreen', { post_id: id })}
                  text={likesCount?.toString()}
                  family={fontFamilies.Inter.bold}
                  size={13}
                />
              ) : null}
            </View>

            {comments_enabled ? (
              <View style={styles.operationIconContainer}>
                <Icon
                  family="AntDesign"
                  name="message1"
                  size={24}
                  onPress={() => showCommentsView(id)}
                />
                {total_comments ? (
                  <AppText
                    text={total_comments?.toString()}
                    family={fontFamilies.Inter.bold}
                    size={13}
                    onPress={() => showCommentsView(id)}
                  />
                ) : null}
              </View>
            ) : null}

            <Icon family="Feather" name="send" size={26} />
          </View>

          {isPostSaved ? (
            <Icon family="FontAwesome" name="bookmark" size={26} onPress={unSavePost} />
          ) : (
            <Icon family="FontAwesome" name="bookmark-o" size={26} onPress={savePost} />
          )}
        </View>

        {caption ? (
          <AppText text={user.username} family={fontFamilies.Inter.bold}>
            <TruncateText text={caption.trim()} />
          </AppText>
        ) : null}

        {total_comments ? (
          <AppText
            onPress={() => showCommentsView(id)}
            text={commentsCountDisplay}
            family={fontFamilies.Inter.regular}
            size={14}
          />
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
    paddingLeft: 8,
    paddingRight: 8,
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
    gap: 12
  },
  operationIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  muteIconContainer: {
    width: 30,
    height: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 8,
    bottom: 8,
    borderRadius: 15
  },
  paginationCountContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 8,
    top: 8
  }
});

// Packages Imports
import { View, StyleSheet } from "react-native";
import Animated, { FadeInRight, FadeOutLeft, Layout } from "react-native-reanimated";

// Component/Types imports
import AppIcon from "./AppIcon";
import AppText from "./AppText";
import FontNames from "../constants/FontNames";
import Helper from "../utils/Helper";
import IconNames from "../constants/IconNames";
import LikeButton from "./LikeButton";
import NameAndLocationCard from "./NameAndLocationCard";
import PostImageCard from "./PostImageCard";
import PostVideoCard from "./PostVideoCard";
import { PostCardProps } from "./../types/PostTypes";
import useAppEndpoints from "../api/useAppEndpoints";
import { useDispatch } from "react-redux";
import FeedActions from "../store/feed/actions";
import ProfileActionCreators from "../store/profile/actions";

// function component for PostCard
function PostCard(props: PostCardProps) {
  // Destructuring props
  const {
    _id,
    post_owner_details,
    file,
    location,
    is_liked,
    caption,
    comments_count,
    post_datetime,
    likes_count,
    current_viewable_item,
    isMuted,
    local_uri,
    showMenuIcon,
    ...pressableFunctions
  } = props;

  // Get all the functions
  const {
    onShowAllLikesPress,
    onCommentPress,
    onLikePress,
    onLocationPress,
    onNamePress,
    onUnLikePress,
    onVideoPress,
    onLikeCountUpdate,
    onMenuIconPress,
  } = pressableFunctions;

  // Image or Video...get from mimeType
  const mimeType = file.mimeType.slice(0, 5);

  const { LikePost, UnlikePost } = useAppEndpoints();
  const dispatch = useDispatch();

  // API call to like a post
  const LikePostAPI = async () => {
    try {
      dispatch(FeedActions.LikeAPost(_id));
      dispatch(ProfileActionCreators.LikeAPost(_id));

      const apiResponse = await LikePost(_id);

      if (apiResponse.ok && apiResponse !== null) {
        dispatch(FeedActions.UpdateLikesCount(_id, apiResponse.data.likes_count));
        dispatch(ProfileActionCreators.UpdateLikesCount(_id, apiResponse.data.likes_count));
        if (typeof onLikeCountUpdate === "function")
          onLikeCountUpdate(_id, apiResponse.data.likes_count);
      }

      if (typeof onLikePress === "function") onLikePress(_id);
    } catch (error) {}
  };

  // API call to unlike a post
  const UnlikePostAPI = async () => {
    try {
      dispatch(FeedActions.UnLikeAPost(_id));
      dispatch(ProfileActionCreators.UnLikeAPost(_id));

      const apiResponse = await UnlikePost(_id);

      if (apiResponse.ok && apiResponse !== null) {
        dispatch(FeedActions.UpdateLikesCount(_id, apiResponse.data.likes_count));
        dispatch(ProfileActionCreators.UpdateLikesCount(_id, apiResponse.data.likes_count));
        if (typeof onLikeCountUpdate === "function")
          onLikeCountUpdate(_id, apiResponse.data.likes_count);
      }

      if (typeof onUnLikePress === "function") onUnLikePress(_id);
    } catch (error) {}
  };

  // render
  return (
    <Animated.View
      exiting={FadeOutLeft}
      entering={FadeInRight}
      layout={Layout}
      style={styles.container}
    >
      {/* Name and Location headers */}
      <NameAndLocationCard
        name={post_owner_details.name}
        location={location}
        profile_picture={post_owner_details.profile_picture}
        onNamePress={() => (onNamePress ? onNamePress(post_owner_details._id) : null)}
        onLocationPress={onLocationPress}
        showMenuIcon={showMenuIcon}
        onMenuIconPress={onMenuIconPress}
      />

      {/* File Part */}
      {mimeType === "image" ? (
        <PostImageCard {...file} />
      ) : mimeType === "video" ? (
        <PostVideoCard
          {...file}
          local_uri={local_uri}
          _id={_id}
          current_viewable_item={current_viewable_item}
          onVideoPress={onVideoPress}
          isMuted={isMuted}
        />
      ) : null}

      {/* Buttons Part */}
      <View style={{ flexDirection: "row", marginLeft: 10, paddingTop: 5, paddingBottom: 5 }}>
        <LikeButton isLiked={is_liked} onLikePress={LikePostAPI} onUnLikePress={UnlikePostAPI} />
        <AppIcon
          family={IconNames.FontAwesome}
          name="comment-o"
          size={30}
          marginTop={2}
          marginLeft={10}
          onPress={onCommentPress ? () => onCommentPress(_id) : null}
        />
      </View>

      {/* Captions Part */}
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        {likes_count !== undefined ? (
          <AppText
            text={Helper.get_likes_words(likes_count)}
            family={FontNames.InterBold}
            size={15}
            onPress={() => (onShowAllLikesPress ? onShowAllLikesPress(_id) : null)}
          />
        ) : null}

        <AppText
          text={caption}
          family={FontNames.PoppinsRegular}
          size={16}
          onPress={onCommentPress ? () => onCommentPress(_id) : null}
        />
      </View>

      {/* Comments Part */}
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        {comments_count !== undefined ? (
          <AppText
            text={Helper.get_comment_count_words(comments_count)}
            family={FontNames.InterLight}
            size={15}
            onPress={onCommentPress ? () => onCommentPress(_id) : null}
          />
        ) : null}

        {post_datetime !== undefined ? (
          <AppText
            text={Helper.get_time_ago(post_datetime)}
            family={FontNames.InterLight}
            size={12}
            onPress={null}
            marginTop={5}
          />
        ) : null}
      </View>
    </Animated.View>
  );
}

// exports
export default PostCard;

// styles
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});

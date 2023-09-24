// Packages Imports (from node_modules)
import { memo, useState } from "react";
import { StyleSheet } from "react-native";

// Local Imports (components/types/utils)
import AnimatedView from "../Animated/AnimatedView";
import PostCardHeader from "../Headers/PostCardHeader";
import PostDetailsContainer from "./PostDetailsContainer";
import PostFileCarousel from "../Carousel/PostFileCarousel";

// Named Imports
import { likePostAPI, unlikePostAPI } from "../../api/services/Post";
import { PostProps } from "../../types/AppTypes";

// interface for PostCard component
export interface PostCardProps {
  post: PostProps;
  inView?: boolean;
}

// functional component for PostCard
function PostCard(props: PostCardProps) {
  // Destructuring props
  const { post, inView } = props;

  // States
  const [isLiked, seIisLiked] = useState<boolean>(post.is_liked);
  const [likesCount, setLikesCount] = useState<number>(post.likes_count);

  // Like Post API call
  const likePost = async () => {
    try {
      if (isLiked) return;

      let initialState = { isLiked, likesCount };

      setLikesCount(initialState.likesCount + 1);
      seIisLiked(true);

      const apiResponse = await likePostAPI(post.id);

      if (apiResponse.ok === false) {
        seIisLiked(initialState.isLiked);
        setLikesCount(initialState.likesCount);
      }
    } catch (error) {}
  };

  // Unlike Post API call
  const unlikePost = async () => {
    try {
      if (!isLiked) return;

      let initialState = { isLiked, likesCount };

      setLikesCount(initialState.likesCount - 1);
      seIisLiked(false);

      const apiResponse = await unlikePostAPI(post.id);

      if (apiResponse.ok === false) {
        seIisLiked(initialState.isLiked);
        setLikesCount(initialState.likesCount);
      }
    } catch (error) {}
  };

  // render
  return (
    <AnimatedView style={styles.container}>
      <PostCardHeader user={post.user} location={post.location} />

      <PostFileCarousel
        files={post.files}
        inView={inView}
        onLikePress={likePost}
      />

      <PostDetailsContainer
        caption={post.caption}
        comments_count={post.comments_count}
        likes_count={likesCount}
        is_liked={isLiked}
        onLikePress={isLiked ? unlikePost : likePost}
      />
    </AnimatedView>
  );
}

// exports
export default memo(PostCard);

// styles for PostCard
const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
});

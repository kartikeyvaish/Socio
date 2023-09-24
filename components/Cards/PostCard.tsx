// Packages Imports (from node_modules)
import { memo } from "react";
import { StyleSheet } from "react-native";

// Local Imports (components/types/utils)
import AnimatedView from "../Animated/AnimatedView";
import PostCardHeader from "../Headers/PostCardHeader";
import PostDetailsContainer from "./PostDetailsContainer";
import PostFileCarousel from "../Carousel/PostFileCarousel";

// Named Imports
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

  // render
  return (
    <AnimatedView style={styles.container}>
      <PostCardHeader user={post.user} location={post.location} />

      <PostFileCarousel files={post.files} inView={inView} />

      <PostDetailsContainer
        caption={post.caption}
        comments_count={post.comments_count}
        likes_count={post.likes_count}
        is_liked={post.is_liked}
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

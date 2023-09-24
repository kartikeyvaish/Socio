// Packages Imports (from node_modules)
import { memo } from "react";
import { StyleSheet } from "react-native";

// Local Imports (components/types/utils)
import AnimatedView from "../Animated/AnimatedView";
import AppIcon from "../App/AppIcon";
import AppRow from "../App/AppRow";
import AppText from "../App/AppText";
import CaptionText from "../Text/CaptionText";
import ColorPallete from "../../constants/ColorPallete";

// Named Imports
import { get_comment_count_words, get_likes_words } from "../../helpers/utils";
import { PostProps } from "../../types/AppTypes";

// interface for PostDetailsContainer component
export interface PostDetailsContainerProps {
  is_liked?: PostProps["is_liked"];
  likes_count?: PostProps["likes_count"];
  caption?: PostProps["caption"];
  comments_count?: PostProps["comments_count"];
}

// functional component for PostDetailsContainer
function PostDetailsContainer(props: PostDetailsContainerProps) {
  // Destrcuturing props
  const { likes_count, caption, comments_count, is_liked = false } = props;

  return (
    <AnimatedView style={styles.container}>
      <AppRow style={styles.iconContainer}>
        <AppIcon
          family="FontAwesome"
          size={25}
          name={is_liked ? "heart" : "heart-o"}
          color={is_liked ? ColorPallete.danger : undefined}
          margins={{ right: 15 }}
        />
        <AppIcon
          family="FontAwesome5"
          size={25}
          name="comment"
          margins={{ right: 15 }}
        />
        <AppIcon
          family="Feather"
          size={25}
          name="send"
          margins={{ right: 15 }}
        />
      </AppRow>

      {likes_count !== undefined ? (
        <AppText
          text={get_likes_words(likes_count)}
          size={13}
          margins={{ top: 12, left: 10 }}
          fontFamily="InterBold"
        />
      ) : null}

      <CaptionText caption={caption} />

      {comments_count !== undefined ? (
        <AppText
          text={get_comment_count_words(comments_count)}
          margins={{ top: 12, left: 10 }}
          size={13}
        />
      ) : null}
    </AnimatedView>
  );
}

// exports
export default memo(PostDetailsContainer);

// styles for PostDetailsContainer
const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
  },
  iconContainer: {
    paddingLeft: 15,
  },
});

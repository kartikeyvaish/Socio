// Packages Imports (from node_modules)
import { StyleSheet } from "react-native";

// Local Imports (components/types/utils)
import AnimatedView from "../Animated/AnimatedView";

// interface for PostFileCarousel component
export interface PostFileCarouselProps {}

// functional component for PostFileCarousel
function PostFileCarousel(props: PostFileCarouselProps) {
  // Destructuring props
  const {} = props;

  // render
  return <AnimatedView style={styles.container}></AnimatedView>;
}

// exports
export default PostFileCarousel;

// styles for PostFileCarousel
const styles = StyleSheet.create({
  container: {
    backgroundColor: "dodgerblue",
    height: 200,
  },
});

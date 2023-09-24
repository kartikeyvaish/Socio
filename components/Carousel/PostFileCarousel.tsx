// Packages Imports (from node_modules)
import { useCallback } from "react";
import { FlatList, StyleSheet } from "react-native";

// Local Imports (components/types/utils)
import AnimatedView from "../Animated/AnimatedView";
import globalActions from "../../store/global/actions";
import PostImageCard from "../Cards/PostImageCard";
import PostVideoCard from "../Cards/PostVideoCard";
import useFlatList from "../../hooks/useFlatlist";

// Named Imports
import { PostProps } from "../../types/AppTypes";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";

// interface for PostFileCarousel component
export interface PostFileCarouselProps {
  files: PostProps["files"];
  inView?: boolean;
}

// functional component for PostFileCarousel
function PostFileCarousel(props: PostFileCarouselProps) {
  // Destructuring props
  const { files = [], inView = false } = props;

  const { flatListRef, onViewRef, viewConfigRef, viewableItem } = useFlatList();

  const { muted } = useAppSelector(state => state.global);

  const dispatch = useAppDispatch();

  const onVideoPress = () => {
    if (muted) {
      dispatch(globalActions.unmuteAudio());
    } else {
      dispatch(globalActions.muteAudio());
    }
  };

  const keyExtractor = useCallback(
    (_: PostProps["files"][0], index: number) => index.toString(),
    []
  );

  const renderItem = useCallback(
    ({ item, index }: { item: PostProps["files"][0]; index: number }) => {
      if (item.file_type === "image") {
        return <PostImageCard key={index.toString()} {...item} />;
      } else {
        return (
          <PostVideoCard
            shouldPlay={inView && index === viewableItem}
            onVideoPress={onVideoPress}
            isMuted={muted}
            {...item}
          />
        );
      }
    },
    [viewableItem, muted]
  );

  // render
  return (
    <AnimatedView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={files}
        keyExtractor={keyExtractor}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef}
        renderItem={renderItem}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </AnimatedView>
  );
}

// exports
export default PostFileCarousel;

// styles for PostFileCarousel
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});

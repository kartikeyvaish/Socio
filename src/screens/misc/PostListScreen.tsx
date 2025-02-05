// Packages Imports (from node_modules)
import { useCallback } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import Container from '../../components/Container';
import ContentLoader from '../../components/ContentLoader';
import Flex from '../../components/Flex';
import Post from '../../components/Post';
import profileApi from '../../api/profile';
import useFlatList from '../../hooks/useFlatlist';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import useMuted from '../../hooks/useMuted';

// Local Imports (components/types/utils)
import { AppScreenProps } from '../../navigation/types';
import { Post as PostType } from '../../types/model';

// interface for PostListScreen component
export interface PostListScreenProps {}

async function getPosts(limit: number, offset: number) {
  try {
    const apiResponse = await profileApi.getProfilePosts({ limit, offset });

    if (apiResponse.ok) {
      return { ok: true, data: apiResponse.data.posts, has_more: apiResponse.data.has_more };
    } else {
      return { ok: false, data: [], has_more: false };
    }
  } catch (error) {
    return { ok: false, data: [], has_more: false };
  }
}

function keyExtractor(item: PostType) {
  return item.id.toString();
}

// functional component for PostListScreen
function PostListScreen(props: AppScreenProps<'PostListScreen'>) {
  // Destructuring props
  const { route } = props;

  const { posts = [], startIndex = 0 } = route.params || {};

  const isFocused = useIsFocused();
  const { flatListRef, onViewRef, viewConfigRef, viewableItem } = useFlatList(null);
  const { isMuteVisible, isMuted, setIsMuteVisible, setIsMuted } = useMuted();
  const { data, getData, isFetching } = useInfiniteScroll<PostType>(
    getPosts,
    {
      limit: 10,
      offset: posts.length
    },
    false,
    posts
  );

  const renderItem = useCallback(
    ({ item: post }: { item: PostType }) => (
      <Post
        {...post}
        inView={isFocused && post.id === viewableItem}
        isMuted={isMuted}
        onMediaPress={() => {
          setIsMuted(!isMuted);
          setIsMuteVisible(true);
        }}
        showMuteIcon={isMuteVisible}
        cachingEnabled={false}
      />
    ),
    [viewableItem, isFocused, isMuted, isMuteVisible]
  );

  // render
  return (
    <Container style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        initialNumToRender={2}
        onEndReached={getData}
        initialScrollIndex={startIndex}
        onEndReachedThreshold={0.5}
        maxToRenderPerBatch={2}
        showsVerticalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: 500,
          offset: 500 * index,
          index
        })}
        ItemSeparatorComponent={() => <Flex style={{ height: 10 }} />}
        ListFooterComponent={() =>
          isFetching && data.length !== 0 ? (
            <Flex margins={{ top: 20, bottom: 20 }}>
              <ContentLoader loadingText="Fetching Posts..." />
            </Flex>
          ) : null
        }
      />
    </Container>
  );
}

// exports
export default PostListScreen;

// styles for PostListScreen
const styles = StyleSheet.create({
  container: {}
});

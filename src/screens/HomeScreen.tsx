// Packages Imports (from node_modules)
import { useCallback } from 'react';
import { FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

// Local Imports (components/types/utils)
import Container from '../components/Container';
import ContentLoader from '../components/ContentLoader';
import feedApi from '../api/feed';
import Flex from '../components/Flex';
import Post from '../components/Post';
import useFlatList from '../hooks/useFlatlist';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import useMuted from '../hooks/useMuted';

// Named Imports
import { Post as PostType } from '../types/model';

async function getFeed(limit: number, offset: number) {
  try {
    const apiResponse = await feedApi.getFeed({ limit, offset });

    if (apiResponse.ok) {
      return { ok: true, data: apiResponse.data.feed, has_more: apiResponse.data.has_more };
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

// functional component for HomeScreen
function HomeScreen() {
  // Hooks
  const isFocused = useIsFocused();
  const { flatListRef, onViewRef, viewConfigRef, viewableItem } = useFlatList(null);
  const { isMuteVisible, isMuted, setIsMuteVisible, setIsMuted } = useMuted();
  const { data, getData, isFetching } = useInfiniteScroll<PostType>(getFeed, {
    limit: 10,
    offset: 0
  });

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
      />
    ),
    [viewableItem, isFocused, isMuted, isMuteVisible]
  );

  // render
  return (
    <Container>
      <FlatList
        ref={flatListRef}
        data={data}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        initialNumToRender={2}
        onEndReached={getData}
        onEndReachedThreshold={0.5}
        maxToRenderPerBatch={2}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Flex style={{ height: 10 }} />}
        ListFooterComponent={() => (isFetching ? <MorePostsLoader /> : null)}
      />
    </Container>
  );
}

function MorePostsLoader() {
  return (
    <Flex margins={{ top: 20, bottom: 20 }}>
      <ContentLoader loadingText="Fetching Posts..." />
    </Flex>
  );
}

// exports
export default HomeScreen;

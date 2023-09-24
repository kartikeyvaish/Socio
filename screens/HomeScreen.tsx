// Packages Imports (from node_modules)
import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

// Local Imports (components/types/utils)
import AppContainer from "../components/App/AppContainer";
import HomeScreenCard from "../components/Headers/HomeScreenCard";
import PostCard from "../components/Cards/PostCard";
import useFlatList from "../hooks/useFlatlist";

// Named Imports
import { getFeed } from "../api/services/Feed";
import { PostProps } from "../types/AppTypes";

// interface for HomeScreen component
export interface HomeScreenProps {}

// functional component for HomeScreen
function HomeScreen(props: HomeScreenProps) {
  // Destructuring props
  const {} = props;

  const { flatListRef, onViewRef, viewConfigRef, viewableItem } = useFlatList();

  const [posts, setPosts] = useState<Array<PostProps>>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    initialCall();
  }, []);

  const initialCall = async () => {
    try {
      if (!posts.length) await getFeedAPI();
    } catch (error) {}
  };

  const getFeedAPI = async () => {
    try {
      const apiResponse = await getFeed();

      if (apiResponse.ok === true) {
        setPosts(apiResponse.data.posts);
      }
    } catch (error) {}
  };

  const keyExtractor = useCallback((item: PostProps) => item.id.toString(), []);

  const renderItem = useCallback(
    ({ item: post, index }: { item: PostProps; index: number }) => (
      <PostCard key={post.id} post={post} inView={index === viewableItem} />
    ),
    [viewableItem]
  );

  // onRefresh
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await getFeedAPI();
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
    }
  };

  // render
  return (
    <AppContainer style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={posts}
        onViewableItemsChanged={onViewRef.current}
        onRefresh={onRefresh}
        refreshing={refreshing}
        viewabilityConfig={viewConfigRef}
        ListHeaderComponent={<HomeScreenCard />}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        initialNumToRender={5}
        onEndReachedThreshold={0.5}
        maxToRenderPerBatch={5}
        showsVerticalScrollIndicator={false}
      />
    </AppContainer>
  );
}

// exports
export default HomeScreen;

// styles for HomeScreen
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
});

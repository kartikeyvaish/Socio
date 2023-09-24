// Packages Imports (from node_modules)
import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";

// Local Imports (components/types/utils)
import AppContainer from "../components/App/AppContainer";
import HomeScreenCard from "../components/Headers/HomeScreenCard";
import PostCard from "../components/Cards/PostCard";
import useFlatList from "../hooks/useFlatlist";

// Named Imports
import { AppScreenProps } from "../navigation/NavigationTypes";
import { getFeed } from "../api/services/Feed";
import { PostProps } from "../types/AppTypes";

// functional component for HomeScreen
function HomeScreen(props: AppScreenProps<"HomeScreen">) {
  // Helper Hook for Flatlist
  const { flatListRef, onViewRef, viewConfigRef, viewableItem } = useFlatList();

  // Local States
  const [posts, setPosts] = useState<Array<PostProps>>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // to check if the screen is focused
  const isFocused = useIsFocused();

  useEffect(() => {
    initialCall();
  }, []);

  // Initial API Call to get feed
  const initialCall = async () => {
    try {
      if (!posts.length) await getFeedAPI();
    } catch (error) {}
  };

  // API Call to fetch feed for current user
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
      <PostCard
        key={post.id}
        post={post}
        inView={isFocused && index === viewableItem}
      />
    ),
    [viewableItem, isFocused]
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

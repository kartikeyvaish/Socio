// Packages Imports
import { useContext, useEffect, useState } from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

// component imports
import AppBadge from "../components/AppBadge";
import AppContainer from "../components/AppContainer";
import AppHeader from "../components/AppHeader";
import AppIcon from "../components/AppIcon";
import { AppScreenProps } from "../navigation/NavigationProps";
import ColorPallete from "../constants/ColorPallete";
import FeedActions from "../store/feed/actions";
import GlobalContext from "../context/GlobalContext";
import IconNames from "../constants/IconNames";
import PostCard from "../components/PostCard";
import ScreenNames from "../navigation/ScreenNames";
import StoriesActions from "../store/stories/actions";
import StoryViewAvatar from "../components/StoryViewAvatar";
import useAppEndpoints from "../api/useAppEndpoints";
import useFlatListFeed from "../hooks/useFlatListFeed";

// function component for HomeScreen
function HomeScreen({ navigation }: AppScreenProps<"HomeScreen">) {
  // Local States
  const [Mute, SetMute] = useState(false);
  const [Refreshing, SetRefreshing] = useState(false);

  // Hooks and Context
  const { GetFeedPosts, GetStories } = useAppEndpoints();
  const dispatch = useDispatch();
  const { FeedPosts, User, FeedStories, ProfileStories } = useContext(GlobalContext);
  const isFocused = useIsFocused();

  // Custom hook for FlatList
  const {
    FlatlistRef,
    onViewRef,
    viewConfigRef,
    ViewableItem,
    SetViewableItem,
    ResumePlay,
    last_post_id,
  } = useFlatListFeed();

  // Use effect to detect when Feed Posts are updated
  useEffect(() => {
    last_post_id.current = FeedPosts.length ? FeedPosts[FeedPosts.length - 1]._id : null;
  }, [FeedPosts]);

  // Intial call to get Feed Posts
  useEffect(() => {
    GetFeed();
  }, []);

  // to pause the video when the screen is not focused
  useEffect(() => {
    if (isFocused) {
      if (ViewableItem === null) ResumePlay();
    } else SetViewableItem(null);
  }, [isFocused, navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      SetViewableItem(null);
    });

    return unsubscribe;
  }, [navigation]);

  // API call to get latest feed
  const GetFeed = async () => {
    try {
      const apiResponse = await GetFeedPosts({});
      if (apiResponse.ok && apiResponse !== null && apiResponse !== null)
        dispatch(FeedActions.SetFeed(apiResponse.data.posts));

      const storyResponse = await GetStories();
      if (storyResponse.ok && storyResponse !== null) {
        dispatch(StoriesActions.SetStories(storyResponse.data.feed_stories));
        dispatch(StoriesActions.SetProfileStories(storyResponse.data.profile_stories));
      }
    } catch (error) {}
  };

  // Add more posts to the feed
  const AddPostsAPI = async () => {
    try {
      const apiResponse = await GetFeedPosts({
        ...(last_post_id.current !== null ? { last_post_id: last_post_id.current } : {}),
      });
      if (apiResponse.ok && apiResponse !== null) {
        dispatch(FeedActions.AddPosts(apiResponse.data.posts));
      }
    } catch (error) {}
  };

  // onRefresh
  const onRefresh = async () => {
    try {
      SetRefreshing(true);
      await GetFeed();
      SetRefreshing(false);
    } catch (error) {
      SetRefreshing(false);
    }
  };

  // renderItem function
  const renderItem = ({ item }) => (
    <PostCard
      {...item}
      isMuted={Mute}
      onVideoPress={() => SetMute(!Mute)}
      current_viewable_item={ViewableItem}
      onShowAllLikesPress={() =>
        navigation.navigate(ScreenNames.LikesScreen, { post_id: item._id })
      }
      onCommentPress={() =>
        navigation.navigate(ScreenNames.CommentsScreen, { post_id: item._id, ...item })
      }
      onNamePress={() =>
        item.post_owner_details._id === User._id
          ? navigation.navigate(ScreenNames.ProfileTabScreen)
          : navigation.navigate(ScreenNames.PersonProfileScreen, {
              ...item.post_owner_details,
              user_id: item.post_owner_details._id,
            })
      }
    />
  );

  // Header render
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <AppHeader marginLeft={10} />

        <View style={{ flexDirection: "row" }}>
          <FlatList
            data={FeedStories}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item._id}
            ListHeaderComponent={
              <StoryViewAvatar
                profile_picture={User.profile_picture}
                username="You"
                onAvatarPress={
                  ProfileStories.stories.length > 0
                    ? () => navigation.navigate(ScreenNames.ViewOwnStoryScreen)
                    : () => navigation.navigate(ScreenNames.NewStoryScreen)
                }
                showBorder={ProfileStories.stories.length === 0 ? false : true}
                borderColor={
                  ProfileStories.viewed_by_you === true ? ColorPallete.grey : ColorPallete.primary
                }
                showIcon={ProfileStories.stories.length === 0 ? true : false}
              />
            }
            renderItem={({ item, index }) => (
              <StoryViewAvatar
                key={index}
                {...item}
                onAvatarPress={() => navigation.navigate(ScreenNames.StoryFeedScreen, { index })}
                showBorder={true}
                borderColor={item.viewed_by_you ? ColorPallete.grey : ColorPallete.primary}
                showIcon={false}
              />
            )}
          />
        </View>
      </View>
    );
  };

  // render
  return (
    <AppContainer>
      <FlatList
        ref={FlatlistRef}
        data={FeedPosts}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        onRefresh={onRefresh}
        refreshing={Refreshing}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef}
        ListHeaderComponent={renderHeader}
        initialNumToRender={5}
        onEndReachedThreshold={0.5}
        onEndReached={AddPostsAPI}
        maxToRenderPerBatch={5}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.iconContainer}>
        <Pressable onPress={() => navigation.navigate(ScreenNames.ChatsScreen)}>
          <AppIcon family={IconNames.MaterialCommunityIcons} name="telegram" size={40} />
          <AppBadge badgeCount={0} badgeContainerStyle={styles.badge} />
        </Pressable>
      </View>
    </AppContainer>
  );
}

// exports
export default HomeScreen;

const styles = StyleSheet.create({
  headerContainer: {},
  iconContainer: {
    width: "100%",
    alignItems: "flex-end",
    position: "absolute",
    paddingRight: 10,
    right: 0,
    top: 0,
  },
  badge: { position: "absolute", top: 0, right: -5 },
});

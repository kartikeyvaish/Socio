import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { connect, useSelector } from "react-redux";
import { useScrollToTop } from "@react-navigation/native";

import API from "../api/API";
import ColorPallete from "../config/ColorPallete";
import Container from "./../components/Container";
import config from "../config/config";
import HeaderBar from "../components/HeaderBar";
import Text from "../components/Text";
import Toast from "../components/Toast";
import PostCard from "../components/PostCard";
import { SetPosts } from "./../store/posts/actions";
import { SetStorePosts } from "./../store/cache/actions";
import ScreenNames from "../navigation/ScreenNames";

function HomeScreen({
  navigation,
  User,
  Posts = [],
  UpdatePosts,
  UpdateStorePosts,
  StorePosts = [],
}) {
  const FlatListRef = useRef(null);
  const LastItem = useRef("");
  const LastID = useRef("");
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 70 });
  const [ViewableItem, SetViewableItem] = useState("");
  const [UniversalMute, SetUniversalMute] = useState(true);
  const [GettingPosts, SetGettingPosts] = useState(false);
  const [Refreshing, SetRefreshing] = useState(false);

  const Unread = useSelector((state) => state.ChatsState.Unread);

  // On double tap of Home Screen tab, the user scrolls to top
  useScrollToTop(FlatListRef);

  // Get Posts Initially
  useEffect(() => {
    InitialLoad();
  }, []);

  // Whenver the posts array gets updated, update the LastID to the last element of Posts array
  useEffect(() => {
    if (Posts.length > 0) LastID.current = Posts[Posts.length - 1]._id;
  }, [Posts]);

  // To stop playing the video when the user changes the screen
  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      SetViewableItem(null);
    });

    return unsubscribe;
  }, [navigation]);

  // To resume playing video on returing to the screen
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      ResumePlay();
    });

    return unsubscribe;
  }, [navigation]);

  // First time loading of posts
  const InitialLoad = async () => {
    try {
      await GetPosts();
    } catch (error) {}
  };

  // refresh the posts
  const Refresh = async () => {
    try {
      SetRefreshing(true);
      await GetPosts();
      SetRefreshing(false);
    } catch (error) {
      SetRefreshing(false);
    }
  };

  // Viewable configuration
  const onViewRef = useRef((viewableItems) => {
    if (viewableItems?.viewableItems?.length > 0) {
      SetViewableItem(viewableItems.viewableItems[0].item._id || 0);
      LastItem.current = viewableItems.viewableItems[0].item._id;
    }
  });

  // useCallback for Resume Playing
  const ResumePlay = useCallback(() => {
    try {
      if (LastItem.current !== null) {
        SetViewableItem(LastItem.current);
      }
    } catch (error) {}
  }, [LastItem]);

  // useCallback for Adding more Posts
  const AddMorePosts = useCallback(async () => {
    try {
      if (Posts.length) {
        SetGettingPosts(true);
        const response = await API.GetUserFeed(User.Token, LastID.current);

        SetGettingPosts(false);
        if (response.ok) {
          if (response.data.PostsCount)
            UpdatePosts([...Posts, ...response.data.Posts]);
        } else Toast.show({ text: config.messages.ServerError });
      }
    } catch (error) {
      SetGettingPosts(false);
      Toast.show({ text: config.messages.ServerError });
    }
  }, [Posts, User]);

  // useCallback for Getting Posts
  const GetPosts = useCallback(async () => {
    try {
      const response = await API.GetUserFeed(User.Token);
      if (response.ok) {
        let len = response.data.PostsCount;
        if (len) {
          UpdatePosts(response.data.Posts);
          UpdateStorePosts(response.data.Posts);
        }
      } else {
        Toast.show({ text: config.messages.ServerError });
      }
    } catch (error) {
      Toast.show({ text: config.messages.ServerError });
    }
  }, [Posts, User]);

  // useMemo for LogoHeader
  const LogoHeader = useMemo(() => {
    return (
      <>
        <HeaderBar
          showPrefixIcon={false}
          onSuffixPress={() => navigation.navigate(ScreenNames.Chats)}
          SuffixBadgeNumber={Unread}
        />
      </>
    );
  }, [navigation, Unread]);

  // useMemo for Empty Part
  const EmptyRender = useMemo(() => {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text text="No Posts" marginTop={20} size={20} family="InterBold" />
        <Text text="Add some friend to see posts." marginTop={5} size={18} />
      </View>
    );
  }, []);

  // useMemo for Rendering Item
  const RenderFilePart = ({ item }) => (
    <PostCard
      {...item}
      Token={User.Token}
      onNamePress={
        User._id === item.user_id
          ? () => navigation.navigate(ScreenNames.ProfileScreen)
          : () =>
              navigation.navigate(ScreenNames.PersonProfile, {
                title: item.Username,
                _id: item.user_id,
              })
      }
      Width={item.dimensions.width}
      Height={item.dimensions.height}
      onLikesPress={() =>
        navigation.navigate(ScreenNames.Likes, { PostID: item._id })
      }
      onCommentPress={() =>
        navigation.navigate(ScreenNames.Comments, {
          PostID: item._id,
          PostOwnerID: item.user_id,
        })
      }
      onRefresh={GetPosts}
      viewable={ViewableItem}
      muted={UniversalMute}
      onMuteToggle={() => SetUniversalMute(!UniversalMute)}
    />
  );

  return (
    <Container>
      <FlatList
        data={Posts.length ? Posts : StorePosts}
        ref={FlatListRef}
        refreshing={Refreshing}
        viewabilityConfig={viewConfigRef.current}
        keyExtractor={(item) => item._id.toString()}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        renderItem={RenderFilePart}
        ListHeaderComponent={LogoHeader}
        ListEmptyComponent={EmptyRender}
        ListFooterComponent={
          Posts.length > 0 ? (
            <View style={styles.footerContainer}>
              {GettingPosts ? (
                <ActivityIndicator size="large" color={ColorPallete.grandis} />
              ) : null}
            </View>
          ) : null
        }
        onRefresh={Refresh}
        onEndReached={Posts.length > 5 ? AddMorePosts : null}
        onEndReachedThreshold={0.5}
      />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    User: state.AuthState.User,
    Posts: state.PostsState.Posts,
    StorePosts: state.CacheState.StorePosts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    UpdatePosts: (posts) => dispatch(SetPosts(posts)),
    UpdateStorePosts: (posts) => dispatch(SetStorePosts(posts)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  footerContainer: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
});

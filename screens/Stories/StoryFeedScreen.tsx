// Packages Imports
import { useContext, useEffect } from "react";
import { View, StyleSheet, FlatList, ListRenderItem, StatusBar } from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import * as NavigationBar from "expo-navigation-bar";
import { useIsFocused, useTheme } from "@react-navigation/native";

// Local Imports
import { AppScreenProps } from "../../navigation/NavigationProps";
import ColorPallete from "../../constants/ColorPallete";
import Layout from "../../constants/Layout";
import GlobalContext from "../../context/GlobalContext";
import ScreenNames from "../../navigation/ScreenNames";
import StoriesCard from "../../components/StoriesCard";
import { StoryItemProps } from "../../store/stories/types";
import useStoryFlatlist from "../../hooks/useStoryFlatlist";

// Constants
const screenWidth = Layout.window.width;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

// function component for StoryFeedScreen
function StoryFeedScreen({ navigation, route }: AppScreenProps<"StoryFeedScreen">) {
  // Hooks and Context
  const { FeedStories, User } = useContext(GlobalContext);
  const scrollX = useSharedValue(0);
  const { colors } = useTheme();
  const isFocused = useIsFocused();
  const { index } = route.params ?? {};

  // Custom hook for FlatList
  const { FlatListRef, ViewableItem, onViewRef, viewConfigRef, ScrollToNext, ScrollToPrevious } =
    useStoryFlatlist({
      length: FeedStories.length,
      goBack: () => navigation.goBack(),
    });

  // Change colors when screen focused
  useEffect(() => {
    if (isFocused) NavigationBar.setBackgroundColorAsync(ColorPallete.black);
    else NavigationBar.setBackgroundColorAsync(colors.background);
  }, [isFocused]);

  // onScroll
  const onScroll = useAnimatedScrollHandler(event => {
    try {
      scrollX.value = event.contentOffset.x;
    } catch (error) {
      scrollX.value = 0;
    }
  });

  // render Item function
  const renderItem: ListRenderItem<StoryItemProps> = ({ item, index }) => (
    <StoriesCard
      index={index}
      scrollX={scrollX}
      current_viewing={ViewableItem}
      onGoToPreviousItem={ScrollToPrevious}
      onLastItemFinished={ScrollToNext}
      onViewCountPress={story_id => navigation.navigate(ScreenNames.StoryViewsScreen, { story_id })}
      stories={item.stories}
      _id={item._id}
      profile_picture={item.profile_picture}
      username={item.username}
      onNamePress={(_id?: string, username?: string, profile_picture?: string) =>
        _id === User._id
          ? navigation.navigate(ScreenNames.ProfileTabScreen)
          : navigation.navigate(ScreenNames.PersonProfileScreen, {
              username: username,
              profile_picture: profile_picture,
              _id: _id,
              user_id: _id,
            })
      }
    />
  );

  // render
  return FeedStories.length === 0 ? null : (
    <View style={styles.container}>
      {isFocused ? (
        <StatusBar backgroundColor={ColorPallete.black} barStyle="light-content" />
      ) : null}

      <AnimatedFlatList
        data={FeedStories}
        keyExtractor={(item: StoryItemProps) => item._id}
        renderItem={renderItem}
        ref={FlatListRef}
        style={StyleSheet.absoluteFillObject}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={index ?? 0}
        scrollEventThrottle={16}
        pagingEnabled
        contentContainerStyle={{ width: screenWidth * FeedStories.length }}
        onScroll={onScroll}
        decelerationRate={0.99}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef}
        horizontal
      />
    </View>
  );
}

// exports
export default StoryFeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

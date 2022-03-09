// Packages Imports
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { FadeInUp, FadeOutUp, Layout as LT } from "react-native-reanimated";

// Local Imports
import AppIcon from "./AppIcon";
import AppText from "./AppText";
import ColorPallete from "../constants/ColorPallete";
import FontNames from "../constants/FontNames";
import IconNames from "../constants/IconNames";
import Layout from "../constants/Layout";
import StoriesBars from "./StoriesBars";
import { StoriesCardProps } from "../store/stories/types";
import StoriesHeader from "./StoriesHeader";
import StoryFileCard from "./StoryFileCard";
import useStoriesItemStyle from "../hooks/useStoriesStyle";
import { useDispatch } from "react-redux";
import StoriesActions from "../store/stories/actions";
import useAppEndpoints from "../api/useAppEndpoints";

// Constants
const screenWidth = Layout.window.width;
const screenHeight = Layout.window.height;

// function component for StoriesCard
function StoriesCard(props: StoriesCardProps) {
  // Destructuring props
  const {
    scrollX = { value: 0 },
    index,
    _id,
    profile_picture,
    username,
    stories,
    onLastItemFinished,
    onGoToPreviousItem,
    current_viewing,
    onViewCountPress,
    onNamePress,
    onIconPress,
    showIcon,
  } = props;

  const AnimatedStyles = useStoriesItemStyle({ scrollX, index });

  const [CurrentItem, SetCurrentItem] = useState<{ _id?: string; index?: number }>({
    _id: stories[0]._id,
    index: 0,
  });
  const [VideoPaused, SetVideoPaused] = useState<boolean>(false);
  const FirstRenderDone = useRef(false);
  const dispatch = useDispatch();
  const { MarkStoryViewed } = useAppEndpoints();

  useEffect(() => {
    FirstRenderDone.current = true;
  }, []);

  useEffect(() => {
    if (!showIcon) dispatch(StoriesActions.MarkStoryAsViewed(_id, stories[CurrentItem.index]._id));

    MarkStoryAsViewed(stories[CurrentItem.index]._id);
  }, [CurrentItem]);

  // FGo to the next item
  const GoToNext = () => {
    try {
      if (CurrentItem.index === stories.length - 1) {
        if (typeof onLastItemFinished === "function") onLastItemFinished();
        return;
      }

      SetCurrentItem({ _id: stories[CurrentItem.index + 1]._id, index: CurrentItem.index + 1 });
    } catch (error) {}
  };

  // Go to the previous item
  const GoToPrevious = () => {
    try {
      if (CurrentItem.index === 0) {
        if (typeof onGoToPreviousItem === "function") onGoToPreviousItem();
        return;
      }

      SetCurrentItem({ _id: stories[CurrentItem.index - 1]._id, index: CurrentItem.index - 1 });
    } catch (error) {}
  };

  // function to execute on LongPress
  const onLongPress = () => {
    if (stories[CurrentItem.index].file.mimeType.slice(0, 5) === "video") SetVideoPaused(true);
  };

  // function to execute on TOuchENd
  const onTouchEnd = () => {
    if (VideoPaused) SetVideoPaused(false);
  };

  // mark the story as viewed
  const MarkStoryAsViewed = async (story_id: string) => {
    try {
      await MarkStoryViewed(story_id);
    } catch (error) {}
  };

  // render
  return (
    <Animated.View style={[styles.container, AnimatedStyles]}>
      <View style={styles.fileContainerStyle}>
        <StoryFileCard
          mimeType={stories[CurrentItem.index].file.mimeType}
          uri={stories[CurrentItem.index].file.uri}
          onVideoFinish={GoToNext}
          shouldVideoPlay={current_viewing === _id && !VideoPaused}
        />

        <Pressable
          style={[styles.halfContainer, { left: 0 }]}
          onPress={GoToPrevious}
          onLongPress={onLongPress}
          onTouchEnd={onTouchEnd}
        />
        <Pressable
          style={[styles.halfContainer, { right: 0 }]}
          onPress={GoToNext}
          onLongPress={onLongPress}
          onTouchEnd={onTouchEnd}
        />
      </View>

      {!VideoPaused ? (
        <Animated.View
          entering={FirstRenderDone.current ? FadeInUp : null}
          exiting={FirstRenderDone.current ? FadeOutUp : null}
          layout={LT}
        >
          <StoriesBars current_viewing_item={CurrentItem} stories={stories} />

          <StoriesHeader
            _id={_id}
            profile_picture={profile_picture}
            username={username}
            datetime={stories[CurrentItem.index].file.datetime}
            onNamePress={() => onNamePress(_id, username, profile_picture)}
            onIconPress={() => onIconPress(stories[CurrentItem.index]._id)}
            showIcon={showIcon}
          />
        </Animated.View>
      ) : null}

      {!VideoPaused ? (
        <Animated.View
          entering={FirstRenderDone.current ? FadeInUp : null}
          exiting={FirstRenderDone.current ? FadeOutUp : null}
          layout={LT}
          style={styles.seenCountContainer}
        >
          <AppIcon
            family={IconNames.AntDesign}
            name="eye"
            size={25}
            onPress={() => onViewCountPress(stories[CurrentItem.index]._id)}
            color={ColorPallete.white}
          />
          <AppText
            text={`${stories[CurrentItem.index].view_count}`}
            size={15}
            family={FontNames.InterBold}
            onPress={() => onViewCountPress(stories[CurrentItem.index]._id)}
            color={ColorPallete.white}
          />
        </Animated.View>
      ) : null}
    </Animated.View>
  );
}

// exports
export default StoriesCard;

// styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorPallete.black,
    width: screenWidth,
    height: screenHeight,
    borderRadius: 12,
    overflow: "hidden",
  },
  fileContainerStyle: {
    width: screenWidth,
    height: screenHeight,
    position: "absolute",
    top: 0,
    left: 0,
  },
  halfContainer: {
    position: "absolute",
    top: 0,
    width: screenWidth / 2,
    height: screenHeight,
  },
  seenCountContainer: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
  },
});

// Packages Imports
import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { useIsFocused, useTheme } from "@react-navigation/native";
import { useDispatch } from "react-redux";

// Local Imports
import AlertDialog from "../../components/AlertDialog";
import { AppScreenProps } from "../../navigation/NavigationProps";
import BackDrop from "../../components/BackDrop";
import ColorPallete from "../../constants/ColorPallete";
import GlobalContext from "../../context/GlobalContext";
import Helper from "../../utils/Helper";
import StoriesCard from "../../components/StoriesCard";
import ScreenNames from "../../navigation/ScreenNames";
import StoriesActions from "../../store/stories/actions";
import useAppEndpoints from "../../api/useAppEndpoints";

// function component for ViewOwnStoryScreen
function ViewOwnStoryScreen({ navigation }: AppScreenProps<"StoryFeedScreen">) {
  // Hooks and Context
  const { ProfileStories, User } = useContext(GlobalContext);
  const { colors } = useTheme();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { DeleteStory } = useAppEndpoints();

  // Local States
  const [DeleteConfirm, SetDeleteConfirm] = useState(false);
  const [SelectedStory, SetSelectedStory] = useState(null);

  // function to delete a story
  const DeleteStoryAPI = async () => {
    try {
      SetDeleteConfirm(false);

      if (SelectedStory) dispatch(StoriesActions.RemoveProfileStories(SelectedStory));

      const apiResponse = await DeleteStory(SelectedStory);
      if (apiResponse.ok && apiResponse !== null) {
      } else {
        Helper.ShowToast(apiResponse.data.message);
      }

      SetSelectedStory(null);
    } catch (error) {
      SetSelectedStory(null);
      SetDeleteConfirm(false);
    }
  };

  // Change colors when screen focused
  useEffect(() => {
    if (isFocused) NavigationBar.setBackgroundColorAsync(ColorPallete.black);
    else NavigationBar.setBackgroundColorAsync(colors.background);
  }, [isFocused]);

  // after stories viewed, mark them as viewed and go back
  const onLastItemFinished = () => {
    try {
      navigation.goBack();
      dispatch(StoriesActions.MarkProfileStoryAsViewed());
    } catch (error) {}
  };

  // render
  return ProfileStories.stories.length === 0 ? null : (
    <View style={styles.container}>
      {isFocused ? (
        <StatusBar backgroundColor={ColorPallete.black} barStyle="light-content" />
      ) : null}

      <StoriesCard
        onGoToPreviousItem={() => navigation.goBack()}
        onLastItemFinished={onLastItemFinished}
        onViewCountPress={story_id =>
          navigation.navigate(ScreenNames.StoryViewsScreen, { story_id })
        }
        stories={ProfileStories.stories}
        _id={"PROFILE_STORIES"}
        current_viewing={"PROFILE_STORIES"}
        profile_picture={User.profile_picture}
        scrollX={{ value: 0 }}
        index={0}
        username={User.username}
        onNamePress={(_id: string) => navigation.navigate(ScreenNames.ProfileTabScreen)}
        showIcon={true}
        onIconPress={(_id?: string) => {
          SetSelectedStory(_id);
          SetDeleteConfirm(true);
        }}
      />

      <BackDrop onBackDropPress={() => SetDeleteConfirm(false)} visible={DeleteConfirm}>
        <AlertDialog
          dialogTitle="Delete Story?"
          subTitle="Are you sure you want to delete this story?"
          firstButtonText="Yes"
          secondButtonText="No"
          firstButtonOnPress={DeleteStoryAPI}
          secondButtonOnPress={() => SetDeleteConfirm(false)}
        />
      </BackDrop>
    </View>
  );
}

// exports
export default ViewOwnStoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

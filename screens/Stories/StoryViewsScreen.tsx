// Packages Imports
import { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

// Local Imports
import { AppScreenProps } from "../../navigation/NavigationProps";
import GlobalContext from "../../context/GlobalContext";
import useAppEndpoints from "../../api/useAppEndpoints";
import AppContainer from "../../components/AppContainer";
import PeopleCard from "../../components/PeopleCard";
import AppScrollContainer from "./../../components/AppScrollContainer";
import Helper from "../../utils/Helper";
import ToastMessages from "../../constants/Messages";
import ScreenNames from "../../navigation/ScreenNames";
import AppLoading from "../../components/AppLoading";

// function component for StoryViewsScreen
function StoryViewsScreen(props: AppScreenProps<"StoryViewsScreen">) {
  // Destructuring props
  const { route, navigation } = props;
  const { story_id } = route.params;

  // Local States
  const [Views, SetViews] = useState([]);
  const [Loading, SetLoading] = useState(true);
  const [Refreshing, SetRefreshing] = useState(false);

  // Get the user
  const { User } = useContext(GlobalContext);
  const { GetStoryViews } = useAppEndpoints();

  // useEffect to generate the initial call
  useEffect(() => {
    InitialCall();
  }, []);

  // Intial call to get the story views
  const InitialCall = async () => {
    try {
      SetLoading(true);
      await GetStoryViewsAPI();
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
    }
  };

  // Get Story Views
  const GetStoryViewsAPI = async () => {
    try {
      const apiResponse = await GetStoryViews(story_id);
      if (apiResponse.ok && apiResponse !== null) {
        SetViews(apiResponse.data.viewed_by);
      } else {
        Helper.ShowToast(apiResponse.data.message);
      }
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
    }
  };

  // function to be called on Refresh
  const onRefresh = async () => {
    try {
      SetRefreshing(true);
      await GetStoryViewsAPI();
      SetRefreshing(false);
    } catch (error) {
      SetRefreshing(false);
    }
  };

  // render
  return (
    <AppContainer>
      {Loading ? (
        <AppLoading loadingText="Getting Views.." visible={true} />
      ) : (
        <AppScrollContainer onRefresh={onRefresh} refreshing={Refreshing}>
          {Views.map(item => (
            <PeopleCard
              key={item._id}
              profile_picture={item.profile_picture}
              title={item.name}
              subtitle={item.username}
              imageProps={{ size: 60 }}
              onTitlePress={() =>
                item._id === User._id
                  ? navigation.navigate(ScreenNames.ProfileTabScreen)
                  : navigation.navigate(ScreenNames.PersonProfileScreen, {
                      ...item,
                      user_id: item._id,
                    })
              }
              onSubtitlePress={() =>
                item._id === User._id
                  ? navigation.navigate(ScreenNames.ProfileTabScreen)
                  : navigation.navigate(ScreenNames.PersonProfileScreen, {
                      ...item,
                      user_id: item._id,
                    })
              }
            />
          ))}
        </AppScrollContainer>
      )}
    </AppContainer>
  );
}

// exports
export default StoryViewsScreen;

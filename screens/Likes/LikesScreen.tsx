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

// function component for LikesScreen
function LikesScreen(props: AppScreenProps<"LikesScreen">) {
  // Destructuring props
  const { route, navigation } = props;
  const { post_id } = route.params;

  // Local States
  const [Likes, SetLikes] = useState([]);
  const [Loading, SetLoading] = useState(true);
  const [Refreshing, SetRefreshing] = useState(false);

  // Get the user
  const { User } = useContext(GlobalContext);
  const { GetLikes } = useAppEndpoints();

  // useEffect to generate the initial call
  useEffect(() => {
    InitialCall();
  }, []);

  // Intial call to get the post likes
  const InitialCall = async () => {
    try {
      SetLoading(true);
      await GetPostLikesAPI();
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
    }
  };

  // Get Post Likes
  const GetPostLikesAPI = async () => {
    try {
      const apiResponse = await GetLikes(post_id);
      if (apiResponse.ok && apiResponse !== null) {
        SetLikes(apiResponse.data.likes);
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
      await GetPostLikesAPI();
      SetRefreshing(false);
    } catch (error) {
      SetRefreshing(false);
    }
  };

  // render
  return Loading ? (
    <AppLoading loadingText="Getting Likes.." visible={true} />
  ) : (
    <AppScrollContainer onRefresh={onRefresh} refreshing={Refreshing}>
      {Likes.map(item => (
        <PeopleCard
          key={item._id}
          profile_picture={item.liked_by.profile_picture}
          title={item.liked_by.name}
          subtitle={item.liked_by.username}
          imageProps={{ size: 60 }}
          onTitlePress={() =>
            item.liked_by._id === User._id
              ? navigation.navigate(ScreenNames.ProfileTabScreen)
              : navigation.navigate(ScreenNames.PersonProfileScreen, {
                  ...item.liked_by,
                  user_id: item.liked_by._id,
                })
          }
          onSubtitlePress={() =>
            item.liked_by._id === User._id
              ? navigation.navigate(ScreenNames.ProfileTabScreen)
              : navigation.navigate(ScreenNames.PersonProfileScreen, {
                  ...item.liked_by,
                  user_id: item.liked_by._id,
                })
          }
        />
      ))}
    </AppScrollContainer>
  );
}

// exports
export default LikesScreen;

// styles
const styles = StyleSheet.create({
  container: {},
});

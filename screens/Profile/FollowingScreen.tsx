// Packages Imports
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

// Local Imports
import AppScrollContainer from "../../components/AppScrollContainer";
import AppLoading from "../../components/AppLoading";
import AlertDialog from "../../components/AlertDialog";
import { AppScreenProps } from "../../navigation/NavigationProps";
import BackDrop from "../../components/BackDrop";
import GlobalContext from "../../context/GlobalContext";
import Helper from "../../utils/Helper";
import PeopleCard from "../../components/PeopleCard";
import ProfileActionCreators from "../../store/profile/actions";
import ToastMessages from "../../constants/Messages";
import useAppEndpoints from "../../api/useAppEndpoints";
import useBackHandler from "../../hooks/useBackHandler";
import useLoading from "../../hooks/useLoading";
import ScreenNames from "../../navigation/ScreenNames";

// function component for FollowingScreen
function FollowingScreen(props: AppScreenProps<"FollowingScreen">) {
  // Destructuring props
  const { route, navigation } = props;
  const { user_id } = route?.params ?? {};

  // Local States
  const [Following, SetFollowers] = useState([]);
  const [RemoveConfirmation, SetRemoveConfirmation] = useState(false);
  const selectedPerson = useRef(null);

  // Hooks and Contexts
  const { GetFollowing, Unfollow } = useAppEndpoints();
  const dispatch = useDispatch();
  const { Loading, SetLoading, Refreshing, SetRefreshing } = useLoading({ initialValue: true });
  const { User } = useContext(GlobalContext);

  // Hide the navigation header while loading
  useEffect(() => {
    if (Loading) {
      navigation.setOptions({ headerShown: false });
    } else {
      navigation.setOptions({ headerShown: true });
    }
  }, [Loading, navigation]);

  // Handle BackPress
  useBackHandler(() => {
    if (Loading) return true;
    return false;
  });

  // Get Following
  useEffect(() => {
    IntialCall();
  }, []);

  // Initial call to get the following
  const IntialCall = async () => {
    try {
      SetLoading(true);
      await GetFollowingAPI();
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
    }
  };

  // onRefresh
  const onRefresh = async () => {
    try {
      SetRefreshing(true);
      await GetFollowingAPI();
      SetRefreshing(false);
    } catch (error) {
      SetRefreshing(false);
    }
  };

  // Remove from the following
  const UnfollowAPI = async () => {
    try {
      // Condition to check whether its users following or not
      if (User._id === user_id) {
        if (selectedPerson.current) {
          let temp = [...Following];
          const index = temp.findIndex(follower => follower._id === selectedPerson.current._id);

          if (index !== -1) {
            temp.splice(index, 1);
            SetFollowers(temp);
          }

          const apiResponse = await Unfollow(selectedPerson.current._id);
          if (apiResponse.ok && apiResponse !== null) {
            dispatch(
              ProfileActionCreators.SetFollowingCount(
                apiResponse.data.current_user_following_count ?? 0
              )
            );
          }
        }
      }

      selectedPerson.current = null;
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
    }
  };

  // API call to get the following
  const GetFollowingAPI = async () => {
    try {
      const apiResponse = await GetFollowing(user_id);

      // If response is successful
      if (apiResponse.ok && apiResponse !== null) {
        // If user_id is equal to current user id, then set the following to the current user following
        if (user_id === User._id) {
          // Update the Following Count in Profile Reducer
          dispatch(ProfileActionCreators.SetFollowingCount(apiResponse.data.following.length));
        }
        SetFollowers(apiResponse.data.following);
      } else {
        Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
      }
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
    }
  };

  // render
  return (
    <>
      <AppScrollContainer onRefresh={onRefresh} refreshing={Refreshing}>
        {Following.map(item => (
          <PeopleCard
            {...item}
            key={item._id}
            title={item.name}
            subtitle={item.username}
            firstButtonTitle={User._id === user_id ? "Unfollow" : null}
            firstButtonOnPress={() => {
              selectedPerson.current = item;
              SetRemoveConfirmation(true);
            }}
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
            firstButtonProps={{ containerStyles: { maxWidth: 100 } }}
            buttonContainerStyle={{ justifyContent: "flex-end" }}
          />
        ))}

        <BackDrop onBackDropPress={() => SetRemoveConfirmation(false)} visible={RemoveConfirmation}>
          <AlertDialog
            dialogTitle="Remove Follower"
            subTitle={
              `Are you sure you want to unfollow ` +
              (selectedPerson.current?.name ?? "this person") +
              `? You will have to follow again to see their posts.`
            }
            firstButtonText="Yes"
            secondButtonText="No"
            firstButtonOnPress={() => {
              SetRemoveConfirmation(false);
              UnfollowAPI();
            }}
            secondButtonOnPress={() => {
              SetRemoveConfirmation(false);
              selectedPerson.current = null;
            }}
          />
        </BackDrop>
      </AppScrollContainer>

      {Loading ? <AppLoading visible={true} loadingText="Getting Following" /> : null}
    </>
  );
}

// exports
export default FollowingScreen;

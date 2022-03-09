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

// function component for FollowersScreen
function FollowersScreen(props: AppScreenProps<"FollowersScreen">) {
  // Destructuring props
  const { route, navigation } = props;
  const { user_id } = route?.params ?? {};

  // Local States
  const [Followers, SetFollowers] = useState([]);
  const [RemoveConfirmation, SetRemoveConfirmation] = useState(false);
  const selectedPerson = useRef(null);

  // Hooks and Contexts
  const { GetFollowers, RemoveFollower } = useAppEndpoints();
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

  // Get Followers
  useEffect(() => {
    IntialCall();
  }, []);

  // Initial call to get the followers
  const IntialCall = async () => {
    try {
      SetLoading(true);
      await GetFollowersAPI();
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
    }
  };

  // onRefresh
  const onRefresh = async () => {
    try {
      SetRefreshing(true);
      await GetFollowersAPI();
      SetRefreshing(false);
    } catch (error) {
      SetRefreshing(false);
    }
  };

  // Remove from the followers
  const RemoveFromFollowers = async () => {
    try {
      // Condition to check whether its users followers or not
      if (User._id === user_id) {
        if (selectedPerson.current) {
          let temp = [...Followers];
          const index = temp.findIndex(follower => follower._id === selectedPerson.current._id);

          if (index !== -1) {
            temp.splice(index, 1);
            SetFollowers(temp);
          }

          const apiResponse = await RemoveFollower(selectedPerson.current._id);
          if (apiResponse.ok && apiResponse !== null) {
            dispatch(
              ProfileActionCreators.SetFollowersCount(
                apiResponse.data.current_user_followers_count ?? 0
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

  // API call to get the followers
  const GetFollowersAPI = async () => {
    try {
      const apiResponse = await GetFollowers(user_id);

      // If response is successful
      if (apiResponse.ok && apiResponse !== null) {
        // If user_id is equal to current user id, then set the followers to the current user followers
        if (user_id === User._id) {
          // Update the Followers Count in Profile Reducer
          dispatch(ProfileActionCreators.SetFollowersCount(apiResponse.data.followers.length));
        }
        SetFollowers(apiResponse.data.followers);
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
        {Followers.map(item => (
          <PeopleCard
            {...item}
            key={item._id}
            title={item.name}
            subtitle={item.username}
            firstButtonTitle={User._id === user_id ? "Remove" : null}
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
              `Are you sure you want to remove ` +
              (selectedPerson.current?.name ?? "this person") +
              `from your followers ?`
            }
            firstButtonText="Yes"
            secondButtonText="No"
            firstButtonOnPress={() => {
              SetRemoveConfirmation(false);
              RemoveFromFollowers();
            }}
            secondButtonOnPress={() => {
              SetRemoveConfirmation(false);
              selectedPerson.current = null;
            }}
          />
        </BackDrop>
      </AppScrollContainer>

      {Loading ? <AppLoading visible={true} loadingText="Getting Followers" /> : null}
    </>
  );
}

// exports
export default FollowersScreen;

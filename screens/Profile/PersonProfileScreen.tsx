// Packages Imports
import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useDispatch } from "react-redux";

// Local imports
import AppContainer from "../../components/AppContainer";
import AppImage from "../../components/AppImage";
import { AppScreenProps } from "../../navigation/NavigationProps";
import AlertDialog from "../../components/AlertDialog";
import AppText from "../../components/AppText";
import BackDrop from "../../components/BackDrop";
import ColorPallete from "../../constants/ColorPallete";
import FollowButtons from "../../components/FollowButtons";
import FontNames from "../../constants/FontNames";
import { GetProfileResponseInterface } from "../../types/ComponentTypes";
import Helper from "../../utils/Helper";
import ProfileActionCreators from "../../store/profile/actions";
import ProfilePostCard from "../../components/ProfilePostCard";
import RequestsActionCreators from "../../store/requests/actions";
import ScreenNames from "../../navigation/ScreenNames";
import StatsCard from "../../components/StatsCard";
import ToastMessages from "../../constants/Messages";
import useAppEndpoints from "../../api/useAppEndpoints";

// function component for PersonProfileScreen
function PersonProfileScreen(props: AppScreenProps<"PersonProfileScreen">) {
  // Destructuring props
  const { navigation, route } = props;

  // Get the user
  const { GetProfile, Follow, DeleteRequest, AcceptRequest, Unfollow } = useAppEndpoints();
  const dispatch = useDispatch();

  // Local States
  const [Profile, SetProfile] = useState<GetProfileResponseInterface>(null);
  const [UnfollowVisible, SetUnfollowVisible] = useState(false);
  const [Refreshing, SetRefreshing] = useState(false);
  const [Loading, SetLoading] = useState(false);

  // Initial call to get profile data
  useEffect(() => {
    InitialCall();
  }, []);

  // Intial call to get the profile data
  const InitialCall = async () => {
    try {
      SetLoading(true);
      await GetProfileAPI();
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
    }
  };

  // reject follow request
  const RejectRequest = async () => {
    try {
      let request_id = Profile.you_sent_request
        ? Profile.you_sent_request_id
        : Profile.user_sent_request
        ? Profile.user_sent_request_id
        : null;

      if (request_id) {
        dispatch(RequestsActionCreators.DeleteRequest(request_id));

        const apiResponse = await DeleteRequest({ request_id: request_id });
        if (apiResponse.ok && apiResponse !== null) {
          SetProfile({ ...Profile, you_sent_request: false, user_sent_request: false });
        } else {
          Helper.ShowToast(apiResponse.data.message);
        }
      }
    } catch (error) {}
  };

  // accept follow request
  const AcceptRequestAPI = async () => {
    try {
      let request_id = Profile.user_sent_request ? Profile.user_sent_request_id : null;

      if (request_id) {
        dispatch(RequestsActionCreators.DeleteRequest(request_id));

        const apiResponse = await AcceptRequest({ request_id: request_id });
        if (apiResponse.ok && apiResponse !== null) {
          dispatch(
            ProfileActionCreators.SetFollowersCount(
              apiResponse.data.current_user_followers_count ?? 0
            )
          );
          SetProfile({ ...Profile, ...apiResponse.data });
        } else {
          Helper.ShowToast(apiResponse.data.message);
        }
      }
    } catch (error) {}
  };

  // Get profile data
  const GetProfileAPI = async () => {
    try {
      const apiResponse = await GetProfile(route.params.user_id);
      if (apiResponse.ok && apiResponse !== null) {
        SetProfile({
          ...apiResponse.data,
          ...apiResponse.data.user_details,
        });
      } else {
        Helper.ShowToast(apiResponse.data.message);
      }
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
    }
  };

  // Follow or send request
  const FollowOrSendAPI = async () => {
    try {
      const apiResponse = await Follow(route.params.user_id);
      if (apiResponse.ok && apiResponse !== null) {
        SetProfile({ ...Profile, ...apiResponse.data });
      } else {
        Helper.ShowToast(apiResponse.data.message);
      }
    } catch (error) {}
  };

  // function to unfollow user
  const UnfollowAPI = async () => {
    try {
      SetUnfollowVisible(false);
      const apiResponse = await Unfollow(route.params.user_id);

      if (apiResponse.ok && apiResponse !== null) {
        dispatch(
          ProfileActionCreators.SetFollowersCount(
            apiResponse.data.current_user_followers_count ?? 0
          )
        );

        SetProfile({ ...Profile, ...apiResponse.data });
      } else {
        Helper.ShowToast(apiResponse.data.message);
      }
    } catch (error) {
      SetUnfollowVisible(false);
    }
  };

  // function to be called when user refreshes the screen
  const onRefresh = async () => {
    try {
      SetRefreshing(true);
      await GetProfileAPI();
      SetRefreshing(false);
    } catch (error) {
      SetRefreshing(false);
    }
  };

  // render
  return Loading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <AppText text="Getting Profile.." size={20} family={FontNames.InterBold} />
    </View>
  ) : Profile !== null ? (
    <AppContainer>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: 80, height: 80, margin: 15, marginLeft: 30 }}>
          <AppImage uri={Profile.profile_picture} borderRadius={40} />
        </View>

        <View style={{ flex: 1, flexDirection: "row", marginLeft: 0, marginRight: 15 }}>
          <StatsCard title="Posts" subtitle={Profile?.posts?.length.toString() ?? "0"} />
          <StatsCard
            title="Followers"
            subtitle={Profile?.followers_count?.toString() ?? "0"}
            onPress={
              Profile.private_profile
                ? Profile.you_follow_user
                  ? () =>
                      navigation.navigate(ScreenNames.FollowersScreen, {
                        user_id: route.params.user_id,
                      })
                  : null
                : () =>
                    navigation.navigate(ScreenNames.FollowersScreen, {
                      user_id: route.params.user_id,
                    })
            }
          />
          <StatsCard
            title="Following"
            subtitle={Profile?.following_count?.toString() ?? "0"}
            onPress={
              Profile.private_profile
                ? Profile.you_follow_user
                  ? () =>
                      navigation.navigate(ScreenNames.FollowingScreen, {
                        user_id: route.params.user_id,
                      })
                  : null
                : () =>
                    navigation.navigate(ScreenNames.FollowingScreen, {
                      user_id: route.params.user_id,
                    })
            }
          />
        </View>
      </View>

      <AppText text={Profile.name} family={FontNames.PoppinsBold} marginLeft={15} />
      <AppText
        text={Profile.bio}
        family={FontNames.PoppinsLight}
        marginLeft={15}
        marginRight={15}
        numberOfLines={3}
      />

      <FollowButtons
        {...Profile}
        onFollowPress={FollowOrSendAPI}
        onRejectPress={RejectRequest}
        onAcceptPress={AcceptRequestAPI}
        onUnFollowPress={() => SetUnfollowVisible(true)}
      />

      <View style={styles.postsContainer}>
        <FlatList
          data={Profile?.posts ?? []}
          keyExtractor={item => item._id.toString()}
          numColumns={3}
          onRefresh={onRefresh}
          refreshing={Refreshing}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <ProfilePostCard
              {...item.file}
              {...(item.thumbnail_image ? item.thumbnail_image : {})}
              style={{ borderRightWidth: index % 3 == 0 || index % 3 == 1 ? 1 : 0 }}
              onCardPress={() =>
                navigation.navigate(ScreenNames.PostDetailsScreen, {
                  ...item,
                  post_owner_details: route.params,
                })
              }
            />
          )}
          contentContainerStyle={{ flex: 1 }}
          ListEmptyComponent={
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <AppText text="No Posts" family={FontNames.InterBold} size={20} />
            </View>
          }
        />
      </View>

      <BackDrop onBackDropPress={() => SetUnfollowVisible(false)} visible={UnfollowVisible}>
        <AlertDialog
          dialogTitle="Unfollow"
          subTitle={`Are you sure you want to unfollow ${Profile.name}?`}
          firstButtonText="Yes"
          secondButtonText="No"
          firstButtonOnPress={UnfollowAPI}
          secondButtonOnPress={() => SetUnfollowVisible(false)}
        />
      </BackDrop>
    </AppContainer>
  ) : null;
}

// Connect and Export
export default PersonProfileScreen;

// styles
const styles = StyleSheet.create({
  postsContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: ColorPallete.white,
  },
});

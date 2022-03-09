// Packages Imports
import { useContext, useEffect, useState } from "react";
import { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import { useDispatch } from "react-redux";

// Local Imports
import AnimatedText from "../../components/AnimatedText";
import AppScrollContainer from "../../components/AppScrollContainer";
import PeopleCard from "../../components/PeopleCard";
import ColorPallete from "../../constants/ColorPallete";
import FontNames from "../../constants/FontNames";
import GlobalContext from "../../context/GlobalContext";
import ProfileActionCreators from "../../store/profile/actions";
import RequestsActionCreators from "../../store/requests/actions";
import useAppEndpoints from "./../../api/useAppEndpoints";

// function component for FollowRequestsScreen
function FollowRequestsScreen(props) {
  // Destructuring props
  const {} = props;

  // Local States
  const [Refreshing, SetRefreshing] = useState(false);

  // Get requests
  useEffect(() => {
    GetFollowRequestAPI();
  }, []);

  // Hooks
  const { Requests } = useContext(GlobalContext);

  // API endpoints
  const { GetFollowRequests, AcceptRequest, DeleteRequest } = useAppEndpoints();

  // Dispathcer
  const dispatch = useDispatch();

  // reject follow request
  const RejectRequest = async (item: any) => {
    try {
      dispatch(RequestsActionCreators.DeleteRequest(item._id));

      await DeleteRequest({ request_id: item._id });
    } catch (error) {}
  };

  // accept follow request
  const AcceptRequestAPI = async (item: any) => {
    try {
      dispatch(RequestsActionCreators.DeleteRequest(item._id));

      const apiResponse = await AcceptRequest({ request_id: item._id });
      if (apiResponse.ok && apiResponse !== null) {
        dispatch(
          ProfileActionCreators.SetFollowersCount(
            apiResponse.data.current_user_followers_count ?? 0
          )
        );
      }
    } catch (error) {}
  };

  // api call to get follow requests
  const GetFollowRequestAPI = async () => {
    try {
      const apiResponse = await GetFollowRequests();

      if (apiResponse.ok && apiResponse !== null) {
        dispatch(RequestsActionCreators.SetRequests(apiResponse.data.follow_requests));
      }
    } catch (error) {}
  };

  // function to call for refreshing
  const onRefresh = async () => {
    try {
      SetRefreshing(true);
      await GetFollowRequestAPI();
      SetRefreshing(false);
    } catch (error) {
      SetRefreshing(false);
    }
  };

  // render
  return (
    <AppScrollContainer onRefresh={onRefresh} refreshing={Refreshing}>
      <AnimatedText
        text={"No Follow Requests" + (Requests.length > 0 ? ` (${Requests.length})` : "")}
        size={24}
        family={FontNames.PoppinsMedium}
        margin={15}
        entering={FadeIn}
        exiting={FadeOut}
        layout={Layout}
      />

      {Requests.map(item => (
        <PeopleCard
          key={item._id}
          title={item.request_from.name}
          subtitle={item.request_from.username}
          profile_picture={item.request_from.profile_picture}
          firstButtonProps={{
            backgroundColor: ColorPallete.danger,
            color: ColorPallete.white,
          }}
          firstButtonTitle="Reject"
          secondButtonTitle="Accept"
          secondButtonProps={{
            backgroundColor: ColorPallete.primary,
            color: ColorPallete.white,
          }}
          firstButtonOnPress={() => RejectRequest(item)}
          secondButtonOnPress={() => AcceptRequestAPI(item)}
        />
      ))}
    </AppScrollContainer>
  );
}

// exports
export default FollowRequestsScreen;

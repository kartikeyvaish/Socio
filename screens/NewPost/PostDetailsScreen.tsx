// Packages Imports
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// Local Imports
import AlertDialog from "../../components/AlertDialog";
import AppLoading from "../../components/AppLoading";
import AppScrollContainer from "../../components/AppScrollContainer";
import { AppScreenProps } from "../../navigation/NavigationProps";
import BackDrop from "../../components/BackDrop";
import GlobalContext from "../../context/GlobalContext";
import Helper from "../../utils/Helper";
import PostCard from "../../components/PostCard";
import ScreenNames from "../../navigation/ScreenNames";
import ToastMessages from "../../constants/Messages";
import FeedActions from "../../store/feed/actions";
import ProfileActionCreators from "../../store/profile/actions";
import useAppEndpoints from "../../api/useAppEndpoints";

// function component for PostDetailsScreen
function PostDetailsScreen(props: AppScreenProps<"PostDetailsScreen">) {
  // Destructuring props
  const { route, navigation } = props;
  const post_details = route.params;

  // Local States
  const [Mute, SetMute] = useState(false);
  const [PostDetails, SetPostDetails] = useState(post_details);
  const [Loading, SetLoading] = useState(true);
  const [Refreshing, SetRefreshing] = useState(false);
  const [DeleteConfirm, SetDeleteConfirm] = useState(false);

  // Get the user
  const { User } = useContext(GlobalContext);
  const dispatch = useDispatch();
  const { GetPostDetails, DeletePost } = useAppEndpoints();

  // useEffect to generate the initial call
  useEffect(() => {
    InitialCall();
  }, []);

  // Intial call to get the post data
  const InitialCall = async () => {
    try {
      SetLoading(true);
      await GetPostDetailsAPI();
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
    }
  };

  // Get Post Details
  const GetPostDetailsAPI = async () => {
    try {
      const apiResponse = await GetPostDetails(post_details._id);
      if (apiResponse.ok && apiResponse !== null)
        SetPostDetails({ ...post_details, ...apiResponse.data.post });
      else Helper.ShowToast(apiResponse.data.message);
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
    }
  };

  // function to be called on Refresh
  const onRefresh = async () => {
    try {
      SetRefreshing(true);
      await GetPostDetailsAPI();
      SetRefreshing(false);
    } catch (error) {
      SetRefreshing(false);
    }
  };

  // delete post api call
  const DeletePostAPI = async () => {
    try {
      SetDeleteConfirm(false);
      SetLoading(true);
      dispatch(ProfileActionCreators.DeleteProfilePost(PostDetails._id));
      dispatch(FeedActions.DeletePost(PostDetails._id));
      const apiResponse = await DeletePost(PostDetails._id);
      SetLoading(false);
      if (apiResponse.ok && apiResponse !== null) {
        navigation.goBack();
      } else Helper.ShowToast(apiResponse.data.message);
    } catch (error) {
      SetLoading(false);
      SetDeleteConfirm(false);
    }
  };

  // if post id is not available
  if (!post_details?._id) return null;

  // render
  return Loading ? (
    <AppLoading loadingText="Getting Post.." visible={true} />
  ) : (
    <AppScrollContainer onRefresh={onRefresh} refreshing={Refreshing}>
      <PostCard
        {...PostDetails}
        isMuted={Mute}
        onVideoPress={() => SetMute(!Mute)}
        current_viewable_item={post_details._id}
        onShowAllLikesPress={() =>
          navigation.navigate(ScreenNames.LikesScreen, { post_id: post_details._id })
        }
        onCommentPress={() =>
          navigation.navigate(ScreenNames.CommentsScreen, {
            post_id: post_details._id,
            ...post_details,
          })
        }
        onNamePress={() =>
          post_details.post_owner_details._id === User._id
            ? navigation.goBack()
            : navigation.navigate(ScreenNames.PersonProfileScreen, {
                ...post_details.post_owner_details,
                user_id: post_details.post_owner_details._id,
              })
        }
        showMenuIcon={User._id === post_details.post_owner_id ? true : false}
        onMenuIconPress={() => SetDeleteConfirm(true)}
      />

      <BackDrop onBackDropPress={() => SetDeleteConfirm(false)} visible={DeleteConfirm}>
        <AlertDialog
          dialogTitle="Delete Post"
          subTitle="Are you sure you want to delete the post?"
          firstButtonText="Yes"
          secondButtonText="No"
          firstButtonOnPress={DeletePostAPI}
          secondButtonOnPress={() => SetDeleteConfirm(false)}
        />
      </BackDrop>
    </AppScrollContainer>
  );
}

// exports
export default PostDetailsScreen;

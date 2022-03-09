// Packages Imports
import { useContext, useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";

// Local Imports
import AppLoading from "../../components/AppLoading";
import AppContainer from "../../components/AppContainer";
import AppScrollContainer from "../../components/AppScrollContainer";
import { AppScreenProps } from "../../navigation/NavigationProps";
import CommentActions from "../../store/comments/actions";
import commentsReducer, { commentsInitialState } from "../../store/comments/reducer";
import CommentsCard from "../../components/CommentsCard";
import { CommentProps } from "../../store/comments/types";
import CommentsKeyboard from "../../components/CommentsKeyboard";
import FeedActions from "../../store/feed/actions";
import GlobalContext from "../../context/GlobalContext";
import Helper from "../../utils/Helper";
import ProfileActionCreators from "../../store/profile/actions";
import ScreenNames from "../../navigation/ScreenNames";
import ToastMessages from "../../constants/Messages";
import useAppEndpoints from "../../api/useAppEndpoints";

// function component for CommentsScreen
function CommentsScreen(props: AppScreenProps<"CommentsScreen">) {
  // Destructuring props
  const { route, navigation } = props;
  const { post_id, caption, post_owner_details, post_datetime } = route.params;

  const [{ Comment, Comments, Loading, Refreshing }, dispatch] = useReducer(
    commentsReducer,
    commentsInitialState
  );

  // Hooks
  const { GetComments, PostComment, DeleteComment } = useAppEndpoints();
  const { User, showSnack } = useContext(GlobalContext);

  // dispatcher
  const dispatcher = useDispatch();

  // intial call to get comments
  useEffect(() => {
    InitialCall();
  }, []);

  // intial call to get comments
  const InitialCall = async () => {
    try {
      dispatch(CommentActions.SetLoading(true));
      await GetCommentsAPI();
      dispatch(CommentActions.SetLoading(false));
    } catch (error) {
      dispatch(CommentActions.SetLoading(false));
    }
  };

  // API call to get comments
  const GetCommentsAPI = async () => {
    try {
      const apiResponse = await GetComments(post_id);

      if (apiResponse.ok && apiResponse !== null) {
        dispatch(CommentActions.SetComments(apiResponse.data.comments));
      } else {
        Helper.ShowToast(apiResponse.data.message);
      }
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
    }
  };

  // onRefresh
  const onRefresh = async () => {
    try {
      dispatch(CommentActions.SetRefreshing(true));
      await GetCommentsAPI();
      dispatch(CommentActions.SetRefreshing(false));
    } catch (error) {
      dispatch(CommentActions.SetRefreshing(false));
    }
  };

  // api call to Delete comments
  const DeleteCommentsAPI = async (item: CommentProps) => {
    try {
      const tempComment = { ...item };
      const index = Comments.findIndex(comment => comment._id === item._id);

      dispatch(CommentActions.DeleteComment(item._id));

      const apiResponse = await DeleteComment(item._id);

      if (apiResponse.ok && apiResponse !== null) {
        dispatcher(FeedActions.UpdateCommentsCount(post_id, apiResponse.data.comments_count));
        dispatcher(
          ProfileActionCreators.UpdateCommentsCount(post_id, apiResponse.data.comments_count)
        );
      } else if (!apiResponse.ok && apiResponse !== null) {
        if (index !== -1) dispatch(CommentActions.AddCommentAtIndex(tempComment, index));
        else dispatch(CommentActions.AddComment(tempComment));
        showSnack({ message: "Something went wrong" });
      }
    } catch (error) {}
  };

  // apicall to post comment
  const PostCommentAPI = async () => {
    try {
      const tempData = {
        _id: Helper.GenerateUniqueID(),
        comment: Comment,
        comment_datetime: new Date().toISOString(),
        commented_by: { ...User },
        post_id: post_id,
        disabled: true,
      };

      // Add comments to store
      dispatch(CommentActions.AddComment(tempData));

      const apiResponse = await PostComment(post_id, Comment);

      // Delete the comment if api call fails
      if (apiResponse.ok && apiResponse !== null) {
        dispatch(CommentActions.UpdateComment(apiResponse.data.comment, tempData._id));
        dispatcher(FeedActions.UpdateCommentsCount(post_id, apiResponse.data.comments_count));
        dispatcher(
          ProfileActionCreators.UpdateCommentsCount(post_id, apiResponse.data.comments_count)
        );
      } else {
        showSnack({ message: "Something went wrong" });
        dispatch(CommentActions.DeleteComment(tempData._id));
      }
    } catch (error) {}
  };

  // render
  return (
    <AppContainer>
      {!Loading ? (
        <>
          <AppScrollContainer onRefresh={onRefresh} refreshing={Refreshing}>
            {caption ? (
              <CommentsCard
                username={post_owner_details.username}
                profile_picture={post_owner_details.profile_picture}
                comment={caption}
                showBorderBottom={true}
                showDelete={false}
                comment_datetime={post_datetime}
              />
            ) : null}

            {Comments.map(item => (
              <CommentsCard
                {...item}
                key={item._id}
                username={item.commented_by.username}
                profile_picture={item.commented_by.profile_picture}
                comment={item.comment}
                showDelete={
                  User._id === item.commented_by._id || User._id === post_owner_details._id
                }
                onDeletePress={() => DeleteCommentsAPI(item)}
                onNamePress={() =>
                  item.commented_by._id === User._id
                    ? navigation.navigate(ScreenNames.ProfileTabScreen)
                    : navigation.navigate(ScreenNames.PersonProfileScreen, {
                        ...item.commented_by,
                        user_id: item.commented_by._id,
                      })
                }
              />
            ))}
          </AppScrollContainer>

          <CommentsKeyboard
            profile_picture={User.profile_picture}
            onChangeText={(text: string) => dispatch(CommentActions.SetComment(text))}
            controlled={true}
            value={Comment}
            onSubmit={PostCommentAPI}
          />
        </>
      ) : (
        <AppLoading visible={true} loadingText="Getting Comments..." />
      )}
    </AppContainer>
  );
}

// exports
export default CommentsScreen;

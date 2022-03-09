// Packages imports
import { connect } from "react-redux";

// Local imports and context imports
import AppSnackBar from "../components/AppSnackBar";
import AuthActionCreators from "../store/auth/actions";
import GlobalContext from "../context/GlobalContext";
import { GlobalProviderProps } from "../types/ContextTypes";
import { StoreStateInterface } from "../types/StoreTypes";
import ToastMessages from "./../constants/Messages";
import useAPI from "../api/useAPI";
import useNotifications from "../hooks/useNotifications";
import useSnackBar from "../hooks/useSnackBar";

// GlobalProvider function component
function GlobalProvider(props: GlobalProviderProps) {
  // Destructuring props
  const {
    children,
    User,
    SetUser,
    FeedPosts,
    Logout,
    Requests,
    SearchResults,
    FeedStories,
    ProfileStories,
    PushToken,
    SetPushToken,
  } = props;

  // custom hook to manage snackbar
  const { SnackVisible, hideSnack, showSnack, Color, Message } = useSnackBar();

  // custom hook to use APIs
  const { appApiClient, authAPIClient } = useAPI({
    logout: () => onSessionExpire(),
  });

  // Notification/Push Token handlers using custom hook
  useNotifications(PushToken, SetPushToken);

  // function to be called when session expires
  const onSessionExpire = async () => {
    try {
      showSnack({ message: ToastMessages.SessionExpired });
      Logout();
    } catch (error) {}
  };

  // Value to be passed to children
  const value = {
    User,
    SetUser,
    FeedPosts,
    showSnack,
    appApiClient,
    authAPIClient,
    Requests,
    SearchResults,
    FeedStories,
    ProfileStories,
    PushToken,
  };

  // Render component based on user authentication status
  return (
    <GlobalContext.Provider value={value}>
      {children}
      <AppSnackBar
        visible={SnackVisible}
        text={Message}
        backgroundColor={Color}
        onDismiss={hideSnack}
      />
    </GlobalContext.Provider>
  );
}

// Mapping Redux state to props
const mapStateToProps = (state: StoreStateInterface) => ({
  User: state.AuthState.User,
  FeedPosts: state.FeedState.FeedPosts,
  Requests: state.RequestsState.requests,
  SearchResults: state.SearchState.SearchResults,
  FeedStories: state.StoriesState.FeedStories,
  ProfileStories: state.StoriesState.ProfileStories,
  PushToken: state.AuthState.PushToken,
});

// Mapping Redux actions to props
const mapDispatchToProps = (dispatch: any) => ({
  SetUser: (user: any) => dispatch(AuthActionCreators.Login(user)),
  SetPushToken: (token: string) => dispatch(AuthActionCreators.UpdatePushToken(token)),
  Logout: () => dispatch(AuthActionCreators.Logout()),
});

// connect and export
export default connect(mapStateToProps, mapDispatchToProps)(GlobalProvider);

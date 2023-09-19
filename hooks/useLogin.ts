// Local Imports
import authActions from "../store/auth/actions";
import JWT from "../helpers/jwt";

// Named Imports
import { setAccessToken, setRefreshToken } from "../store/tokenStorage";
import { showToast } from "../helpers/toastHelpers";
import { useAppDispatch } from "../store/reduxHooks";
import { UserProps } from "../types/AppTypes";

interface SaveLoginDetailsProps {
  access_token: string;
  refresh_token: string;
  message?: string;
}

export default function useLogin() {
  // App Dispatcher
  const dispatch = useAppDispatch();

  function saveLoginDetails(props: SaveLoginDetailsProps) {
    // Props
    const { access_token, refresh_token, message = "" } = props;

    // Decode Token
    const payload = JWT.decodeToken<UserProps>(access_token);

    if (payload === null) return;

    if (message.length) showToast({ preset: "done", title: message });

    setAccessToken(access_token);
    setRefreshToken(refresh_token);
    dispatch(authActions.setUser(payload));
  }

  return { saveLoginDetails };
}

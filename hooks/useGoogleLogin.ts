// Packages Imports
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

// Local Imports
import env from "../helpers/env";
import { showToast } from "../helpers/toastHelpers";
import { Platform } from "react-native";

GoogleSignin.configure({
  iosClientId: env.GOOGLE_CLIENT_IOS_CLIENT_ID,
  webClientId:
    Platform.OS === "ios"
      ? env.GOOGLE_CLIENT_IOS_CLIENT_ID
      : env.GOOGLE_LOGIN_CLIENT_ID,
});

export interface GoogleLoginHookProps {
  onSuccess?: (idToken: string) => void;
  setLoading?: (loading: boolean) => void;
}

export default function useGoogleLogin(props: GoogleLoginHookProps) {
  // Props
  const { onSuccess, setLoading } = props;

  const initiateGoogleLogin = async () => {
    try {
      if (setLoading !== undefined && typeof setLoading === "function")
        setLoading(true);

      await GoogleSignin.signOut();

      const response = await GoogleSignin.signIn();

      if (setLoading !== undefined && typeof setLoading === "function")
        setLoading(false);

      if (onSuccess !== undefined && typeof onSuccess === "function") {
        onSuccess(response.idToken);
      }
    } catch (error) {
      if (setLoading !== undefined && typeof setLoading === "function")
        setLoading(false);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        return;
      } else if (error.code === statusCodes.IN_PROGRESS) {
        return;
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        showToast({ preset: "error", title: "No Google accounts found." });
      } else {
        showToast({ preset: "error", title: "Failed to log in with Google." });
      }
    }
  };

  return { initiateGoogleLogin };
}

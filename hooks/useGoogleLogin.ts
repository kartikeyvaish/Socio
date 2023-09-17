// Packages Imports
import Config from 'react-native-config';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { showToast } from '../helpers/toastHelpers';

GoogleSignin.configure({ webClientId: Config.GOOGLE_LOGIN_CLIENT_ID });

export default function useGoogleLogin() {
  const initiateGoogleLogin = async () => {
    try {
      await GoogleSignin.signOut();

      const respose = await GoogleSignin.signIn();

      console.log(respose);
    } catch (error) {
      showToast({ preset: "error", title: 'No Google accounts found.' });
    }
  };

  return { initiateGoogleLogin };
}
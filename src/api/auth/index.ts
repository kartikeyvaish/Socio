// Local Imports
import endpoints from '../endpoints';

// Named Imports
import { executeApiCall } from '../index';

// Request/Response Types
import {
  LoginBodyProps,
  LoginResponseProps,
  SignUpBodyProps,
  SuccessLoginResponseProps
} from './types';

class Auth {
  login = async (body: LoginBodyProps) => {
    return executeApiCall<LoginResponseProps>({
      method: 'POST',
      data: body,
      url: endpoints.auth.login
    });
  };

  verifyLoginOtp = async (body: { otp: string; otp_id: string; email: string }) => {
    return executeApiCall<SuccessLoginResponseProps>({
      method: 'POST',
      data: body,
      url: endpoints.auth.verify_login_otp
    });
  };

  emailSignUp = async (body: { email: string }) => {
    return executeApiCall<LoginResponseProps>({
      method: 'POST',
      data: body,
      url: endpoints.auth.email_sign_up
    });
  };

  verifyEmailSignUpOtp = async (body: { otp: string; otp_id: string; email: string }) => {
    return executeApiCall<{ verified_id: string }>({
      method: 'POST',
      data: body,
      url: endpoints.auth.verify_email_sign_up_otp
    });
  };

  verifyUsername = async (body: { username: string }) => {
    return executeApiCall({
      method: 'POST',
      data: body,
      url: endpoints.auth.verify_username
    });
  };

  signUp = async (body: SignUpBodyProps) => {
    return executeApiCall<SuccessLoginResponseProps>({
      method: 'POST',
      data: body,
      url: endpoints.auth.signup
    });
  };
}

const authApi = new Auth();

export default authApi;

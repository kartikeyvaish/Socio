// Local Imports
import endpoints from '../endpoints';

// Named Imports
import { executeApiCall } from '../index';

// Request/Response Types
import { LoginBodyProps, LoginResponseProps, SuccessLoginResponseProps } from './types';

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
}

const authApi = new Auth();

export default authApi;

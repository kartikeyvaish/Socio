// Local Imports
import endpoints from '../endpoints';

// Named Imports
import { executeApiCall } from '../index';

// Request/Response Types
import { LoginBodyProps, LoginResponseProps } from './types';

class Auth {
  login = async (body: LoginBodyProps) => {
    return executeApiCall<LoginResponseProps>({
      method: 'POST',
      data: body,
      url: endpoints.auth.login
    });
  };
}

const authApi = new Auth();

export default authApi;

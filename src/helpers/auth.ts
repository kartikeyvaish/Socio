// Local Imports
import reduxStorageEngine from '../store/reduxStoreEngine';

// Named Imports
import { AuthState } from '../store/feature/authSlice';
import { decodeToken } from './jwt';
import { SuccessLoginResponseProps } from '../api/auth/types';

export function getAuthPayload(apiResponse: SuccessLoginResponseProps) {
  try {
    let userData = decodeToken(apiResponse.access_token) as AuthState['user'];

    reduxStorageEngine.setItem('authaccesstoken', apiResponse.access_token);
    reduxStorageEngine.setItem('authrefreshtoken', apiResponse.refresh_token);

    return userData;
  } catch (error) {
    return null;
  }
}

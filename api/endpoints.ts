export const API_VERSION = "/api";
export const AUTH_PREFIX = "/auth";

export const authEndpoints = {
  // Auth Endpoints
  LOGIN: `${API_VERSION}${AUTH_PREFIX}/login`,
  GOOGLE_LOGIN: `${API_VERSION}${AUTH_PREFIX}/google-login`,
  NEW_USER_SIGN_UP: `${API_VERSION}${AUTH_PREFIX}/new`,
  REGISTER: `${API_VERSION}${AUTH_PREFIX}/register`,
  FORGOT_PASSWORD: `${API_VERSION}${AUTH_PREFIX}/forgot-password`,
  RESET_PASSWORD: `${API_VERSION}${AUTH_PREFIX}/reset-password`,
};

export const fileEndpoints = {
  // File Uploads
  GET_UPLOAD_SIGNATURE: `${API_VERSION}/upload/signature`,
};

export const otpEndpoints = {
  // OTP Endpoints
  VERIFY_LOGIN_OTP: `${API_VERSION}${AUTH_PREFIX}/login/verify`,
  VERIFY_NEW_USER_SIGN_UP_OTP: `${API_VERSION}${AUTH_PREFIX}/new/otp/verify`,
  VERIFY_FORGOT_PASSWORD_OTP: `${API_VERSION}${AUTH_PREFIX}/forgot-password/verify`,
};

export const postEndpoints = {
  // Post Endpoints
  CREATE_POST: `${API_VERSION}/posts`,
};

export const feedEndpoints = {
  // Feed Endpoints
  GET_FEED: `${API_VERSION}/feed`,
};

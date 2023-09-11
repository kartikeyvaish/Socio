export const API_VERSION = '/api';
export const AUTH_PREFIX = '/auth';

export const authEndpoints = {
    LOGIN: `${API_VERSION}${AUTH_PREFIX}/login`,
    NEW_USER_SIGN_UP: `${API_VERSION}${AUTH_PREFIX}/new`,
    REGISTER: `${API_VERSION}${AUTH_PREFIX}/register`,
    FORGOT_PASSWORD: `${API_VERSION}${AUTH_PREFIX}/forgot-password`,
    RESET_PASSWORD: `${API_VERSION}${AUTH_PREFIX}/reset-password`,
}

export const otpEndpoints = {
    VERIFY_LOGIN_OTP: `${API_VERSION}${AUTH_PREFIX}/login/verify`,
    VERIFY_NEW_USER_SIGN_UP_OTP: `${API_VERSION}${AUTH_PREFIX}/new/otp/verify`,
    VERIFY_FORGOT_PASSWORD_OTP: `${API_VERSION}${AUTH_PREFIX}/forgot-password/verify`,
}
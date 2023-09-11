export const API_VERSION = '/api';
export const AUTH_PREFIX = '/auth';

export const authEndpoints = {
    LOGIN: `${API_VERSION}${AUTH_PREFIX}/login`,
}

export const otpEndpoints = {
    VERIFY_LOGIN_OTP: `${API_VERSION}${AUTH_PREFIX}/login/verify`,
}
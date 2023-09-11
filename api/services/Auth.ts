// Packages Imports
import { ApiResponse } from "apisauce";

// API Types Imports
import { baseUnAuthorizedAPIInstance } from "../APIHandler";
import { ErrorResponse, GeneralAPIResponse } from "../types";

// Endpoints Imports
import { authEndpoints, otpEndpoints } from "../endpoints";

// Request Types Imports
import { LoginRequestProps, RegisterRequestProps, ResetRequestProps, VerifyOTPProps } from "../RequestTypes";

// Response Types Imports
import { LoginResponseProps, LoginVerifyResponseProps, NewUserSignUpVerifyResponseProps, VerifyForgotPasswordResponseProps } from "../ResponseTypes";

export function loginAPI(body: LoginRequestProps): Promise<ApiResponse<LoginResponseProps, ErrorResponse<LoginRequestProps>>> {
    return baseUnAuthorizedAPIInstance.post(authEndpoints.LOGIN, body);
}

export function verifyLoginOtpAPI(body: VerifyOTPProps): Promise<ApiResponse<LoginVerifyResponseProps, ErrorResponse<VerifyOTPProps>>> {
    return baseUnAuthorizedAPIInstance.post(otpEndpoints.VERIFY_LOGIN_OTP, body);
}

export function newUserSignUpAPI(body: Pick<LoginRequestProps, 'email'>): Promise<ApiResponse<LoginResponseProps, ErrorResponse<LoginRequestProps>>> {
    return baseUnAuthorizedAPIInstance.post(authEndpoints.NEW_USER_SIGN_UP, body);
}

export function verifyNewUserSignUpOtpAPI(body: VerifyOTPProps): Promise<ApiResponse<NewUserSignUpVerifyResponseProps, ErrorResponse<VerifyOTPProps>>> {
    return baseUnAuthorizedAPIInstance.post(otpEndpoints.VERIFY_NEW_USER_SIGN_UP_OTP, body);
}

export function registerAPI(body: RegisterRequestProps): Promise<ApiResponse<LoginVerifyResponseProps, ErrorResponse<LoginRequestProps>>> {
    return baseUnAuthorizedAPIInstance.post(authEndpoints.REGISTER, body);
}

export function forgotPasswordAPI(body: Pick<LoginRequestProps, 'email'>): Promise<ApiResponse<LoginResponseProps, ErrorResponse<LoginRequestProps>>> {
    return baseUnAuthorizedAPIInstance.post(authEndpoints.FORGOT_PASSWORD, body);
}

export function verifyForgotPasswordOtpAPI(body: VerifyOTPProps): Promise<ApiResponse<VerifyForgotPasswordResponseProps, ErrorResponse<VerifyOTPProps>>> {
    return baseUnAuthorizedAPIInstance.post(otpEndpoints.VERIFY_FORGOT_PASSWORD_OTP, body);
}

export function resetRequestAPI(body: ResetRequestProps): Promise<ApiResponse<GeneralAPIResponse, ErrorResponse<LoginRequestProps>>> {
    return baseUnAuthorizedAPIInstance.post(authEndpoints.RESET_PASSWORD, body);
}
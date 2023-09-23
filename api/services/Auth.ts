// Local Imports
import { apiUnauthorizedCaller } from "../APIConfig";

// API Types Imports
import { ErrorResponse, GeneralAPIResponse } from "../types";

// Endpoints Imports
import { authEndpoints, otpEndpoints } from "../endpoints";

// Request Types Imports
import {
  GoogleLoginRequestProps,
  LoginRequestProps,
  RegisterRequestProps,
  ResetRequestProps,
  VerifyOTPProps,
} from "../RequestTypes";

// Response Types Imports
import {
  GoogleLoginResponseProps,
  LoginResponseProps,
  LoginVerifyResponseProps,
  NewUserSignUpVerifyResponseProps,
  VerifyForgotPasswordResponseProps,
} from "../ResponseTypes";

export async function loginAPI(body: LoginRequestProps) {
  return apiUnauthorizedCaller<
    LoginResponseProps,
    ErrorResponse<LoginRequestProps>
  >({
    method: "POST",
    url: authEndpoints.LOGIN,
    body: body,
  });
}

export async function googleLogin(body: GoogleLoginRequestProps) {
  return apiUnauthorizedCaller<GoogleLoginResponseProps>({
    method: "POST",
    url: authEndpoints.GOOGLE_LOGIN,
    body: body,
  });
}

export async function verifyLoginOtpAPI(body: VerifyOTPProps) {
  return apiUnauthorizedCaller<LoginVerifyResponseProps>({
    method: "POST",
    url: otpEndpoints.VERIFY_LOGIN_OTP,
    body: body,
  });
}

export async function newUserSignUpAPI(body: Pick<LoginRequestProps, "email">) {
  return apiUnauthorizedCaller<LoginResponseProps>({
    method: "POST",
    url: authEndpoints.NEW_USER_SIGN_UP,
    body: body,
  });
}

export async function verifyNewUserSignUpOtpAPI(body: VerifyOTPProps) {
  return apiUnauthorizedCaller<NewUserSignUpVerifyResponseProps>({
    method: "POST",
    url: otpEndpoints.VERIFY_NEW_USER_SIGN_UP_OTP,
    body: body,
  });
}

export async function registerAPI(body: RegisterRequestProps) {
  return apiUnauthorizedCaller<LoginVerifyResponseProps>({
    method: "POST",
    url: authEndpoints.REGISTER,
    body: body,
  });
}

export async function forgotPasswordAPI(
  body: Pick<LoginRequestProps, "email">
) {
  return apiUnauthorizedCaller<LoginResponseProps>({
    method: "POST",
    url: authEndpoints.FORGOT_PASSWORD,
    body: body,
  });
}

export async function verifyForgotPasswordOtpAPI(body: VerifyOTPProps) {
  return apiUnauthorizedCaller<VerifyForgotPasswordResponseProps>({
    method: "POST",
    url: otpEndpoints.VERIFY_FORGOT_PASSWORD_OTP,
    body: body,
  });
}

export async function resetRequestAPI(body: ResetRequestProps) {
  return apiUnauthorizedCaller<GeneralAPIResponse>({
    method: "POST",
    url: authEndpoints.RESET_PASSWORD,
    body: body,
  });
}

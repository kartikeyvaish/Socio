// Packages Imports
import { ApiResponse } from "apisauce";

// API Types Imports
import { baseUnAuthorizedAPIInstance } from "../APIHandler";
import { ErrorResponse } from "../types";

// Endpoints Imports
import { authEndpoints, otpEndpoints } from "../endpoints";

// Request Types Imports
import { LoginRequestProps, VerifyOTPProps } from "../RequestTypes";

// Response Types Imports
import { LoginResponseProps, LoginVerifyResponseProps } from "../ResponseTypes";

export function loginAPI(body: LoginRequestProps): Promise<ApiResponse<LoginResponseProps, ErrorResponse<LoginRequestProps>>> {
    return baseUnAuthorizedAPIInstance.post(authEndpoints.LOGIN, body);
}

export function verifyLoginOtpAPI(body: VerifyOTPProps): Promise<ApiResponse<LoginVerifyResponseProps, ErrorResponse<VerifyOTPProps>>> {
    return baseUnAuthorizedAPIInstance.post(otpEndpoints.VERIFY_LOGIN_OTP, body);
}
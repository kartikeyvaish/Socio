import { GeneralAPIResponse } from "./types";

export interface LoginResponseProps extends GeneralAPIResponse {
    otp_id: number
}

export interface LoginVerifyResponseProps extends GeneralAPIResponse {
    access_token: string;
    refresh_token: string;
}

export interface NewUserSignUpVerifyResponseProps extends GeneralAPIResponse {
    verified_id: number;
}

export interface VerifyForgotPasswordResponseProps extends GeneralAPIResponse {
    reset_request_id: number;
} 
// Custom hook that contain all the API endpoints

// Client import
import { useContext } from "react";
import { ApiResponse } from "apisauce";

// Packages Imports 
import env from "../config/env";
import GlobalContext from "../context/GlobalContext";

// Main Route for Auth Endpoints
const AuthRoute = env.auth;
const OTPRoute = env.otp;

export default function useAuthEndpoints() {
    const { authAPIClient } = useContext(GlobalContext);

    // SendEmailVerifyOTP Endpoint function
    function SendEmailVerifyOTP({ email }: { email: string }): Promise<ApiResponse<any, any>> {
        return authAPIClient.post(`${AuthRoute}/send-email-signup-otp`, { email }, {
            headers: {
                otp_send_key: `${env.OTP_Email_Send_Key}`,
            },
        });
    }

    // function to send Reset OTP
    function SendResetPasswordOTP({ email }: { email: string }): Promise<ApiResponse<any, any>> {
        return authAPIClient.post(`${AuthRoute}/send-reset-password-otp`, { email }, {
            headers: {
                otp_send_key: `${env.OTP_Email_Send_Key}`,
            },
        });
    }

    // function to call register api
    function SignUp(DATA: any): Promise<ApiResponse<any, any>> {
        return authAPIClient.post(`${AuthRoute}/signup`, DATA, {
            headers: {
                sign_up_key: `${env.SignUP_API_KEY}`,
            },
        });
    }

    // function to call login api
    function Login(DATA: any): Promise<ApiResponse<any, any>> {
        return authAPIClient.post(`${AuthRoute}/login`, DATA);
    }

    // function to call after selecting google account
    // Google Login Endpoint function
    function GoogleLogin(DATA: any): Promise<ApiResponse<any, any>> {
        return authAPIClient.post(`${AuthRoute}/google-login`, DATA);
    }

    // Verify Email OTP Sign Up Endpoint function
    function VerifyEmailSignUpOTP({ otp_id, otp }: { otp_id: string, otp: string }): Promise<ApiResponse<any, any>> {
        return authAPIClient.post(`${OTPRoute}/verify-email-signup-otp`, { otp_id, otp, verification_type: "EMAIL_VERIFICATION" });
    }

    // Verify Email OTP Reset Password Endpoint function
    function VerifyEmailResetPasswordOTP({ otp_id, otp }: { otp_id: string, otp: string }): Promise<ApiResponse<any, any>> {
        return authAPIClient.post(`${OTPRoute}/verify-reset-password-otp`, { otp_id, otp, verification_type: "FORGOT_PASSWORD" });
    }

    // function to call reset password api
    function ResetPassword({ new_password, reset_request_id, push_notification_token, email }: { new_password: string, reset_request_id: string, push_notification_token?: string, email?: string; }): Promise<ApiResponse<any, any>> {
        return authAPIClient.put(`${AuthRoute}/reset-password`, { new_password, reset_request_id, push_notification_token, email });
    }

    return {
        Login,
        SignUp,
        SendEmailVerifyOTP,
        GoogleLogin,
        VerifyEmailSignUpOTP,
        VerifyEmailResetPasswordOTP,
        ResetPassword,
        SendResetPasswordOTP
    }
}
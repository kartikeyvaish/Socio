export interface LoginRequestProps {
    email: string;
    password: string;
}

export interface VerifyOTPProps {
    otp: string;
    otp_id: string;
    email: string;
}
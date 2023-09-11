export interface LoginRequestProps {
    email: string;
    password: string;
}

export interface RegisterRequestProps {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    username: string;
}

export interface VerifyOTPProps {
    otp: string;
    otp_id: string;
    email: string;
}

export interface ResetRequestProps {
    reset_request_id: number;
    password: string;
}
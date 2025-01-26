export interface LoginBodyProps {
  email: string;
  password: string;
}

export interface LoginResponseProps {
  otp_id: string;
}

export interface SuccessLoginResponseProps {
  access_token: string;
  refresh_token: string;
}

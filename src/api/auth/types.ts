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

export interface SignUpBodyProps {
  email: string;
  password: string;
  username: string;
  verified_id: string;
  first_name: string;
  last_name: string;
}

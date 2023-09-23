import { PostProps } from "../types/AppTypes";
import { GeneralAPIResponse } from "./types";

export interface LoginResponseProps extends GeneralAPIResponse {
  otp_id: number;
}

interface GoogleLoginExistsResponse {
  account_exists: true;
  user_tokens: Omit<LoginVerifyResponseProps, "message">;
}

interface GoogleLoginDoesNotExistResponse
  extends Pick<NewUserSignUpVerifyResponseProps, "verified_id"> {
  account_exists: false;
  prefill_details: {
    email: string;
    first_name: string;
    last_name: string;
    username: string;
  };
}

export type GoogleLoginResponseProps = (
  | GoogleLoginExistsResponse
  | GoogleLoginDoesNotExistResponse
) &
  GeneralAPIResponse;

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

export interface UploadResponseProps extends GeneralAPIResponse {
  signature: string;
}

export interface CloudinaryUploadResponseProps {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
  overwritten: boolean;
  original_filename: string;
  api_key: string;
}

export interface NewPostResponseProps extends GeneralAPIResponse {
  post: PostProps;
}

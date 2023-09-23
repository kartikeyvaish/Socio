import { PlatformOSType } from "react-native";

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

export interface GoogleLoginRequestProps {
  id_token: string;
  platform: PlatformOSType;
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

export interface UploadSignatureRequestProps {
  upload_signature_payload: {
    timestamp: number;
    upload_preset: string;
    public_id: string;
  };
}

export interface NewPostUploadProps {
  url: string;
  thumbnail_url?: string;
  file_type: string;
  width: number;
  height: number;
  public_id: string;
  asset_id: string;
  size_in_bytes: number;
}

export interface NewPostProps {
  caption?: string;
  location?: string;
  files: NewPostUploadProps[];
}

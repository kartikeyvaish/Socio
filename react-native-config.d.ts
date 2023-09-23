declare module "react-native-config" {
  export interface NativeConfig {
    NODE_ENV: "development" | "production";
    DEV_BASE_URL: string;
    PROD_BASE_URL: string;
    GOOGLE_LOGIN_CLIENT_ID: string;
    GOOGLE_CLIENT_IOS_CLIENT_ID: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_UPLOAD_PRESET: string;
  }

  export const Config: NativeConfig;
  export default Config;
}

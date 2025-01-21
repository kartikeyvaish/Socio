declare module 'react-native-config' {
  export interface NativeConfig {
    PROD_SERVER_BASE_URL: string;
    DEV_SERVER_BASE_URL: string;
    CLOUDINARY_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
  }

  export const Config: NativeConfig;
  export default Config;
}

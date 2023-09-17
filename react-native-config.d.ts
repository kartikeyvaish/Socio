declare module 'react-native-config' {
    export interface NativeConfig {
        DEV_BASE_URL: string
        PROD_BASE_URL: string
        GOOGLE_LOGIN_CLIENT_ID: string
        GOOGLE_CLIENT_IOS_CLIENT_ID: string
    }

    export const Config: NativeConfig
    export default Config
}
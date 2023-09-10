declare module 'react-native-config' {
    export interface NativeConfig {
        DEV_BASE_URL: string
        PROD_BASE_URL: string
    }

    export const Config: NativeConfig
    export default Config
}
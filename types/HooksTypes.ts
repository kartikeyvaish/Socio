import { VideoCodec } from "expo-camera/build/Camera.types";

// interface for the selected file via DocumentPicker
export interface SelectedFileProps {
    type?: 'success' | 'cancel';
    name?: string;
    size?: number;
    uri?: string;
    mimeType?: string;
    lastModified?: number;
    file?: File;
    isRemoteImage?: boolean;
    thumbnail_image?: string;
    width?: number;
    height?: number;
    [key: string]: any;
}

// type for Permissions
export type Permissions = "AUTHORIZED" | "DENIED" | "UNAUTHORIZED";
export type CameraType = number | "front" | "back";
export type FlashType = number | "auto" | "on" | "off" | "torch";
export type ModeTypes = "IMAGE" | "VIDEO";

// interface fo Permissions
export interface SocioPermissions {
    camera?: Permissions;
    microphone?: Permissions;
}

// interface for CapturedFile
export interface CapturedFile {
    uri?: string;
    mimeType?: string;
    name?: string;
    thumbnail_image?: string;
}

// Initial Permission for Permission
const InitialPermission: SocioPermissions = {
    camera: "UNAUTHORIZED",
    microphone: "UNAUTHORIZED",
};

// recorded video result response
export interface VideoResponse {
    uri: string;
    codec?: VideoCodec;
}
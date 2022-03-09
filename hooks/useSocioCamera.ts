// Packages Imports
import { useRef, useState } from "react";
import { Camera, } from "expo-camera";

// Local Imports
import Helper from "../utils/Helper";
import { CameraType, CapturedFile, FlashType, ModeTypes, SocioPermissions, VideoResponse } from "../types/HooksTypes";

// Initial Permission for Permission
const InitialPermission: SocioPermissions = {
    camera: "UNAUTHORIZED",
    microphone: "UNAUTHORIZED",
};

// Custom hook to manage camera preview and captures
export default function useSocioCamera() {
    // Refs
    const CameraRef = useRef<Camera>(null);

    // Local States
    const [CameraReady, SetCameraReady] = useState(false);
    const [CameraType, SetCameraType] = useState<CameraType>(Camera.Constants.Type.front);
    const [CapturedFile, SetCapturedFile] = useState<CapturedFile>(null);
    const [Flash, SetFlash] = useState<FlashType>("off");
    const [IsRecording, SetIsRecording] = useState(false);
    const [Loading, SetLoading] = useState(true);
    const [Mode, SetMode] = useState<ModeTypes>("IMAGE");
    const [Permissions, SetPermissions] = useState<SocioPermissions>(InitialPermission);
    const [ThumbLoading, SetThumbLoading] = useState(false);

    // function to get camera permission
    const GetPermission = async () => {
        try {
            SetLoading(true);
            const req_perm = await Camera.requestCameraPermissionsAsync();
            const req_mic_perm = await Camera.requestMicrophonePermissionsAsync();

            if (req_perm.canAskAgain === false || req_mic_perm.canAskAgain === false) {
                SetPermissions({ ...Permissions, camera: "DENIED", microphone: "DENIED" });
                SetLoading(false);
                return;
            }

            SetPermissions({
                camera: req_perm.granted === true ? "AUTHORIZED" : "UNAUTHORIZED",
                microphone: req_mic_perm.granted === true ? "AUTHORIZED" : "UNAUTHORIZED",
            });

            SetLoading(false);
        } catch (error) {
            SetLoading(false);
        }
    };
    // function to capture image
    const captureImage = async () => {
        try {
            await CameraRef.current.takePictureAsync({
                quality: 1,
                exif: true,
                skipProcessing: true,
                onPictureSaved: photo => {
                    if (photo.uri) {
                        let name = photo.uri.split("/").pop();
                        let mimeType = Helper.get_mime_type(photo.uri);
                        SetCapturedFile({
                            mimeType,
                            name,
                            uri: photo.uri,
                        });
                    }
                },
            });
        } catch (error) {
            SetCapturedFile(null);
        }
    };

    // function to capture video
    const captureVideo = async () => {
        try {
            SetIsRecording(true);

            const video: VideoResponse = await CameraRef.current.recordAsync({
                quality: Camera.Constants.VideoQuality["720p"],
                maxDuration: 15,
            });

            if (video.uri) {
                let name = video.uri.split("/").pop();
                let mimeType = Helper.get_mime_type(video.uri);
                SetCapturedFile({
                    mimeType,
                    name,
                    uri: video.uri,
                });
            }

            SetIsRecording(false);
        } catch (error) {
            SetIsRecording(false);
        }
    };

    // function to stop recording
    const stopRecording = async () => {
        try {
            CameraRef.current.stopRecording();
            SetIsRecording(false);
        } catch (error) {
            SetIsRecording(false);
        }
    };

    // function to switch camera
    const switchCamera = async () => {
        try {
            if (CameraType === Camera.Constants.Type.front) {
                SetCameraType(Camera.Constants.Type.back);
            } else {
                SetCameraType(Camera.Constants.Type.front);
            }
        } catch (error) { }
    };

    // function to toggle flash
    const toggleFlash = async () => {
        try {
            // off -> on -> torch -> auto
            if (Flash === "off") {
                SetFlash("on");
            } else if (Flash === "on") {
                SetFlash("torch");
            } else if (Flash === "torch") {
                SetFlash("auto");
            } else {
                SetFlash("off");
            }
        } catch (error) {
            SetFlash("off");
        }
    };

    // function to unselect captured file
    const unselectFile = () => SetCapturedFile(null);


    return {
        Loading,
        CameraReady,
        CameraType,
        Flash,
        SetCameraReady,
        CameraRef,
        captureImage,
        Mode,
        SetMode,
        IsRecording,
        captureVideo,
        stopRecording,
        toggleFlash,
        switchCamera,
        CapturedFile,
        unselectFile,
        Permissions,
        ThumbLoading,
        SetThumbLoading,
        GetPermission
    }
}
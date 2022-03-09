// Packages Improts
import { useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";

// types imports 
import Helper from "../utils/Helper";

// interface for useRecording
export interface useRecordingProps {
    onComplete?: (file: string) => void;
    onProgressUpdate?: (progress: Audio.RecordingStatus) => void;
}

// custom hook to record audio
export default function useRecording({ onComplete, onProgressUpdate }: useRecordingProps) {
    // Refs for the recorder
    const AudioRecorder = useRef<Audio.Recording>(new Audio.Recording());

    // States for UI
    const [IsRecording, SetIsRecording] = useState<boolean>(false);
    const Permission = useRef<boolean>(false);
    const [RecordedURI, SetRecordedURI] = useState<string>("");
    const [Progress, SetProgress] = useState<number>(0);

    // get audio permissions
    useEffect(() => {
        GetPermissison()
    }, [])

    // function to get audio permission
    const GetPermissison = async () => {
        try {
            const getAudioPerm = await Audio.requestPermissionsAsync();

            Permission.current = getAudioPerm.granted;

            if (getAudioPerm.canAskAgain === false)
                Helper.ShowToast(`You have denied permission to record audio. Please allow it to record audio in Settings`);

        } catch (error) {
            Permission.current = false;
        }
    };

    // function to track recording progress
    const onProgressUpdateLocal = async (event: Audio.RecordingStatus) => {
        try {
            if (event.isRecording) {
                SetProgress(event.durationMillis);
                if (typeof onProgressUpdate === "function")
                    onProgressUpdate(event);
            }
        } catch (error) {
            if (typeof onProgressUpdate === "function")
                onProgressUpdate(null);
        }
    };

    // Function to start recording
    const StartRecording = async () => {
        try {
            SetRecordedURI(null);

            if (Permission.current) {
                // Prepare the Audio Recorder
                await AudioRecorder.current.prepareToRecordAsync(
                    Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
                );

                // Set update to a function
                AudioRecorder.current.setOnRecordingStatusUpdate(onProgressUpdateLocal);

                // Start recording
                await AudioRecorder.current.startAsync();
                SetIsRecording(true);
            }
            else {
                Helper.ShowToast(`You have denied permission to record audio. Please allow it to record audio in Settings`);
            }
        } catch (error) {
            SetRecordedURI(null);
            SetIsRecording(false);
        }
    };

    // Function to stop recording
    const StopRecording = async () => {
        try {
            // Stop recording
            await AudioRecorder.current.stopAndUnloadAsync();

            // Get the recorded URI here
            const result = AudioRecorder.current.getURI();
            if (result) {
                SetRecordedURI(result);
                if (typeof onComplete === "function") onComplete(result);
            }

            // Reset the Audio Recorder
            AudioRecorder.current = new Audio.Recording();
            SetIsRecording(false);
        } catch (error) {
            SetIsRecording(false);
        }
    };

    return { IsRecording, StartRecording, StopRecording, RecordedURI, Progress, SetRecordedURI, };
}
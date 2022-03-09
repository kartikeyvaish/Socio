// Packages Imports
import * as FileSystem from "expo-file-system";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

// Local Imports
import FeedActions from "../store/feed/actions";
import ProfileActionCreators from "../store/profile/actions";

// interface for useFileCache
export interface useFileCacheProps {
    local_uri?: string;
    asset_id?: string;
    uri?: string;
}

// custom hook to cache the file contents
export default function useFileCache(props: useFileCacheProps) {
    // Destructure props
    const { asset_id, uri, local_uri } = props;

    // Constants
    const FileName = uri ? uri.split("/").pop() : "";
    const finalLocalUri = local_uri ? local_uri : FileSystem.documentDirectory + FileName;

    // Local Refs
    const firstDone = useRef(false);
    const dispatch = useDispatch();

    // use Effect to call the functions
    useEffect(() => {
        if (!firstDone.current) InitialCall();
    }, [])

    // Initial call to check existence
    const InitialCall = async () => {
        try {
            if (uri === undefined) return;

            // Mark as done
            firstDone.current = true;

            // Check if the file exists
            const checkExists = await checkLocalUri();

            // if it does, do nothing
            if (checkExists) {
                dispatch(FeedActions.UpdateLocalUri(asset_id, finalLocalUri));
                return;
            }

            // if it doesn't, download the file
            const local_download = await downloadFile();

            if (local_download.uri) {
                dispatch(FeedActions.UpdateLocalUri(asset_id, local_download.uri));
                dispatch(ProfileActionCreators.UpdateLocalUri(asset_id, local_download.uri));
            }
        } catch (error) {
        }
    };

    // check if local uri does exists in the cache
    const checkLocalUri = async () => {
        try {
            // if finalLocalUri is not provided
            if (!finalLocalUri) return false;

            // check if the file exists
            const localUri = await FileSystem.getInfoAsync(finalLocalUri);

            // return result
            return localUri.exists;
        } catch (error) {
            // return false if error
            return false;
        }
    };

    // function to download the file
    const downloadFile = async () => {
        try {
            // if uri is undefined
            if (!uri) return;

            // get the name from the uri
            const name = uri.split("/").pop();

            // Download the file
            const file = await FileSystem.downloadAsync(uri, FileSystem.documentDirectory + name);

            // return the local uri
            return file;
        } catch (error) {
            // return null if error
            return null;
        }
    };

    return null;
}
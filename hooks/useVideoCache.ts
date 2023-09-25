// Packages Imports (from node_modules)
import { useEffect, useState } from "react";
import { AVPlaybackSourceObject, AVPlaybackStatus } from "expo-av";
import * as FileSystem from "expo-file-system";

const VIDEO_CACHE_DIR = FileSystem.cacheDirectory + "/videos/";

function getExtensionFromURL(url: string) {
  return url.split(".").pop();
}

function getCacheLocation(url: string, uniqueCacheKey: string) {
  return VIDEO_CACHE_DIR + uniqueCacheKey + "." + getExtensionFromURL(url);
}

async function fileExists(location: string) {
  try {
    // Check if file already exists
    const response = await FileSystem.getInfoAsync(location);

    return response.exists;
  } catch (error) {}
}

async function cacheVideo(source: AVPlaybackSourceObject, cacheKey: string) {
  try {
    // Check if videos directory exists or not... If not then create it
    const videosDirectoryInfo = await fileExists(VIDEO_CACHE_DIR);

    if (!videosDirectoryInfo) {
      await FileSystem.makeDirectoryAsync(VIDEO_CACHE_DIR, {
        intermediates: true,
      });
    }

    const downloadLocation = getCacheLocation(source.uri, cacheKey);

    // Check if file already exists
    const cachedVersionExists = await fileExists(downloadLocation);

    if (cachedVersionExists) return downloadLocation;

    const downloadResumable = FileSystem.createDownloadResumable(
      source.uri,
      downloadLocation
    );

    const downloadResult = await downloadResumable.downloadAsync();

    if (downloadResult === undefined) return source.uri;

    return downloadResult.uri;
  } catch (error) {
    return null;
  }
}

export interface VideoCacheHookProps {
  videoSource?: AVPlaybackSourceObject;
  uniqueCacheKey?: string;
}

export default function useVideoCache(props: VideoCacheHookProps) {
  // Destructuring props
  const { videoSource, uniqueCacheKey } = props;

  // States
  const [source, setSource] = useState<AVPlaybackSourceObject>(videoSource);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [cachedVideoSource, setCachedVideoSource] =
    useState<AVPlaybackSourceObject | null>(null);

  useEffect(() => {
    checkIfCached();
  }, []);

  const hookPlaybackUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;

    if (status.isLoaded) {
      if (status.durationMillis - status.positionMillis < 200){
        if (cachedVideoSource !== null) {
          setSource(cachedVideoSource);
        }
      }
    }
  };

  const checkIfCached = async () => {
    try {
      const downloadLocation = getCacheLocation(
        videoSource.uri,
        uniqueCacheKey
      );

      if (await fileExists(downloadLocation)) {
        setSource({ uri: downloadLocation });
        return;
      }

      setIsReady(true);

      const downloadedVideo = await cacheVideo(source, uniqueCacheKey);

      if (downloadedVideo) setCachedVideoSource({ uri: downloadedVideo });
    } catch (error) {
    } finally {
      setIsReady(true);
    }
  };

  return { isReady, source, hookPlaybackUpdate, cacheReady: cachedVideoSource !== null };
}

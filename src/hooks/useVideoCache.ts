// Packages Imports (from node_modules)
import { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';

// Local Imports
import reduxStorageEngine from '../store/reduxStoreEngine';

// Named Imports
import { getFileNameFromUrl } from '../helpers/common';
import { FileAttachment } from '../types/model';

async function ensureDirExists(dir: string) {
  const dirInfo = await FileSystem.getInfoAsync(dir);

  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  }
}

async function checkIfFileExists(file: string) {
  try {
    const fileInfo = await FileSystem.getInfoAsync(file);

    return { exists: fileInfo.exists, uri: fileInfo.uri };
  } catch (error) {
    return { exists: false };
  }
}

async function createDownloadableObject(
  url: string,
  onProgress?: (progress: FileSystem.DownloadProgressData) => void,
  folder: string = FileSystem.documentDirectory,
  filename: string = getFileNameFromUrl(url)
) {
  await ensureDirExists(folder);

  const downloadResumable = FileSystem.createDownloadResumable(
    url,
    folder + filename,
    {},
    onProgress
  );

  return downloadResumable;
}

type CacheMap = Record<string, string>;

export default function useVideoCache(
  urls: Array<Pick<FileAttachment, 'id' | 'secure_url'>>,
  canCache: boolean = false
) {
  const [cachedUrls, setCachedUrls] = useState<CacheMap>({});

  useEffect(() => {
    if (canCache) {
      urls.forEach((url) => {
        downloadVideo(url.secure_url, url.id);
      });
    }
  }, [JSON.stringify(urls), canCache]);

  async function downloadVideo(url: string, uniqueCacheKey: string | number) {
    try {
      if (cachedUrls[uniqueCacheKey.toString()]) {
        return { uri: cachedUrls[uniqueCacheKey.toString()] };
      }

      let filename = getFileNameFromUrl(url, uniqueCacheKey.toString());

      let mmkvStorageKey = `cachedUrls_${uniqueCacheKey}`;

      let mmkvCachedUrl = await reduxStorageEngine.getItem(mmkvStorageKey);

      let mmkvExistence = await checkIfFileExists(mmkvCachedUrl);

      if (mmkvExistence.exists) {
        setCachedUrls((prev) => ({ ...prev, [uniqueCacheKey.toString()]: mmkvExistence.uri }));
        return { uri: mmkvExistence.uri };
      }

      const existenceRespponse = await checkIfFileExists(FileSystem.documentDirectory + filename);

      if (existenceRespponse.exists) {
        await reduxStorageEngine.setItem(mmkvStorageKey, existenceRespponse.uri);
        setCachedUrls((prev) => ({ ...prev, [uniqueCacheKey.toString()]: existenceRespponse.uri }));
        return { uri: existenceRespponse.uri };
      }

      const downloadableObj = await createDownloadableObject(
        url,
        undefined,
        FileSystem.documentDirectory,
        filename
      );

      const downloadResponse = await downloadableObj.downloadAsync();

      if (downloadResponse.uri === FileSystem.documentDirectory + filename) {
        setCachedUrls((prev) => ({ ...prev, [uniqueCacheKey.toString()]: downloadResponse.uri }));
      }
    } catch (error) {}
  }

  return { cachedUrls: cachedUrls };
}

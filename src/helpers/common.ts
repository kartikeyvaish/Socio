import dayjs from 'dayjs';
import * as FileSystem from 'expo-file-system';

export function isTimeStampExpired(timestamp: number): boolean {
  return dayjs().isAfter(dayjs(new Date((timestamp - 20) * 1000)));
}

export function getFileNameFromUrl(url: string, suffix: string = '') {
  const urlParts = url.split('/');
  const fileName = urlParts[urlParts.length - 1];
  const fileNameParts = fileName.split('.');
  const name = fileNameParts[0];
  const extension = fileNameParts[1];

  return `${name}${suffix}.${extension}`;
}

export async function checkIfFileExists(file: string) {
  try {
    const fileInfo = await FileSystem.getInfoAsync(file);

    return { exists: fileInfo.exists, uri: fileInfo.uri };
  } catch (error) {
    return { exists: false };
  }
}

export async function ensureDirExists(dir: string) {
  const dirInfo = await FileSystem.getInfoAsync(dir);

  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  }
}

export async function createDownloadableObject(
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

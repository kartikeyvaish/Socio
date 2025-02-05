// Packages Imports (from node_modules)
import * as FileSystem from 'expo-file-system';

// Named Imports
import { ChildrenProps } from '../types/global';
import { checkIfFileExists, createDownloadableObject, getFileNameFromUrl } from '../helpers/common';
import { FileAttachment } from '../types/model';
import { fileCache } from '../store/feature/fileCache';
import { FileCacheManagerContext } from '../contexts/FileCacheManagerContext';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';

// interface for FileCacheManager component
export interface FileCacheManagerProps extends ChildrenProps {}

// functional component for FileCacheManager
function FileCacheManager(props: FileCacheManagerProps) {
  // Destructuring props
  const { children } = props;

  const { cachedUrls, cachingState } = useAppSelector((state) => state.fileCache);
  const dispatch = useAppDispatch();

  async function cacheFile(fileAttachment: Pick<FileAttachment, 'id' | 'secure_url'>) {
    try {
      const { id, secure_url } = fileAttachment;

      if (cachingState?.[id]) return;

      let accessorKey = id.toString();

      let filename = getFileNameFromUrl(secure_url, accessorKey);

      let cachedUrl = cachedUrls?.[accessorKey];

      if (cachedUrls && cachedUrl) {
        let checkIfFileExistsResponse = await checkIfFileExists(cachedUrl);

        if (checkIfFileExistsResponse.exists) return;
      }

      const downloadableObj = await createDownloadableObject(
        secure_url,
        undefined,
        FileSystem.documentDirectory,
        filename
      );

      const downloadResponse = await downloadableObj.downloadAsync();

      if (downloadResponse.uri === FileSystem.documentDirectory + filename) {
        dispatch(fileCache.actions.startCaching(id));
        dispatch(
          fileCache.actions.cacheFile({
            id: id,
            uri: downloadResponse.uri
          })
        );
        dispatch(fileCache.actions.stopCaching(id));
      }
    } catch (error) {
      dispatch(fileCache.actions.stopCaching(fileAttachment.id));
    }
  }

  // render
  return (
    <FileCacheManagerContext.Provider value={{ cacheFile }}>
      {children}
    </FileCacheManagerContext.Provider>
  );
}

// exports
export default FileCacheManager;

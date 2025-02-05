import { createContext } from 'react';
import { FileAttachment } from '../types/model';

export const FileCacheManagerContext = createContext<{
  cacheFile: (fileAttachment: Pick<FileAttachment, 'id' | 'secure_url'>) => Promise<void>;
}>({
  cacheFile: async () => {}
});

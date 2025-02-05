// Packages Imports
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Named Imports

export interface FileCacheState {
  cachedUrls: Record<number, string>;
  cachingState: Record<number, boolean>;
}

const initialState: FileCacheState = {
  cachedUrls: {},
  cachingState: {}
};

export const fileCache = createSlice({
  name: 'fileCache',
  initialState,
  reducers: {
    cacheFile: (state, action: PayloadAction<{ id: number; uri: string }>) => {
      const { id, uri } = action.payload;

      let existingCacheUrls = { ...state.cachedUrls, [id]: uri };

      return {
        ...state,
        cachedUrls: existingCacheUrls
      };
    },
    startCaching: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        cachingState: {
          ...state.cachingState,
          [action.payload]: true
        }
      };
    },
    stopCaching: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        cachingState: {
          ...state.cachingState,
          [action.payload]: false
        }
      };
    }
  }
});

export const { cacheFile } = fileCache.actions;

export default fileCache.reducer;

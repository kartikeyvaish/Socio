// Packages Imports
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';

// Local Imports
import authSlice from './feature/authSlice';
import reduxStorageEngine from './reduxStoreEngine';

// Combining all the reducers and exporting
const rootReducer = combineReducers({
  // auth reducer
  auth: authSlice
});

// Create a final persisted reducer
const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: reduxStorageEngine,
    blacklist: ['modal']
  },
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

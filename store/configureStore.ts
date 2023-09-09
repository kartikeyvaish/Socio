// Imports 
import { configureStore, } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

// Import the combined reducers
import rootReducer from "./rootReducer";
import reduxStorageEngine from "./reduxStorageEngine";

// Create a final persisted reducer
const persistedReducer = persistReducer(
    {
        key: "root",
        storage: reduxStorageEngine,
        blacklist: ["modal"]
    },
    rootReducer
);

// Export the Created Store
export const store = configureStore({
    devTools: false, reducer: persistedReducer, middleware: (middleware) => middleware({ serializableCheck: false })
});

// Export the Persistor
export const persistor = persistStore(store);

// Export the types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
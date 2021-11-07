import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import rootReducer from "./reducer";

const persistedReducer = persistReducer(
  {
    key: "root",
    storage: AsyncStorage,
    whitelist: [
      "User",
      "PushToken",
      "Mode",
      "StorePosts",
      "Profile",
      "Chats",
      "Unread",
    ],
  },
  rootReducer
);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

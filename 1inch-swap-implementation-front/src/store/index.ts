import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import tokensReducer from "./reducers/tokens";
import swapReducer from "./reducers/swap";
import loadingReducer from "./reducers/loading";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["tokens"],
};

const rootReducer: any = combineReducers({
  tokens: tokensReducer,
  swap: swapReducer,
  loading: loadingReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (
    getDefaultMiddleware: (arg0: { serializableCheck: boolean }) => any
  ) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

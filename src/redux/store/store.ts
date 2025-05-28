// src/redux/store.ts
import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import { cartSlice } from "../reducers/cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import storage from "redux-persist/lib/storage"; // utilise localStorage
import { combineReducers } from "redux";
import { WebStorage } from 'redux-persist/lib/types';

const createNoopStorage = (): WebStorage => {
  return {
    getItem: (_key: string) => Promise.resolve(null),
    setItem: (_key: string, _value: string) => Promise.resolve(),
    removeItem: (_key: string) => Promise.resolve(),
  };
};

const isBrowser = typeof window !== 'undefined';
// Configuration persist
const persistConfig = {
  key: "root",
  storage: isBrowser ? storage : createNoopStorage(),
};
const rootReducer = combineReducers({ cart: cartSlice.reducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
// Types pour TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

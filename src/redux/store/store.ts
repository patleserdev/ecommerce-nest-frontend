// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { cartSlice } from '../reducers/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

// Types pour TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

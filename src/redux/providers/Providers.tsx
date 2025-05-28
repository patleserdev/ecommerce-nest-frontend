// src/redux/Providers.tsx
"use client";

import { Provider } from "react-redux";
import { store, persistor } from "@/redux/store/store";
import { PersistGate } from "redux-persist/integration/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

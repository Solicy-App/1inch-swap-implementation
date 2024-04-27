// pages/_app.js

import { Provider } from "react-redux";
import { persistor, store } from "../store";
import type { AppProps } from "next/app";
import { PersistGate } from "redux-persist/integration/react";
import "./globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;

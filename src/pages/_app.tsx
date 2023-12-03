import "@/styles/global.css";
import type { AppProps } from "next/app";
import "aos/dist/aos.css";
import { Provider } from "react-redux";
import store from "../store";
import useConnection from "../utils/connection";
import React from "react";


export default function App({ Component, pageProps }: AppProps) {
  const {
    _connectToMetaMask,
    _sendMessageToMetaMask,
    accountData,
    provider,
    signer,
  } = useConnection();

  const combinedData = {
    _connectToMetaMask,
    _sendMessageToMetaMask,
    accountData,
    provider,
    signer,
  };

  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} connectionData={combinedData} />
      </Provider>
    </>
  );
}

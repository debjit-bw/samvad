import "@/styles/global.css";
import type { AppProps } from "next/app";
import "aos/dist/aos.css";
export default function App({ Component, pageProps }: AppProps) {

  return (
    <Component {...pageProps} />
  );
}
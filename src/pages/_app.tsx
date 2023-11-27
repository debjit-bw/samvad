import "@/styles/global.css";
import type { AppProps } from "next/app";
import "aos/dist/aos.css";
import { Header } from "../../components/Header/Header";
import useConnection from "@/utils/connection";



export default function App({ Component, pageProps }: AppProps) {

  const {_connectToMetaMask,_sendMessageToMetaMask,accountData}=useConnection();
  
  return (
    <>
    {/* <div style={{height:"400px",width:'400px',background:'red'}} onClick={_sendMessageToMetaMask}>
     
    </div> */}
      <Header {...accountData} onConnect={_connectToMetaMask} />
      <Component {...pageProps} />

    </>
  );
}

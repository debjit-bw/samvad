import { useState, useCallback } from "react";
import { ethers } from "ethers";
import { Header } from "../Header/Header";
import Blog from "../Blog/Blog";

export interface AccountType {
  address?: string;
  balance?: string;
  chainId?: string;
  network?: string;
}

const Layout = () => {
  const [accountData, setAccountData] = useState<AccountType>({});
  const [message, setMessage] = useState<string>("");
  const [blogData, setblogData] = useState([
    {
      id: 1,
      display: "link1",
      date: "13-09-2023",
      content: "In my local language (Bahasa Indonesia) there are no verb-2 or past tense form as time tracker. So, I often forget to use the past form of verb when speaking english. I saw him last night (correct) I see him last night ..."
    },
    {
      id: 2,
      display: "link2",
      date: "13-09-2023",
      content: "In my local language (Bahasa Indonesia) there are no verb-2 or past tense form as time tracker. So, I often forget to use the past form of verb when speaking english. I saw him last night (correct) I see him last night ..."
    },
  ]);

  const _connectToMetaMask = useCallback(async () => {
    const ethereum = window.ethereum;
    // Check if MetaMask is installed
    if (typeof ethereum !== "undefined") {
      try {
        // Request access to the user's MetaMask accounts
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        // Get the connected Ethereum address
        const address = accounts[0];
        // Create an ethers.js provider using the injected provider from MetaMask
        const provider = new ethers.BrowserProvider(ethereum);
        // Get the account balance
        const balance = await provider.getBalance(address);
        // Get the network ID from MetaMask
        const network = await provider.getNetwork();
        // Update state with the results
        setAccountData({
          address,
          balance: ethers.formatEther(balance),
          // The chainId property is a bigint, change to a string
          chainId: network.chainId.toString(),
          network: network.name,
        });
        console.log(provider.getAvatar);
        
      } catch (error: Error | any) {
        alert(`Error connecting to MetaMask: ${error?.message ?? error}`);
      }
    } else {
      alert("MetaMask not installed");
    }
  }, []);

  const _sendMessageToMetaMask = useCallback(async () => {
    const ethereum = await window.ethereum;
    // Create an ethers.js provider using the injected provider from MetaMask
    // And get the signer (account) from the provider
    const signer = await new ethers.BrowserProvider(ethereum).getSigner();
    try {
      // Sign the message
      await signer.signMessage(message);
    } catch (error) {
      alert("User denied message signature.");
    }
  }, [message]);

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  return (
    <div>
      <Header {...accountData} onConnect={_connectToMetaMask} />
      <div>
        <div>
          {blogData.map((blog) => (
            <Blog key={blog.id} {...blog} />
          ))}
          {/* <Image
            src="https://images.ctfassets.net/9sy2a0egs6zh/4zJfzJbG3kTDSk5Wo4RJI1/1b363263141cf629b28155e2625b56c9/mm-logo.svg"
            alt="MetaMask"
            width={320}
            height={140}
            priority
          /> */}
          {/* {accountData?.address ? (
            <>
              <input
                type="text"
                onChange={_onChange}
              />
              <button
                onClick={_sendMessageToMetaMask}
              >
                Send Message
              </button>
            </>
          ) : (
            <button
              onClick={_connectToMetaMask}
            >
              Connect to MetaMask
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Layout;

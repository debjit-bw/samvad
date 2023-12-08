import React, { useEffect, useState } from "react";
import { AccountType } from "../layout/layout";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import useConnection from "@/utils/connection";
import { useRouter } from "next/router";

interface HeaderProps extends AccountType {
  onConnect: () => void;
  onDisconnect: () => void;
  props:any;
}

export const Header: React.FC<HeaderProps> = ({
  address,
  balance,
  chainId,
  network,
  onConnect,
  onDisconnect,
  props
}: HeaderProps) => {
  const {
    txnLoading,
    testProvider,
    getBalance,
    getReplyCount,
    getReply,
    getPost,
    getAllPosts,
    addPaycoins,
    withdrawPaycoins,
    createPost,
    createReply,
  } = props.connectionTransaction;

  const { signer, accountData } = useConnection();
  const [openModal, setOpenModal] = useState(false);
  const [payCoinOpenModal, setpayCoinOpenModal] = useState(false);
  const [url, setUrl] = useState("");
  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");
  const [amount, setAmount] = useState<any | null>(0);
  const [paycoinValue, setPayCoinValue] = useState<any | null>(0);

  //Add post Modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleModalSubmit = async () => {
    console.log("URL:", url);
    console.log("Heading:", heading);
    console.log("Text:", text);
    handleCloseModal();

    try {
      await createPost(url, text, heading, signer!);
      console.log("created");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Paycoin Modal
  const handlePayCoinOpenModal = () => {
    setpayCoinOpenModal(true);
  };
  const handlePayCoinCloseModal = () => {
    setpayCoinOpenModal(false);
  };
  const handlePayCoinModalSubmit = async () => {
    console.log("Amount:", amount);
    handlePayCoinCloseModal();

    try {
      await addPaycoins(amount, signer!);
      console.log("created");
    } catch (error) {
      console.error("Error adding amount:", error);
    }
  };

  const getBalanceinHeader = async () => {
    try {
      const address = accountData.address!;
      const tx = await getBalance(address);
      console.log(tx);
      setPayCoinValue(tx);
    } catch (error) {}
  };

  const router = useRouter();
  function redirectToHome() {
    router.push("/");
  }

  return (
    <>
      <div className="bg-gray-800 text-white p-4 flex flex-col md:flex-row justify-between items-center">
        <div
          className="text-3xl font-bold mb-4 md:mb-0"
          onClick={redirectToHome}
        >
          SAMVAD
        </div>
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="flex items-center">
            🟢 <span className="ml-1">{address ?? "Wallet Address"}</span>
          </div>
        </div>
        <div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
            PayCoins: {paycoinValue}
          </button>
          <button
            onClick={() => {
              handlePayCoinOpenModal();
              getBalanceinHeader();
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer ml-4"
          >
            Add PayCoins
          </button>
          <button
            onClick={handleOpenModal}
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer ml-4"
          >
            Add Post
          </button>

          {address ? (
            <>
              <button
                onClick={onDisconnect}
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer ml-4"
              >
                Disconnect
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onConnect}
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer ml-4"
              >
                Connect
              </button>
            </>
          )}
        </div>
        <Modal open={payCoinOpenModal} onClose={handlePayCoinCloseModal}>
          <Box
            sx={{
              width: "90%",
              p: 4,
              mx: "auto",
              my: "10%",
              backgroundColor: "white",
              borderRadius: "md",
              outline: "none",
              boxShadow: "2xl",
              position: "relative",
            }}
          >
            <TextField
              label="Amount"
              variant="outlined"
              fullWidth
              margin="normal"
              value={amount}
              onChange={(e) => {
                const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
                setAmount(onlyNumbers);
                console.log(onlyNumbers);
              }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
            <CancelIcon
              onClick={handlePayCoinCloseModal}
              className="absolute top-2 right-2 cursor-pointer"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handlePayCoinModalSubmit}
              className="mt-4"
            >
              Submit
            </Button>
          </Box>
        </Modal>
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              width: "90%",
              p: 4,
              mx: "auto",
              my: "10%",
              backgroundColor: "white",
              borderRadius: "md",
              outline: "none",
              boxShadow: "2xl",
              position: "relative",
            }}
          >
            <CancelIcon
              onClick={handleCloseModal}
              className="absolute top-2 right-2 cursor-pointer"
            />
            <TextField
              label="URL"
              variant="outlined"
              fullWidth
              margin="normal"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <TextField
              label="Heading"
              variant="outlined"
              fullWidth
              margin="normal"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
            />
            <TextField
              label="Text"
              variant="outlined"
              fullWidth
              margin="normal"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleModalSubmit}
              className="mt-4"
            >
              Submit
            </Button>
          </Box>
        </Modal>
      </div>
    </>
  );
};

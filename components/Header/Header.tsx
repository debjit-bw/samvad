import React, { useEffect, useState } from "react";
import { AccountType } from "../layout/layout";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@cred/neopop-web/lib/components";
import CancelIcon from "@mui/icons-material/Cancel";
import useConnection from "@/utils/connection";
import { useRouter } from "next/router";
import styles from "./header.module.css";
import { Typography } from "@cred/neopop-web/lib/components";
import { colorPalette, FontVariant } from "@cred/neopop-web/lib/primitives";
import { showFailureToast } from "@/utils/notifications";
import useTransactions from "@/utils/useTransactions";

interface HeaderProps extends AccountType {
  onConnect: () => void;
  onDisconnect: () => void;
  props: any;
}

export const Header: React.FC<HeaderProps> = ({
  address,
  balance,
  chainId,
  network,
  onConnect,
  onDisconnect,
  props,
}: HeaderProps) => {
  const {
    txnLoading,
    testProvider,
    getBalance,
    getReplyCount,
    getReply,
    getPost,
    getAllPosts,
    withdrawPaycoins,
    createPost,
    createReply,
  } = props.connectionTransaction;

  const { addPaycoins } = useTransactions();

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
    } catch (error) {
      showFailureToast("error");
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
      <div className={styles.container}>
        <Typography
          {...FontVariant.HeadingBold20}
          color={colorPalette.popWhite[800]}
          onClick={redirectToHome}
          style={{ fontSize: "36px" }}
        >
          SAMVAD
        </Typography>

        <div style={{ display: "flex" }}>
          <Button
            colorMode="light"
            kind="elevated"
            size="big"
            style={{ marginRight: "12px" }}
            onClick={() => {
              handlePayCoinOpenModal();
              getBalanceinHeader();
            }}
          >
            Add Coin : {Number(paycoinValue).toFixed(2)}
          </Button>
          <Button
            colorMode="light"
            kind="elevated"
            size="big"
            style={{ marginRight: "12px" }}
            onClick={handleOpenModal}
          >
            Add Post
          </Button>

          {address ? (
            <>
              <Button
                colorMode="light"
                kind="elevated"
                size="big"
                onClick={onDisconnect}
              >
                {address && address.length > 8
                  ? `${address.slice(0, 4)}...${address.slice(-4)}`
                  : address}
              </Button>
            </>
          ) : (
            <>
              <Button
                colorMode="light"
                kind="elevated"
                size="big"
                onClick={onConnect}
              >
                Connect
              </Button>
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

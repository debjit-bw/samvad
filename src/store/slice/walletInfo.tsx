import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface WalletInfoState {
    name?: string;
    address?: string;
    balance?: string;
    network?: string;
    chainId?: string;
    // explorer: string;
  }
  
  const initialState: WalletInfoState = {
    name: "",
    address: "",
    balance: "",
    network: "",
    chainId: "",
    // explorer: "https://suiscan.xyz",
  };

export const walletInfoSlice = createSlice({
  name: "WalletInfo",
  initialState,
  reducers: {
    setWalletInfo(
      state: WalletInfoState,
      action: PayloadAction<{
        address: string;
        balance: string;
        network: string;
        chainId: string;
      }>
    ) {
      const { address, balance, network, chainId } = action.payload;

      state.address = address;
      state.balance = balance;
      state.network = network;
      state.chainId = chainId;
    },
  },
});

export const { setWalletInfo } = walletInfoSlice.actions;

export default walletInfoSlice.reducer;

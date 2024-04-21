"use client";

import { WagmiProvider, cookieToInitialState } from "wagmi";
import { config } from "@/wagmi";

interface IWagmiWrapProvider {
  children: React.ReactNode;
}

const WagmiWrapProvider: React.FC<IWagmiWrapProvider> = ({ children }) => {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
};

export default WagmiWrapProvider;

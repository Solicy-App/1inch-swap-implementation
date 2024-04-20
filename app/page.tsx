"use client";

import { useState } from "react";
import { ChainContext } from "@/contexts/chain-context";
import { WagmiProvider, createConfig, http } from "wagmi";
import { base, mainnet, optimism } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Header from "@/components/UI/header";
import Swap from "@/pages/SwapPage";

import styles from "./page.module.css";

const config = createConfig({
	chains: [mainnet, base],
	connectors: [metaMask()],
	transports: {
		[mainnet.id]: http(),
		[base.id]: http(),
	},
});

export default function Home() {
	const [chain, setChain] = useState<number>(1);
	const queryClient = new QueryClient();

	return (
		<main className={styles.main}>
			<WagmiProvider config={config}>
				<QueryClientProvider client={queryClient}>
					<ChainContext.Provider value={{ chain, setChain }}>
						<Header />
						<Swap />
					</ChainContext.Provider>
				</QueryClientProvider>
			</WagmiProvider>
		</main>
	);
}
